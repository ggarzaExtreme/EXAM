# Quick Reference Guide

## New API Contracts

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
```

---

## Common Tasks

### Add New Quiz Type
1. Add to quiz data file: `quiz/quiz_data_MY_TYPE.js`
2. Add to ALLOWED_QUIZ_TYPES in:
   - `submit-responses.js`
   - `get-submissions.js`
   - `export-submissions.js`
3. Add option to HTML dropdowns:
   - `index.html` (student)
   - `instructor.html` (dashboard)
4. Commit and push (no DB changes needed!)

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

### Frontend Changes (HTML/JS in quiz/)
1. Edit `quiz/index.html` or `quiz/instructor.html`
2. Commit: `git add quiz/*.html && git commit -m "message"`
3. Push: `git push origin main`
4. GitHub Pages updates **instantly** (no Netlify redeploy needed!)
5. Hard refresh browser (Ctrl+Shift+R) to see changes

### Function Changes (Code in netlify/functions/)
1. Edit `netlify/functions/*.js`
2. Commit: `git add netlify/functions/*.js && git commit -m "message"`
3. Push: `git push origin main`
4. **Manually trigger Netlify redeploy:**
   - Netlify dashboard → **Deployments** → **Trigger deploy** → **Deploy site**
   - Wait for "Published" status
5. Test function via browser or Postman

### Dependency Changes (package.json)
1. Edit `package.json`
2. Commit and push
3. Manually trigger Netlify redeploy (same as functions)
4. Netlify reinstalls dependencies during build

---

## Files You Need to Know

| File | Purpose | Edit? |
|------|---------|-------|
| `sql/database-setup.sql` | Database schema | Once (fresh setup) |
| `netlify/functions/*.js` | Backend functions | For new features |
| `quiz/index.html` | Student quiz | UPDATE NOW |
| `quiz/instructor.html` | Instructor dashboard | UPDATE NOW |
| `package.json` | Dependencies | Once (already updated) |
| `ENVIRONMENT_VARIABLES.md` | Env var reference | No |
| `DEPLOYMENT_GUIDE.md` | Setup instructions | No |
| `ARCHITECTURE.md` | Technical reference | No |
| `FRONTEND_UPDATES.md` | Code examples | Reference |

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
- [FRONTEND_UPDATES.md](FRONTEND_UPDATES.md) - Code examples for HTML changes
- [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) - Technical details
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design overview
- [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - Env var reference
