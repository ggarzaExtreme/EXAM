-- EXTREME NETWORKS KNOWLEDGE ASSESSMENT
-- Complete Database Schema with RLS and Permissions
-- Run this in Supabase SQL Editor (copy and paste entire script)

-- ===== DROP ALL TABLES =====
DROP TABLE IF EXISTS question_responses CASCADE;
DROP TABLE IF EXISTS class_sessions CASCADE;
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

-- ===== CREATE IN-CLASS QUIZ TABLES =====

-- CLASS SESSIONS: Tracks instructor-controlled in-class quiz sessions
CREATE TABLE class_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Session metadata
  instructor_id UUID NOT NULL REFERENCES auth.users(id),
  quiz_type TEXT NOT NULL,              -- 'fabric', 'switch', 'custom_inclass'
  session_name TEXT,

  -- Question flow control
  current_question_id TEXT,
  current_section TEXT,
  is_active BOOLEAN DEFAULT TRUE,

  -- Session metadata
  student_count INTEGER DEFAULT 0
);

CREATE INDEX idx_class_sessions_active
  ON class_sessions(instructor_id, is_active, updated_at DESC);
CREATE INDEX idx_class_sessions_class_id
  ON class_sessions(class_id) WHERE is_active = TRUE;

-- QUESTION RESPONSES: Granular tracking of individual question attempts (with retries)
CREATE TABLE question_responses (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Session & question tracking
  session_id UUID NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  quiz_type TEXT NOT NULL,

  -- Student info
  name TEXT NOT NULL,
  email TEXT NOT NULL,

  -- Response data
  selected_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,

  -- Retry tracking (critical for analytics)
  attempt_number INTEGER NOT NULL DEFAULT 1,
  final_answer BOOLEAN NOT NULL DEFAULT FALSE,

  UNIQUE(session_id, question_id, email, attempt_number)
);

-- Analytics indexes (critical for reports)
CREATE INDEX idx_question_responses_session_question
  ON question_responses(session_id, question_id, created_at DESC);
CREATE INDEX idx_question_responses_quiz_type_question
  ON question_responses(quiz_type, question_id, created_at DESC);
CREATE INDEX idx_question_responses_first_attempt
  ON question_responses(quiz_type, question_id, attempt_number)
  WHERE attempt_number = 1;
CREATE INDEX idx_question_responses_email_quiz
  ON question_responses(email, quiz_type, created_at DESC);

-- ===== UPDATE SUBMISSIONS TABLE FOR IN-CLASS SESSIONS =====
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES class_sessions(id) ON DELETE SET NULL;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS submission_type TEXT DEFAULT 'full_quiz';

-- ===== ENABLE ROW LEVEL SECURITY =====

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

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

-- Class Sessions: Instructors can manage their own sessions
CREATE POLICY "instructor_can_manage_own_sessions" ON class_sessions
  FOR ALL USING (instructor_id = auth.uid());

-- Question Responses: Anon can INSERT to active sessions, instructors can view own
CREATE POLICY "student_can_respond_to_active_session" ON question_responses
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM class_sessions WHERE id = session_id AND is_active = TRUE)
  );

CREATE POLICY "instructor_can_view_own_session_responses" ON question_responses
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM class_sessions WHERE id = session_id AND instructor_id = auth.uid())
  );

-- ===== GRANT PERMISSIONS TO ANON ROLE (STUDENTS) =====

-- Rate Limits
GRANT INSERT, UPDATE, SELECT ON rate_limits TO anon;
GRANT USAGE ON SEQUENCE rate_limits_id_seq TO anon;

-- Submissions
GRANT INSERT ON submissions TO anon;
GRANT USAGE ON SEQUENCE submissions_id_seq TO anon;

-- ===== GRANT PERMISSIONS TO ANON ROLE FOR IN-CLASS QUIZZES =====

-- Question Responses (for student submissions)
GRANT INSERT ON question_responses TO anon;
GRANT USAGE ON SEQUENCE question_responses_id_seq TO anon;

-- ===== GRANT PERMISSIONS TO SERVICE_ROLE (FUNCTIONS) =====

-- Rate Limits (for submit-responses function: rate limiting)
GRANT INSERT, UPDATE, SELECT ON rate_limits TO service_role;
GRANT USAGE ON SEQUENCE rate_limits_id_seq TO service_role;

-- Submissions (for submit-responses function: insert, and instructor functions: select)
GRANT INSERT, SELECT ON submissions TO service_role;
GRANT USAGE ON SEQUENCE submissions_id_seq TO service_role;

-- Class Sessions (for instructor functions: create, update, select)
GRANT INSERT, UPDATE, SELECT ON class_sessions TO service_role;

-- Question Responses (for student submissions and instructor analytics)
GRANT INSERT, SELECT ON question_responses TO service_role;
GRANT USAGE ON SEQUENCE question_responses_id_seq TO service_role;
