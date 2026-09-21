import 'server-only';
import postgres from 'postgres';
import { memberTables } from '@/db/schema';
import { requireEnv } from '@/lib/env';
import { translateSql } from '@/lib/sql-dialect';

// VERCEL-ONLY replacement for the origin's Cloudflare D1 binding - never
// overwrite it from the origin. It exposes the part of the D1 API the origin
// code uses (prepare/bind/first/all/run and batch) on Supabase Postgres, so the
// origin's API routes copy over unchanged. SQLite syntax is translated by
// lib/sql-dialect.ts. Tables come from supabase/migrations; this module only
// checks that they exist.

type Row = Record<string, any>;
export type D1Result<T = Row> = { results: T[]; success: true; meta: { changes: number } };
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Row>(): Promise<T | null>;
  all<T = Row>(): Promise<D1Result<T>>;
  run<T = Row>(): Promise<D1Result<T>>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = Row>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

const connect = () => {
  const url = new URL(requireEnv('POSTGRES_URL'));
  // The Vercel integration appends parameters such as `supa=` that postgres.js
  // would otherwise forward to the server as unknown runtime settings.
  url.search = '';
  return postgres(url.toString(), {
    // Supabase's transaction pooler (port 6543) cannot use prepared statements.
    prepare: false,
    ssl: 'require',
    // One connection per instance. A serverless function serves one request at
    // a time, and a larger pool only pins more pooler connections when the
    // platform freezes an instance mid-query.
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    // count(*) and other int8 results come back as numbers, as they do on D1.
    types: {
      bigint: {
        to: 20,
        from: [20],
        serialize: (value: number) => String(value),
        parse: (value: string) => Number(value),
      },
    },
  });
};
type Sql = ReturnType<typeof connect>;
let client: Sql | undefined;
const sql = () => (client ??= connect());

const QUERY_TIMEOUT_MS = 20_000;

/**
 * Nothing in this schema should take twenty seconds. If something does, it is
 * blocked on a lock rather than slow, so drop the connection: that aborts the
 * statement server-side instead of leaving a transaction pinned in the pooler
 * until the platform kills the function minutes later, which is what made one
 * stuck admin request wedge every later one.
 */
let queue: Promise<unknown> = Promise.resolve();

/**
 * Run statements one at a time. With a single connection, postgres.js would
 * otherwise pipeline concurrent queries down it, and Supabase's
 * transaction-mode pooler stalls on that - the SEO/GEO route fires eleven at
 * once and hung. Sequential costs a few hundred milliseconds and is reliable.
 */
function serialize<T>(work: () => Promise<T>): Promise<T> {
  const result = queue.then(work, work);
  queue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function withTimeout<T>(work: Promise<T>, statement: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          const stuck = client;
          client = undefined;
          void stuck?.end({ timeout: 0 }).catch(() => undefined);
          reject(
            new Error(
              `Database statement exceeded ${QUERY_TIMEOUT_MS}ms and was abandoned: ${statement.slice(0, 120)}`,
            ),
          );
        }, QUERY_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

let schemaCheck: Promise<void> | undefined;
function schemaReady() {
  schemaCheck ??= (async () => {
    const rows = await serialize(() =>
      sql().unsafe<{ tablename: string }[]>(
        "select tablename from pg_catalog.pg_tables where schemaname = 'public'",
      ),
    );
    const present = new Set(rows.map((row) => row.tablename));
    const missing = memberTables.filter((table) => !present.has(table));
    if (missing.length)
      throw new Error(
        `Database is missing table(s) ${missing.join(', ')}. Apply supabase/migrations in the Supabase SQL editor (see README).`,
      );
  })().catch((error: unknown) => {
    schemaCheck = undefined;
    throw error;
  });
  return schemaCheck;
}

// D1 rejects undefined and objects too; booleans are stored as 1/0.
function checkValue(value: unknown, source: string) {
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value === null || typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  throw new TypeError(`Unsupported value ${String(value)} bound to SQL: ${source.slice(0, 120)}`);
}

function toResult<T>(rows: Iterable<unknown> & { length: number; count?: number | null }): D1Result<T> {
  return { results: Array.from(rows) as T[], success: true, meta: { changes: rows.count ?? rows.length } };
}

class Statement implements D1PreparedStatement {
  constructor(
    private readonly source: string,
    private readonly values: unknown[] = [],
  ) {}

  bind(...values: unknown[]): D1PreparedStatement {
    return new Statement(this.source, values.map((value) => checkValue(value, this.source)));
  }

  query(runner: Pick<Sql, 'unsafe'>) {
    const { text, paramCount } = translateSql(this.source);
    if (paramCount !== this.values.length)
      throw new RangeError(
        `SQL expects ${paramCount} bound values but got ${this.values.length}: ${this.source.slice(0, 120)}`,
      );
    return runner.unsafe(text, this.values as never[]);
  }

  async first<T = Row>(): Promise<T | null> {
    await schemaReady();
    const rows = await serialize(() => withTimeout(this.query(sql()), this.source));
    return (rows[0] as T | undefined) ?? null;
  }

  async all<T = Row>(): Promise<D1Result<T>> {
    await schemaReady();
    return toResult<T>(await serialize(() => withTimeout(this.query(sql()), this.source)));
  }

  run<T = Row>(): Promise<D1Result<T>> {
    return this.all<T>();
  }
}

const database: D1Database = {
  prepare(query: string) {
    if (typeof query !== 'string') throw new TypeError('prepare() requires an SQL string');
    return new Statement(query);
  },
  async batch<T = Row>(statements: D1PreparedStatement[]) {
    const list = statements.map((statement) => {
      if (!(statement instanceof Statement))
        throw new TypeError('batch() only accepts statements from memberDB().prepare()');
      return statement;
    });
    await schemaReady();
    // Like D1: pipelined in one transaction, all or nothing.
    const rowsets = await serialize(() =>
      withTimeout(
        sql().begin((tx) => list.map((statement) => statement.query(tx))),
        `batch of ${list.length} statements`,
      ),
    );
    return rowsets.map((rows) => toResult<T>(rows));
  },
};

/** On D1 this created the tables; here it verifies the migration was applied. */
export async function ensureMemberSchema() {
  await schemaReady();
}

export function memberDB(): D1Database {
  return database;
}

export const parseJSON = <T>(value: unknown, fallback: T): T => {
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return fallback;
  }
};
