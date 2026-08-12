-- EXTREME NETWORKS KNOWLEDGE ASSESSMENT
-- Complete Database Schema with RLS and Permissions
-- Run this in Supabase SQL Editor (copy and paste entire script)

-- ===== DROP ALL TABLES =====
DROP TABLE IF EXISTS rate_limits CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;

-- ===== CREATE RATE LIMITS TABLE =====
CREATE TABLE rate_limits (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT NOT NULL,
  date DATE NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ip_address, date)
);

CREATE INDEX idx_rate_limits_ip_date ON rate_limits(ip_address, date);

-- ===== CREATE UNIFIED SUBMISSIONS TABLE =====
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Submission metadata
  quiz_type TEXT NOT NULL,  -- 'pretraining', 'post_class', 'fabric', 'switch'
  section TEXT,              -- for in-class quizzes (5 sections)

  -- Student info
  name TEXT NOT NULL,
  email TEXT NOT NULL,

  -- Results
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  duration_minutes INTEGER,

  -- Flexible JSON storage
  topic_scores JSONB,        -- {"topic_name": 75, ...}
  responses JSONB             -- [{question_id, selected, isCorrect}, ...]
);

-- Indexes optimized for the two main query patterns:

-- Pattern 1: Real-time in-class queries (past 5 mins, specific questions)
CREATE INDEX idx_submissions_realtime
  ON submissions(quiz_type, section, created_at DESC);

-- Pattern 2: Historical analysis queries (past week, full quiz results)
CREATE INDEX idx_submissions_historical
  ON submissions(quiz_type, created_at DESC);

-- Pattern 3: Student tracking (if needed later)
CREATE INDEX idx_submissions_student
  ON submissions(email, quiz_type, created_at DESC);

-- ===== ENABLE ROW LEVEL SECURITY =====

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- ===== CREATE RLS POLICIES =====

-- Rate Limits: Allow anon to INSERT and UPDATE
CREATE POLICY "allow_insert_rate_limits" ON rate_limits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_update_rate_limits" ON rate_limits
  FOR UPDATE WITH CHECK (true);

CREATE POLICY "allow_select_rate_limits" ON rate_limits
  FOR SELECT USING (true);

-- Submissions: Allow anon to INSERT, authenticated to SELECT
CREATE POLICY "allow_insert_submissions" ON submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_select_submissions" ON submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- ===== GRANT PERMISSIONS TO ANON ROLE (STUDENTS) =====

-- Rate Limits
GRANT INSERT, UPDATE, SELECT ON rate_limits TO anon;
GRANT USAGE ON SEQUENCE rate_limits_id_seq TO anon;

-- Submissions
GRANT INSERT ON submissions TO anon;
GRANT USAGE ON SEQUENCE submissions_id_seq TO anon;

-- ===== GRANT PERMISSIONS TO SERVICE_ROLE (FUNCTIONS) =====

-- Rate Limits (for submit-responses function: rate limiting)
GRANT INSERT, UPDATE, SELECT ON rate_limits TO service_role;
GRANT USAGE ON SEQUENCE rate_limits_id_seq TO service_role;

-- Submissions (for submit-responses function: insert, and instructor functions: select)
GRANT INSERT, SELECT ON submissions TO service_role;
GRANT USAGE ON SEQUENCE submissions_id_seq TO service_role;
