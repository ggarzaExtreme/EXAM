# Extreme Networks Knowledge Assessment Platform

Complete quiz system with student submissions, instructor dashboard, and secure data collection.

## Architecture Overview

```
Students → Quiz (GitHub Pages)
             ↓
       [Submissions]
             ↓
Instructors → Dashboard (GitHub Pages)
               ↓
         [Netlify Functions]
             ↓
       [Supabase Database]
```

**Zero credentials in GitHub.** All secrets stored only in Netlify environment variables.

## Features

✅ Multiple quiz types (pretraining, post-class, in-class fabric/switch)  
✅ Immediate feedback with diagnostic scoring  
✅ Instructor dashboard with two viewing modes:
  - Historical: View past 7 days of submissions (paginated)
  - Real-time: Monitor past 5 minutes for in-class quizzes
✅ Secure JWT-based authentication (24-hour tokens)  
✅ CSV export for all quiz submissions  
✅ IP-based rate limiting (500 submissions/day)  
✅ Randomized answer options (Fisher-Yates shuffle)  
✅ localStorage persistence (auto-resume quizzes)  
✅ YouTube learning resources links  
✅ Responsive mobile-friendly design  

## File Structure

```
quiz/
├── index.html                      Student quiz application
├── instructor.html                 Instructor dashboard (secure)
├── quiz_data_pre_class.js          Pre-class assessment questions
├── quiz_data_post_class.js         Post-class review questions
├── quiz_data_fabric_engine.js      Fabric engine in-class quiz
└── quiz_data_switch_engine.js      Switch engine in-class quiz

netlify/functions/
├── submit-responses.js             Student submission handler
├── authenticate-instructor.js       Instructor login (JWT generation)
├── get-submissions.js              Fetch submissions (paginated, filtered)
└── export-submissions.js           CSV export handler

sql/
└── database-setup.sql              Complete schema + RLS

package.json                        Dependencies (@supabase/supabase-js, jsonwebtoken)

Documentation/
├── DEPLOYMENT_GUIDE.md             Step-by-step setup (5 phases, ~30 min)
├── ARCHITECTURE.md                 Technical deep-dive (schema, security, flows)
├── ENVIRONMENT_VARIABLES.md        How to configure secrets
├── FRONTEND_UPDATES.md             Code examples for HTML changes
└── QUICK_REFERENCE.md              API contracts, schema, common tasks
```

## Quick Start

**Choose your path:**

- **New to the system?** → Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Need technical details?** → Read [ARCHITECTURE.md](ARCHITECTURE.md)
- **Setting up secrets?** → Read [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)
- **Updating frontend?** → Read [FRONTEND_UPDATES.md](FRONTEND_UPDATES.md)
- **Need a cheat sheet?** → Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## Security

- No credentials in GitHub (all secrets in Netlify env vars only)
- JWT token authentication with HS256 signature verification
- Row-level security (RLS) on database tables
- Service role key (not anon key) for instructor access
- Whitelist validation on quiz types and table names
- CORS headers for cross-origin requests
- IP-based rate limiting (prevents bot spam)

## Database Schema

**Single unified table** (`submissions`):
```
quiz_type: 'pretraining' | 'post_class' | 'fabric' | 'switch'
section: NULL (for pre/post) or 'Section 1-5' (for in-class)
name, email, score, total_questions, correct_answers, duration_minutes
topic_scores: JSONB (flexible structure)
responses: JSONB (flexible structure)
```

Optimized indexes for:
- Real-time queries (past 5 minutes): `(quiz_type, section, created_at DESC)`
- Historical analysis (past 7 days): `(quiz_type, created_at DESC)`

## Deployment

**Frontend (HTML/JS):**
- `index.html` (student quiz) → GitHub Pages
- `instructor.html` (instructor dashboard) → GitHub Pages
- Instant deploys on `git push` (no Netlify redeploy needed!)

**Backend:**
- Netlify Functions (authenticate, get-submissions, export-submissions, submit-responses)
- ⚠️ **Netlify site MUST be public** for GitHub Pages to access functions
- Separate redeploy only when function code changes

**Database:** Supabase (managed PostgreSQL with RLS)
- ⚠️ **Service role must have INSERT/SELECT permissions** on all tables and sequences

**Secrets:** Netlify environment variables only (SUPABASE_URL, SUPABASE_KEY, JWT_SECRET)

## Frontend Development

After backend setup, update frontend files per [FRONTEND_UPDATES.md](FRONTEND_UPDATES.md):
1. Student quiz: Change `quiz_table` parameter to `quiz_type`
2. Instructor dashboard: Add JWT handling, pagination, CSV export

Frontend changes deploy instantly via GitHub Pages—no function redeploy needed.

## Support

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for:
- API contracts
- Error messages & solutions
- Common tasks (add quiz type, add instructor, query data)
- Troubleshooting guide
