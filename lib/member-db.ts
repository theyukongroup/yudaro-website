import { env } from 'cloudflare:workers';

type DBEnv = { DB: D1Database };
const database = () => (env as unknown as DBEnv).DB;
let initialized = false;

export async function ensureMemberSchema() {
  if (initialized) return;
  const db = database();
  await db.batch([
    db.prepare(
      "CREATE TABLE IF NOT EXISTS member_profiles (user_id TEXT PRIMARY KEY, email TEXT NOT NULL, profile_json TEXT NOT NULL DEFAULT '{}', preferences_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS assessment_reports (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, responses_json TEXT NOT NULL, scores_json TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_assessments_user_updated ON assessment_reports(user_id, updated_at DESC)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS opportunity_reports (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, selections_json TEXT NOT NULL, results_json TEXT NOT NULL, created_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_opportunities_user_created ON opportunity_reports(user_id, created_at DESC)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS roi_calculations (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, inputs_json TEXT NOT NULL, results_json TEXT NOT NULL, created_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_roi_user_created ON roi_calculations(user_id, created_at DESC)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS member_roadmaps (user_id TEXT PRIMARY KEY, roadmap_json TEXT NOT NULL, updated_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS saved_resources (user_id TEXT NOT NULL, resource_url TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY (user_id, resource_url))',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS member_events (id TEXT PRIMARY KEY, user_id TEXT, event_name TEXT NOT NULL, context_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_events_name_created ON member_events(event_name, created_at DESC)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS admin_staff (user_id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, display_name TEXT, role TEXT NOT NULL CHECK (role IN ('admin','sales')), active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS member_admin_records (user_id TEXT PRIMARY KEY, account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active','suspended')), lead_status TEXT NOT NULL DEFAULT 'New', lead_priority TEXT NOT NULL DEFAULT 'Medium' CHECK (lead_priority IN ('High','Medium','Low')), assigned_owner_id TEXT, follow_up_date TEXT, consultation_status TEXT NOT NULL DEFAULT 'New', client_tier TEXT NOT NULL DEFAULT 'Free Member' CHECK (client_tier IN ('Free Member','Client')), updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS admin_notes (id TEXT PRIMARY KEY, member_user_id TEXT NOT NULL, author_user_id TEXT NOT NULL, note_text TEXT NOT NULL, created_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_admin_notes_member_created ON admin_notes(member_user_id, created_at DESC)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS admin_audit_log (id TEXT PRIMARY KEY, actor_user_id TEXT NOT NULL, target_user_id TEXT, action TEXT NOT NULL, detail_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_log(created_at DESC)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_admin_records_status ON member_admin_records(lead_status, lead_priority)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS consultation_requests (id TEXT PRIMARY KEY, user_id TEXT, name TEXT NOT NULL, company TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, industry TEXT, employees TEXT, software TEXT, interest TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_consultations_user_created ON consultation_requests(user_id, created_at DESC)',
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultation_requests(created_at DESC)',
    ),
  ]);
  initialized = true;
}

export function memberDB() {
  return database();
}
export const parseJSON = <T>(value: unknown, fallback: T): T => {
  try {
    return JSON.parse(String(value)) as T;
  } catch {
    return fallback;
  }
};
