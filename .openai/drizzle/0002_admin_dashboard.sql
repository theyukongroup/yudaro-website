CREATE TABLE IF NOT EXISTS admin_staff (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sales')),
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS member_admin_records (
  user_id TEXT PRIMARY KEY,
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended')),
  lead_status TEXT NOT NULL DEFAULT 'New',
  lead_priority TEXT NOT NULL DEFAULT 'Medium' CHECK (lead_priority IN ('High', 'Medium', 'Low')),
  assigned_owner_id TEXT,
  follow_up_date TEXT,
  consultation_status TEXT NOT NULL DEFAULT 'New',
  client_tier TEXT NOT NULL DEFAULT 'Free Member' CHECK (client_tier IN ('Free Member', 'Client')),
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS admin_notes (
  id TEXT PRIMARY KEY,
  member_user_id TEXT NOT NULL,
  author_user_id TEXT NOT NULL,
  note_text TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admin_notes_member_created ON admin_notes(member_user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL,
  target_user_id TEXT,
  action TEXT NOT NULL,
  detail_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_records_status ON member_admin_records(lead_status, lead_priority);
CREATE TABLE IF NOT EXISTS consultation_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  employees TEXT,
  software TEXT,
  interest TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_consultations_user_created ON consultation_requests(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultation_requests(created_at DESC);
PRAGMA optimize;
