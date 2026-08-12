-- MIGRATION 001: Allow class_id reuse after a session ends
-- Run this in the Supabase SQL Editor (safe to run on the existing database;
-- no data is dropped). Only needed if you already ran database-setup.sql —
-- new installs get this from the updated setup script.
--
-- Problem: class_id had a table-wide UNIQUE constraint, so ending a session
-- for "class7" made that ID unusable forever (INSERT would fail with a
-- unique violation → HTTP 500). We only need uniqueness among ACTIVE sessions.

-- 1. Drop the table-wide UNIQUE constraint on class_id
ALTER TABLE class_sessions DROP CONSTRAINT IF EXISTS class_sessions_class_id_key;

-- 2. Replace the plain partial index with a UNIQUE partial index
DROP INDEX IF EXISTS idx_class_sessions_class_id;
CREATE UNIQUE INDEX idx_class_sessions_class_id
  ON class_sessions(class_id) WHERE is_active = TRUE;
