# EXAM — Extreme Assessment Module

**EX**treme **A**ssessment **M**odule — the Learning &amp; Development assessment
tool for Extreme Networks training. Two modes: self-paced assessments taken
before or after a class, and instructor-driven live quizzes run in the room.
Plus an instructor dashboard with cohort analytics.

Question banks currently shipped: networking fundamentals (pre/post class),
Fabric Engine and Switch Engine (in-class). EXAM is the delivery module; the
banks are course content and are named for their subject.

## Architecture Overview

```
Students → index.html (mode selection)
   ├── Full Assessment (pre/post class): all questions client-side,
   │     one submission at the end → submit-responses
   └── In-Class Live Quiz: joins by class ID, fetches the current question
         on demand ("Next Question" button) → get-current-question /
         submit-question-response

Instructors → instructor.html
   ├── Historical tab: past submissions → get-submissions
   └── In-Class Live tab: create/end sessions, advance questions,
         watch live answer distribution and retry stats

All API calls → Netlify Functions → Supabase (PostgreSQL + RLS)
```

**Zero credentials in GitHub.** All secrets stored only in Netlify environment variables.

## Features

**Full assessment mode (pre/post class)**
- One question at a time with Previous/Next navigation
- Immediate per-option feedback and explanations
- Results screen: score, readiness message, per-topic breakdown
- Single submission to the database at the end

**In-class live mode**
- Instructor creates a session with a simple class ID (e.g. `class7`)
- Students join by class ID; anonymous students get a generated participant ID
- Instructor advances questions; students click "Next Question" to fetch them
  (one API call per click — no background polling)
- Retry-until-correct: wrong answers can be retried, every attempt is recorded
- Live instructor view: answer distribution per option, first-attempt/retry
  stats, students still working
- Sessions can be resumed after a page refresh; class IDs are reusable after a
  session ends

**Platform**
- Secure JWT-based instructor authentication (24-hour tokens)
- CSV export for full-quiz submissions
- IP-based rate limiting on submissions (500/day)
- Responsive mobile-friendly design

## File Structure

```
index.html                      Student app (mode selection, full quiz, in-class quiz)
instructor.html                 Instructor dashboard (historical + in-class live tabs)
config.js                       Netlify Functions base URL
quiz_data_pre_class.js          Pre-class assessment questions (32)
quiz_data_post_class.js         Post-class review questions (10)
quiz_data_fabric_engine.js      Fabric Engine in-class questions (20)
quiz_data_switch_engine.js      Switch Engine in-class questions (20)

netlify/functions/
├── submit-responses.js         Full-quiz submission handler (rate-limited)
├── authenticate-instructor.js  Instructor login (Supabase Auth → JWT)
├── get-submissions.js          Historical submissions + in-class live stats
├── export-submissions.js       CSV export
├── create-class-session.js     Create (or resume) an in-class session
├── get-current-question.js     Current-question fetch (answers stripped)
├── submit-question-response.js Per-question answer submission with retries
├── advance-question.js         Instructor moves the session to a question
└── end-class-session.js        End session, return final stats

sql/
├── database-setup.sql          Complete schema + RLS + grants (drop & rebuild)
└── migration-001-class-id-reuse.sql  For DBs created before class-id reuse fix

package.json                    Function dependencies (@supabase/supabase-js, jsonwebtoken)

md/
├── DEPLOYMENT_GUIDE.md         Step-by-step setup
├── ARCHITECTURE.md             Technical deep-dive
├── ENVIRONMENT_VARIABLES.md    How to configure secrets
└── QUICK_REFERENCE.md          API contracts, schema, common tasks
```

## Quiz Data Format

All four quiz files share one format, consumed by both the browser and the
Netlify functions (each file exports for both environments):

```javascript
const quizData = [
  {
    id: 1,                        // unique integer per file
    topic: "Layer 2 Switching",
    question: "What information does...?",
    options: [
      { text: "Wrong answer", feedback: "Why it's wrong..." },
      { text: "Right answer", feedback: "Why it's right...", isCorrect: true },
      // exactly ONE option has isCorrect: true
    ],
    explanation: "Shown after answering.",
    resources: { ... }            // optional learning links
  },
];
```

Correct answers never reach the student's browser in in-class mode —
`get-current-question` strips `isCorrect` and `feedback`; grading happens
server-side in `submit-question-response`.

## Database Schema

Four tables (see [sql/database-setup.sql](sql/database-setup.sql)):

- **submissions** — one row per completed full quiz (score, topic_scores JSONB, responses JSONB)
- **class_sessions** — one row per in-class session (class_id, instructor_id, quiz_type, current_question_id, is_active). class_id is unique **among active sessions only**, so IDs like `class7` are reusable.
- **question_responses** — one row per in-class answer attempt (attempt_number, is_correct, final_answer) with UNIQUE(session_id, question_id, email, attempt_number)
- **rate_limits** — per-IP daily submission counters

## Security

- No credentials in GitHub (all secrets in Netlify env vars only)
- JWT (HS256) instructor auth backed by Supabase Auth users
- Row-level security on all tables
- ⚠️ `SUPABASE_KEY` **must be the service_role key** — the in-class functions
  read `class_sessions` directly and RLS blocks the anon key
- Correct answers stripped from student-facing question payloads
- Whitelist validation on quiz types; IP-based rate limiting

## Deployment

**Frontend** (`index.html`, `instructor.html`, `config.js`, `quiz_data_*.js`):
GitHub Pages — deploys on `git push`, no Netlify redeploy needed.

**Backend** (`netlify/functions/*.js`): Netlify Functions — requires a Netlify
redeploy when function code **or quiz data files** change (quiz data is bundled
into the functions at build time via static requires).

**Database**: Supabase. Fresh setup: run `sql/database-setup.sql` in the SQL
Editor. Existing DB created before the class-id-reuse fix: run
`sql/migration-001-class-id-reuse.sql` instead.

**Secrets** (Netlify env vars): `SUPABASE_URL`, `SUPABASE_KEY` (service_role),
`JWT_SECRET`.

**Instructor accounts**: create users in Supabase Dashboard → Authentication →
Users. No code changes needed.

## Support

See [md/QUICK_REFERENCE.md](md/QUICK_REFERENCE.md) for API contracts, schema,
common tasks, and troubleshooting.
