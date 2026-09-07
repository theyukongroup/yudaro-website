import 'server-only';
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { ensureMemberSchema, memberDB } from '@/lib/member-db';

export type StaffRole = 'admin' | 'sales';
export type AdminActor = {
  id: string;
  email: string;
  name?: string;
  role: StaffRole;
};

function bootstrapEmails() {
  const value =
    (env as unknown as { NEXAVORIS_ADMIN_EMAILS?: string })
      .NEXAVORIS_ADMIN_EMAILS ?? '';
  return new Set(
    value
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function getAdminActor(): Promise<AdminActor | null> {
  const user = await getChatGPTUser();
  if (!user) return null;
  await ensureMemberSchema();
  const db = memberDB();
  const now = new Date().toISOString();
  if (bootstrapEmails().has(user.email.toLowerCase())) {
    await db
      .prepare(
        "INSERT INTO admin_staff (user_id,email,display_name,role,active,created_at,updated_at) VALUES (?,?,?,'admin',1,?,?) ON CONFLICT(email) DO UPDATE SET user_id=excluded.user_id,display_name=excluded.display_name,active=1,updated_at=excluded.updated_at",
      )
      .bind(user.id, user.email, user.name ?? null, now, now)
      .run();
  }
  const staff = await db
    .prepare(
      'SELECT role,active,user_id FROM admin_staff WHERE user_id=? OR lower(email)=lower(?)',
    )
    .bind(user.id, user.email)
    .first<{ role: StaffRole; active: number; user_id: string }>();
  if (!staff || !staff.active) return null;
  if (staff.user_id !== user.id)
    await db
      .prepare(
        'UPDATE admin_staff SET user_id=?,display_name=?,updated_at=? WHERE user_id=?',
      )
      .bind(user.id, user.name ?? null, now, staff.user_id)
      .run();
  return { ...user, role: staff.role };
}

export async function requireAdminActor(role?: 'admin') {
  const actor = await getAdminActor();
  if (!actor || (role === 'admin' && actor.role !== 'admin')) return null;
  return actor;
}
