CREATE TABLE IF NOT EXISTS member_profiles (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  profile_json TEXT NOT NULL DEFAULT '{}',
  preferences_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS assessment_reports (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  responses_json TEXT NOT NULL,
  scores_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_assessments_user_updated ON assessment_reports(user_id, updated_at DESC);
CREATE TABLE IF NOT EXISTS opportunity_reports (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  selections_json TEXT NOT NULL,
  results_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_opportunities_user_created ON opportunity_reports(user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS roi_calculations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  inputs_json TEXT NOT NULL,
  results_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_roi_user_created ON roi_calculations(user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS member_roadmaps (
  user_id TEXT PRIMARY KEY,
  roadmap_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS saved_resources (
  user_id TEXT NOT NULL,
  resource_url TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_id, resource_url)
);
CREATE TABLE IF NOT EXISTS member_events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  event_name TEXT NOT NULL,
  context_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_name_created ON member_events(event_name, created_at DESC);
