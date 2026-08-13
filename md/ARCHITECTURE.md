# System Architecture

## Overview

```
┌─────────────────┐
│   Students      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Quiz HTML (GitHub Pages)       │
│  - Mode selection:              │
│    full quiz / in-class live    │
│  - 4 quiz types                 │
│  - Immediate feedback           │
└────────┬────────────────────────┘
         │
         │ POST /submit-responses
         ▼
┌─────────────────────────────────┐
│  Netlify Functions              │
│  - submit-responses.js          │
│  - Rate limiting (500/day/IP)   │
│  - Unified table insert         │
└────────┬────────────────────────┘
         │ INSERT with anon key
         ▼
┌─────────────────────────────────┐
│  Supabase Database              │
│  - 1 unified submissions table  │
│  - Row-Level Security (RLS)     │
│  - Optimized indexes            │
└──────────┬──────────────────────┘
           │
           │ Instructors
           │ POST /authenticate-instructor
           ▼
┌─────────────────────────────────┐
│  Netlify Functions              │
│  - authenticate-instructor.js   │
│    (email/password → JWT token) │
│  - get-submissions.js           │
│    (JWT + filter → paginated)   │
│  - export-submissions.js        │
│    (JWT → CSV download)         │
└────────┬────────────────────────┘
         │ SELECT with service_role key
         ▼
┌─────────────────────────────────┐
│  Supabase Database              │
│  - Instructor views submissions │
│  - Smart filtering & pagination │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Dashboard HTML (GitHub Pages)  │
│  - Login form                   │
│  - Quiz selector                │
│  - Submission cards (paginated) │
│  - Analysis views               │
│  - CSV export button            │
│  - Manual refresh               │
└─────────────────────────────────┘
```

## Data Flow

### Student Submission

1. Student fills quiz on `index.html`
2. Clicks Submit
3. JavaScript collects:
   - Student name, email
   - Quiz type (`pretraining`, `post_class`, `fabric`, `switch`)
   - All answers (even blank = wrong)
   - Score, duration, topic scores
4. POST to `/.netlify/functions/submit-responses` with `quiz_type` parameter
5. Function:
   - Gets student IP
   - Checks rate limit (500/day per IP)
   - Validates quiz type against whitelist
   - Inserts into unified `submissions` table
6. Student sees "Submission successful"
7. Data persists in Supabase

### Instructor Login

1. Instructor opens `instructor.html`
2. Enters email + password
3. POST to `/.netlify/functions/authenticate-instructor`
4. Function:
   - Validates with Supabase Auth
   - Generates session token
   - Returns token
5. Token stored in browser memory (NOT localStorage)
6. Instructor can now view submissions

### Instructor Views Submissions

1. Instructor selects quiz type and viewing mode (historical or real-time)
2. Clicks Refresh or auto-refreshes
3. POST to `/.netlify/functions/get-submissions` with JWT token
4. Function:
   - Verifies JWT signature
   - Validates quiz_type against whitelist
   - Applies smart filters:
     - **Real-time mode:** past 5 minutes only, optionally filter by section
     - **Historical mode:** past 7 days, full result set
   - Applies pagination (limit 50 default, max 500)
   - Queries unified `submissions` table with service_role key
   - Returns paginated results with metadata
5. Dashboard displays:
   - Submission list with pagination controls
   - Student name, score, timestamp
   - Color coding: green (80%+) or red (<80%)
   - Analysis views (question difficulty, section performance)

### CSV Export

1. Instructor selects quiz type and date range
2. Clicks "Export to CSV"
3. POST to `/.netlify/functions/export-submissions` with JWT token
4. Function:
   - Verifies JWT signature
   - Queries submissions matching filters
   - Converts to CSV format (headers + data rows)
   - Returns file download with timestamp

## In-Class Live Quiz System

Instructor-driven question flow with per-question, per-attempt tracking.
Uses two additional tables (`class_sessions`, `question_responses`) and five
functions. No WebSockets and no background polling on the student side —
the instructor announces transitions verbally, and students fetch the current
question on demand with a "Next Question" button (one API call per click).

### Session lifecycle

1. **Create** — instructor (JWT) calls `create-class-session` with a class ID
   like `class7` and a quiz type (`fabric`/`switch`). Class IDs are unique
   among *active* sessions only (partial unique index), so they're reusable.
   If the same instructor already has an active session with that ID, it's
   **resumed** instead (page-refresh recovery); another instructor's ID → 409.
2. **Join** — students enter the class ID (no auth). Students without an email
   get a client-generated `anon-<uuid>` participant id, which keys their
   attempt tracking. Joining an ID with no session yet is expected — the class
   is usually seated before the instructor opens the session — so the student
   simply waits on the in-class screen and presses Check for Question when
   told to. Only a session that *was* seen active and then went inactive
   renders the "Session Ended" state.
3. **Advance** — instructor calls `advance-question` to set
   `current_question_id`; the response includes stats for the question just
   left. Students pick up the new question by clicking "Next Question"
   (one `get-current-question` call; if the instructor hasn't advanced, a
   "not yet" toast appears and nothing changes). The payload
   strips `isCorrect`/`feedback` — grading is server-side only.
4. **Answer** — students call `submit-question-response`. The server loads the
   bundled quiz data, grades the answer, computes `attempt_number`, and stores
   one row per attempt. Wrong answers can be retried until correct
   (`final_answer = TRUE` on the correct attempt).
5. **Monitor** — the dashboard auto-refreshes `get-submissions` with
   `mode: 'inclass_live'` at a configurable interval (3/5/10/30s, default 5s;
   toggleable off for manual-Refresh-only mode — the preference persists in
   localStorage). It returns per-option answer distribution (with the correct
   option flagged), first-attempt/retry breakdown, and a **per-student roster**.

   The roster is everyone who has answered *any* question in the session, keyed
   by email (anonymous students carry a generated `anon-<uuid>`), sorted
   alphabetically by name so the order never shifts between refreshes. Each
   student is `correct`, `wrong` (answered, not yet right), or `pending` — so a
   student who answered an earlier question appears immediately as
   "Not answered" on each new question until they respond.
6. **End** — `end-class-session` sets `is_active = FALSE` and returns final
   stats. A student's next question-check gets a 404 and shows
   "Session Ended"; the class ID is freed for reuse.

### Quiz Data Bundling

The `quiz_data_*.js` files are dual-format: they set `window.quizData` in the
browser and `module.exports` in Node. The functions that grade or serve
questions require them **statically** (a `QUIZ_DATA` map at module top) so
Netlify's bundler packages them — dynamic `require()` paths are not traced and
fail at runtime. Consequence: **editing quiz questions requires a Netlify
redeploy**, not just a GitHub Pages push.

## Security Model

### Authentication

- **Students:** No authentication (anonymous INSERT)
- **Instructors:** Email/password via Supabase Auth
- **Session Tokens:** JWT signed with HS256 (24-hour expiration)

### Authorization

- **RLS Policies:**
  - Students can INSERT to any table
  - Instructors can SELECT from any table (via authenticated role)
  - Rate limit table allows anon manipulation

- **Database Permissions:**
  - Anon role: INSERT on submissions tables + rate_limits
  - Service_role: SELECT on submissions tables (for instructor functions)

- **Netlify Functions:**
  - Service role key (read/write) stored in environment variables
  - Never exposed to client
  - Functions validate table names to prevent injection

### Credentials

| What | Where | Secure? |
|------|-------|---------|
| Supabase URL | Netlify env var | ✅ |
| Service role key | Netlify env var (marked secret) | ✅ |
| JWT Secret | Netlify env var (marked secret) | ✅ |
| Instructor password | Supabase Auth (hashed) | ✅ |
| JWT token | Browser memory (not localStorage) | ✅ |
| **In GitHub?** | **Nothing** | ✅ |

## Database Schema

### submissions (unified)

```
id (SERIAL)
created_at (TIMESTAMP)
quiz_type (TEXT) - "pretraining", "post_class", "fabric", "switch"
section (TEXT) - 'test' for pre-class test runs, the section name for in-class
name (TEXT)
email (TEXT)
score (INTEGER) - 0-100
total_questions (INTEGER)
correct_answers (INTEGER)
duration_minutes (INTEGER)
topic_scores (JSONB) - {"topic_name": 75, ...}
responses (JSONB) - [{question_id, selected, isCorrect}, ...]
```

Single unified table replaces 4 separate tables. Indexes optimized for two query patterns:
- `(quiz_type, section, created_at DESC)` - real-time in-class queries (past 5 mins)
- `(quiz_type, created_at DESC)` - historical analysis (past 7 days)

### rate_limits

```
id (SERIAL)
ip_address (TEXT)
date (DATE)
count (INTEGER)
created_at (TIMESTAMP)
```

## Quiz Types

All stored in unified `submissions` table with `quiz_type` column:

| Quiz | quiz_type | Section | Questions | Use Case |
|------|-----------|---------|-----------|----------|
| Pre-Class | `pretraining` | `test` | 32 | Before training |
| Fabric Engine | `fabric` | 5 sections | 20 | In-class + monitoring |
| Switch Engine | `switch` | 5 sections | 20 | In-class + monitoring |
| ~~Post-Class~~ | ~~`post_class`~~ | — | 10 | Retired — see below |

### Pre-class run modes

The pre-class check runs in one of two modes, chosen by the student:

- **Test** — no per-question feedback; the whole review is withheld until the
  run is submitted. Recorded, with `section = 'test'`.
- **Practice** — each answer is explained as it is picked. **Not recorded**:
  no submit button, no network call. A practice score is open-book and would
  inflate the cohort average if it were pooled with test results.

`section` carries the mode because `submit-responses` passes the field through
without validating it and `export-submissions` already returns it, so the mode
is recorded with no function change and no redeploy. `quiz_type` could not be
used: it is whitelisted server-side.

### Post-class review

No longer a quiz in this tool. The Post-Class Review card on the student home
screen links out to per-course SurveyMonkey surveys, listed in
`POST_CLASS_SURVEYS` in index.html. `quiz_data_post_class.js` is still in the
repo and still mapped in `quizDataFiles`, but nothing reaches it. Existing
`post_class` rows remain readable in the instructor dashboard, which is why
that option stays in the quiz dropdown.

## Rate Limiting

- **Limit:** 500 submissions per day per IP
- **Tracking:** rate_limits table (ip_address + date)
- **Reset:** Automatic (new date = new counter)
- **Bypass:** Currently none (same IP, different day passes)

To change limit: Edit `netlify/functions/submit-responses.js` line 11

## Indexes

All tables indexed for performance:

- `created_at DESC` - for recent submissions
- `name` - for student lookup
- `section` - for in-class filtering
- `question_id` - for per-question analytics (future)

## Scaling Considerations

**Current design supports:**
- Up to 100 instructors (limit in Supabase Auth)
- Up to 500 submissions/day per IP (rate limiting)
- Up to 10k+ concurrent dashboard users (Netlify Functions)
- Pagination limits query size (max 500 per request)

**If scaling becomes needed:**
- Add Redis caching for popular quizzes
- Move rate limiting to Redis for higher capacity
- Implement materialized view for daily aggregations
- Add connection pooling in Supabase

## Implemented Features

✅ JWT-based session authentication  
✅ Unified submissions schema  
✅ Smart pagination (real-time vs historical)  
✅ CSV export functionality  
✅ Basic rate limiting  
✅ Row-level security (RLS)  

## Future Enhancements

- [ ] Per-question analytics dashboard (difficulty heatmap)
- [ ] Time-to-complete vs score correlation analysis
- [ ] Redis caching layer for real-time dashboard
- [ ] Email notifications to instructors
- [ ] Custom branding (logo, colors)
- [ ] Offline quiz completion with sync
- [ ] LMS integration (Canvas, Blackboard)
- [ ] Materialized views for fast aggregations
- [ ] Retry without reset (allow resume mid-quiz)

---

**This architecture is production-ready with zero credentials exposed.** 🔐
