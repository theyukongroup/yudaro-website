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
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_keywords (id TEXT PRIMARY KEY, keyword TEXT NOT NULL UNIQUE, category TEXT NOT NULL CHECK (category IN ('Branded','Core','Industry','Buyer')), target_url TEXT NOT NULL, priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('High','Medium','Low')), active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_keywords_category_active ON seo_keywords(category,active)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_google_rankings (id TEXT PRIMARY KEY, keyword_id TEXT NOT NULL, checked_date TEXT NOT NULL, position REAL NOT NULL, target_url TEXT NOT NULL, actual_url TEXT, result_page INTEGER, country TEXT, language TEXT, device TEXT, notes TEXT, checked_by TEXT NOT NULL, source_type TEXT NOT NULL DEFAULT 'MANUAL GOOGLE SEARCH', created_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_rankings_keyword_date ON seo_google_rankings(keyword_id,checked_date DESC)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_gsc_metrics (id TEXT PRIMARY KEY, metric_date TEXT NOT NULL, query TEXT NOT NULL, page TEXT NOT NULL, clicks INTEGER NOT NULL DEFAULT 0, impressions INTEGER NOT NULL DEFAULT 0, ctr REAL NOT NULL DEFAULT 0, average_position REAL, country TEXT, device TEXT, source_type TEXT NOT NULL DEFAULT 'GOOGLE SEARCH CONSOLE', imported_by TEXT NOT NULL, created_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_gsc_date_query ON seo_gsc_metrics(metric_date DESC,query)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_indexing_status (url TEXT PRIMARY KEY, indexed_status TEXT NOT NULL DEFAULT 'Unknown' CHECK (indexed_status IN ('Yes','No','Unknown')), google_canonical TEXT, expected_canonical TEXT NOT NULL, in_sitemap INTEGER NOT NULL DEFAULT 1, last_checked TEXT, notes TEXT, checked_by TEXT, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_geo_tests (id TEXT PRIMARY KEY, platform TEXT NOT NULL CHECK (platform IN ('Google AI','ChatGPT','Bing/Copilot')), checked_date TEXT NOT NULL, prompt TEXT NOT NULL, keyword TEXT, mentioned TEXT NOT NULL DEFAULT 'Unknown' CHECK (mentioned IN ('Yes','No','Unknown')), cited TEXT NOT NULL DEFAULT 'Unknown' CHECK (cited IN ('Yes','No','Unknown')), cited_url TEXT, correct_description TEXT NOT NULL DEFAULT 'Unknown' CHECK (correct_description IN ('Yes','No','Unknown')), position_value REAL, competitors TEXT, notes TEXT, checked_by TEXT NOT NULL, source_type TEXT NOT NULL, created_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_geo_platform_date ON seo_geo_tests(platform,checked_date DESC)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_backlinks (id TEXT PRIMARY KEY, referring_domain TEXT NOT NULL, source_url TEXT NOT NULL, target_url TEXT NOT NULL, first_discovered TEXT NOT NULL, link_type TEXT NOT NULL DEFAULT 'Unknown' CHECK (link_type IN ('Follow','NoFollow','Unknown')), authority_notes TEXT, industry TEXT, status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Lost','Pending','Outreach','Rejected')), notes TEXT, checked_by TEXT NOT NULL, source_type TEXT NOT NULL DEFAULT 'MANUAL BACKLINK ENTRY', created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_backlinks_domain_status ON seo_backlinks(referring_domain,status)',
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_authority_profiles (id TEXT PRIMARY KEY, platform TEXT NOT NULL, profile_url TEXT NOT NULL, verified_status TEXT NOT NULL DEFAULT 'Unknown' CHECK (verified_status IN ('Yes','No','Unknown')), backlink_status TEXT NOT NULL DEFAULT 'Unknown' CHECK (backlink_status IN ('Yes','No','Unknown')), created_date TEXT, status TEXT, notes TEXT, checked_by TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS seo_manual_tasks (id TEXT PRIMARY KEY, title TEXT NOT NULL, task_type TEXT NOT NULL, cadence TEXT NOT NULL CHECK (cadence IN ('Weekly','Monthly','One-time')), due_date TEXT, status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Complete','Skipped')), checked_date TEXT, result TEXT, notes TEXT, assigned_to TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)",
    ),
    db.prepare(
      'CREATE INDEX IF NOT EXISTS idx_seo_tasks_status_due ON seo_manual_tasks(status,due_date)',
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
