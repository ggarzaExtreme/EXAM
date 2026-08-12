# Quick Reference Guide

## API Contracts

### Student Submission
```javascript
POST /.netlify/functions/submit-responses
{
  quiz_type: 'pretraining' | 'post_class' | 'fabric' | 'switch',
  section: 'Section A',  // optional, for in-class quizzes
  name: 'John Doe',
  email: 'john@example.com',
  score: 85,
  total_questions: 32,
  correct_answers: 27,
  duration_minutes: 45,
  topic_scores: { 'Topic1': 80, 'Topic2': 90 },
  responses: [{ question_id: 1, selected: 'A', isCorrect: true }, ...]
}
```

### Instructor Login
```javascript
POST /.netlify/functions/authenticate-instructor
{
  email: 'instructor@extremenetworks.com',
  password: 'password123'
}

// Response
{
  success: true,
  token: 'eyJhbGc...',  // JWT token
  userId: '...',
  email: 'instructor@extremenetworks.com',
  expiresAt: '2024-08-13T10:00:00.000Z'
}
```

### Get Submissions
```javascript
POST /.netlify/functions/get-submissions
{
  token: 'eyJhbGc...',
  quiz_type: 'pretraining',
  mode: 'historical' | 'realtime',  // optional, default: historical
  limit: 50,                        // optional, default: 50, max: 500
  offset: 0,                        // optional, default: 0
  section: 'Section A'              // optional, for real-time in-class
}

// OR live in-class stats (quiz_type not needed; class_id instead):
{
  token: 'eyJhbGc...',
  mode: 'inclass_live',
  class_id: 'class7'
}

// inclass_live response
{
  success: true,
  current_question_id: '3',
  current_section: 'Intro',
  answer_distribution: { A: { count: 2, percentage: 40, correct: false },
                         B: { count: 3, percentage: 60, correct: true }, ... },
  retry_stats: { got_correct_first_attempt: 3, needed_one_retry: 1, needed_multiple_retries: 0 },
  participation: { total_responses: 5, students_pending: 1, roster_size: 6 },

  // Per-student rows, sorted alphabetically by name (case-insensitive, email
  // as tiebreaker) so the order is identical on every refresh. The roster is
  // everyone who has answered ANY question in the session, so a student who
  // answered earlier shows as 'pending' until they answer the current one.
  students: [
    { name: 'Alice', email: 'alice@x.com', status: 'correct',
      selected_option: 'C', attempts: 2, correct_attempt: 2 },
    { name: 'bob',   email: 'anon-8f21',   status: 'wrong',
      selected_option: 'B', attempts: 1, correct_attempt: null },
    { name: 'Zoe',   email: 'zoe@x.com',   status: 'pending',
      selected_option: null, attempts: 0 }
  ]
  // status: 'correct' = answered correctly | 'wrong' = answered, not yet correct
  //         'pending' = on the roster but no answer to this question yet
}

// Response
{
  success: true,
  submissions: [...],
  count: 50,        // results in this response
  total: 250,       // total matching records
  offset: 0,
  limit: 50,
  mode: 'historical'
}
```

### Export to CSV
```javascript
POST /.netlify/functions/export-submissions
{
  token: 'eyJhbGc...',
  quiz_type: 'pretraining',
  days_back: 7  // optional, default: all
}

// Response: CSV file
ID,Date,Name,Email,Score,Percentage,Total Questions,Correct Answers,Duration (min),Section,Topic Scores,Responses
1,2024-08-12T...,John Doe,john@example.com,85,84,32,27,45,,"{...}","{...}"
```

### Create / Resume In-Class Session (instructor)
```javascript
POST /.netlify/functions/create-class-session
{
  token: 'eyJhbGc...',
  quiz_type: 'fabric' | 'switch',
  class_id: 'class7',          // lowercase, reusable after a session ends
  session_name: 'Monday AM'    // optional
}

// Response (201 created, or 200 with resumed:true if this instructor
// already has an active session with this class_id — e.g. after a refresh)
{
  success: true,
  session_id: 'uuid',
  class_id: 'class7',
  quiz_type: 'fabric',
  current_question_id: null,   // set on resume if a question was active
  is_active: true
}
// 409 if ANOTHER instructor has an active session with this class_id
```

### Get Current Question (student, on demand via "Next Question" button)
```javascript
POST /.netlify/functions/get-current-question
{ class_id: 'class7' }

// Response — options contain text ONLY (isCorrect/feedback stripped)
{
  session_active: true,
  current_question_id: '3',    // null while waiting for instructor
  question_data: { id: 3, question: '...', topic: '...',
                   options: [{ text: '...' }, ...] }
}
// 404 if session not found or ended
```

### Submit Question Response (student, retry until correct)
```javascript
POST /.netlify/functions/submit-question-response
{
  class_id: 'class7',
  question_id: '3',            // must match the session's current question
  selected_option: 'B',        // letter A-D
  name: 'John Doe',
  email: 'john@example.com',   // optional — anonymous students get a
                               // client-generated 'anon-<uuid>' id
  time_spent_seconds: 0
}

// Response (grading is server-side)
{
  success: true,
  is_correct: false,
  attempt_number: 1,           // server-computed, increments per retry
  can_retry: true,
  explanation: '...'
}
```

### Advance Question (instructor)
```javascript
POST /.netlify/functions/advance-question
{
  token: 'eyJhbGc...',
  class_id: 'class7',
  next_question_id: 4,
  section: 'Intro'             // optional
}
// Response includes previous_question_stats for the question just left
```

### End Session (instructor)
```javascript
POST /.netlify/functions/end-class-session
{ token: 'eyJhbGc...', class_id: 'class7' }

// Response
{ success: true, final_stats: { total_questions_presented, total_responses,
                                correct_final, accuracy_rate, avg_attempts } }
```

---

## Environment Variables (Netlify)

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=eyJhbGc...YOUR_SERVICE_ROLE_KEY...
JWT_SECRET=rJ8K9vL3xQ2mN7pB5dF0gH1sW4aE6uI9
```

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

---

## Quiz Type Values

| Display Name | Value |
|---|---|
| Pre-Class Assessment | `pretraining` |
| Post-Class Review | `post_class` |
| Fabric Engine | `fabric` |
| Switch Engine | `switch` |

---

## Database Schema Quick Look

```sql
submissions (
  id BIGSERIAL,
  created_at TIMESTAMP,
  quiz_type TEXT,          -- 'pretraining', 'post_class', 'fabric', 'switch'
  section TEXT,            -- NULL or 'Section 1', 'Section 2', etc.
  name TEXT,
  email TEXT,
  score INTEGER,           -- 0-100
  total_questions INTEGER,
  correct_answers INTEGER,
  duration_minutes INTEGER,
  topic_scores JSONB,      -- {"topic": score, ...}
  responses JSONB          -- [{q_id, selected, isCorrect}, ...]
)

Indexes:
- (quiz_type, section, created_at DESC)    -- Real-time queries
- (quiz_type, created_at DESC)             -- Historical queries
- (email, quiz_type, created_at DESC)      -- Student tracking

class_sessions (                 -- in-class live sessions
  id UUID PRIMARY KEY,
  class_id TEXT,                 -- UNIQUE among active sessions only (partial index)
  instructor_id UUID REFERENCES auth.users(id),
  quiz_type TEXT,                -- 'fabric' or 'switch'
  current_question_id TEXT,      -- NULL until instructor advances
  current_section TEXT,
  is_active BOOLEAN
)

question_responses (             -- one row PER ATTEMPT (retries included)
  session_id UUID REFERENCES class_sessions(id),
  question_id TEXT,
  name TEXT, email TEXT,         -- email may be a generated anon-<uuid>
  selected_option TEXT,          -- letter A-D
  is_correct BOOLEAN,
  attempt_number INTEGER,        -- 1, 2, 3...
  final_answer BOOLEAN,          -- TRUE when correct
  UNIQUE(session_id, question_id, email, attempt_number)
)
```

---

## Common Tasks

### Add New Quiz Type
1. Create quiz data file at repo root: `quiz_data_MY_TYPE.js`
   (same format as the others: `const quizData = [...]` + the dual
   window/module export block at the bottom)
2. Add to ALLOWED_QUIZ_TYPES in:
   - `submit-responses.js`
   - `get-submissions.js`
   - `export-submissions.js`
3. **Add a static require to the QUIZ_DATA map** in:
   - `submit-question-response.js`
   - `get-current-question.js`
   - `get-submissions.js`
   (requires must be static literals — the Netlify bundler cannot trace
   dynamic paths, and the file won't be packaged)
4. For in-class use, add to validQuizTypes in `create-class-session.js`
5. Add options to HTML:
   - `index.html`: `quizDataFiles` map (full quiz)
   - `instructor.html`: `sessionQuizType` select + `loadQuizData` map (in-class)
6. Commit, push, and trigger a Netlify redeploy (quiz data is bundled into
   the functions). No DB changes needed.

### Change Rate Limit
Edit `netlify/functions/submit-responses.js` line 11:
```javascript
const RATE_LIMIT_PER_DAY = 500;  // Change this number
```

### Add Instructor User
1. Supabase dashboard
2. Authentication → Users
3. Click "Create User"
4. Enter email and password
5. Done! (No code changes needed)

### Query Submissions in Supabase
```sql
-- Recent submissions
SELECT * FROM submissions 
WHERE quiz_type = 'pretraining'
ORDER BY created_at DESC LIMIT 50;

-- Past 5 minutes (real-time)
SELECT * FROM submissions 
WHERE quiz_type = 'fabric' 
  AND created_at > now() - interval '5 minutes'
ORDER BY created_at DESC;

-- By section
SELECT * FROM submissions 
WHERE quiz_type = 'fabric' AND section = 'Section 1'
ORDER BY created_at DESC LIMIT 50;

-- Difficulty analysis
SELECT 
  responses->0->>'question_id' as q_id,
  COUNT(*) as total,
  SUM(CASE WHEN (responses->0->>'isCorrect')::boolean THEN 1 ELSE 0 END) as correct
FROM submissions, jsonb_array_elements(responses) as responses
GROUP BY q_id
ORDER BY total DESC;
```

---

## Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid quiz_table parameter` | Old parameter name | Use `quiz_type` instead |
| `Invalid or expired token` | JWT invalid/expired | Login again to get new token |
| `Failed to fetch submissions` | Missing env vars | Check SUPABASE_URL, SUPABASE_KEY, JWT_SECRET |
| `Rate limit exceeded` | Too many submissions | Wait until next day (resets at midnight UTC) |
| `No results found` | Filters too strict | Try different quiz_type or mode |
| `Session not found or not active` | Bad class ID, or session ended | Check class ID; create/resume the session |
| `Class ID already in use by another instructor's active session` | ID collision | Pick a different class ID (your own sessions auto-resume) |
| `Question does not match current question` | Student submitted after instructor advanced | Client re-polls and shows the new question; retry |
| `Quiz data not available` | quiz_type has no bundled data file | Add file to QUIZ_DATA maps and redeploy |
| In-class lookups fail but full quiz works | SUPABASE_KEY is the anon key | Use the **service_role** key (RLS blocks anon reads of class_sessions) |

---

## Quick Troubleshooting

**Submission not appearing?**
1. Check browser console (F12) for errors
2. Verify quiz_type matches enum: pretraining, post_class, fabric, switch
3. Check Supabase: `SELECT COUNT(*) FROM submissions;`
4. Check rate limits: `SELECT * FROM rate_limits WHERE date = TODAY();`

**Instructor can't login?**
1. Verify user exists in Supabase Auth
2. Check email is exactly correct (case-sensitive)
3. Clear browser cache and try again

**Dashboard shows no submissions?**
1. Verify submissions exist in Supabase
2. Check JWT_SECRET is set in Netlify
3. Try different quiz_type
4. Try different mode (historical vs realtime)

**Pagination not working?**
1. Check limit/offset values in request
2. Verify total > limit to enable next button
3. Check response includes metadata (count, total, offset, limit)

---

## Development Workflow

### Frontend Changes (index.html / instructor.html / config.js)
1. Edit the file at repo root
2. Commit and push to main
3. GitHub Pages updates **instantly** (no Netlify redeploy needed!)
4. Hard refresh browser (Ctrl+Shift+R) to see changes

### Function Changes (netlify/functions/) — AND quiz data changes
1. Edit `netlify/functions/*.js` **or any `quiz_data_*.js`**
   (quiz data files are bundled into the functions at build time, so
   editing questions requires a function redeploy too — the GitHub Pages
   copy updates instantly, but server-side grading uses the bundled copy)
2. Commit and push to main
3. **Manually trigger Netlify redeploy:**
   - Netlify dashboard → **Deployments** → **Trigger deploy** → **Deploy site**
   - Wait for "Published" status
4. Test function via browser or Postman

### Dependency Changes (package.json)
1. Edit `package.json`
2. Commit and push
3. Manually trigger Netlify redeploy (same as functions)
4. Netlify reinstalls dependencies during build

---

## Files You Need to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `sql/database-setup.sql` | Full schema (drop & rebuild) | Fresh setup |
| `sql/migration-001-class-id-reuse.sql` | Migration for pre-existing DBs | Once if needed |
| `netlify/functions/*.js` | Backend functions | For new features |
| `index.html` | Student app (both quiz modes) | For UI changes |
| `instructor.html` | Instructor dashboard | For UI changes |
| `config.js` | Netlify Functions URL | If site URL changes |
| `quiz_data_*.js` | Questions (bundled into functions!) | Redeploy after edits |
| `package.json` | Dependencies | Rarely |

---

## Key Differences from Old System

| Aspect | Old | New |
|--------|-----|-----|
| Tables | 4 separate | 1 unified |
| Submission param | `quiz_table` | `quiz_type` |
| Token type | Random hex | JWT signed |
| Token validation | Length check | Signature verify |
| Get submissions | Full table scan | Smart filtering + pagination |
| Pagination | None | limit/offset |
| Real-time | 3-sec polls | 5-min window |
| Export | None | CSV download |
| Indexes | Per-table | Composite |

---

## Feature Checklist (NEW)

- ✅ JWT authentication (24-hour tokens)
- ✅ Smart pagination (real-time vs historical)
- ✅ Real-time mode (past 5 minutes)
- ✅ Historical mode (past 7 days)
- ✅ Section filtering (in-class quizzes)
- ✅ CSV export (all quiz types)
- ✅ Unified schema (easier maintenance)
- ✅ Optimized indexes (better performance)

---

## Resources

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Step-by-step setup
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design overview
- [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - Env var reference
