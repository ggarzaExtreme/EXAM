# Extreme Networks Knowledge Assessment Platform

**EX**treme **A**ssessment **M**odule — the Learning &amp; Development assessment
tool for Extreme Networks training. Two modes: self-paced assessments taken
before or after a class, and instructor-driven live quizzes run in the room.
Plus an instructor dashboard with cohort analytics.

Question banks currently shipped: networking fundamentals (pre/post class),
Fabric Engine and Switch Engine (in-class). EXAM is the delivery module; the
banks are course content and are named for their subject.

## Architecture Overview

```
Students → index.html (three modes)
   ├── Pre-Class Knowledge Check: all questions client-side, one submission
   │     at the end → submit-responses. Runs in Test or Practice mode.
   ├── In-Class Session: joins by class ID, fetches the current question on
   │     demand ("Next Question" button) → get-current-question /
   │     submit-question-response
   └── Post-Class Review: links out to hosted SurveyMonkey surveys.
         No data is collected in this tool.

Instructors → instructor.html
   ├── In-Class Live Sessions: create/resume/end sessions, advance questions,
   │     watch the roster, answer distribution and retry stats
   └── Student Submissions: cohort analytics over past results →
         export-submissions (CSV, parsed client-side)

All API calls → Netlify Functions → Supabase (PostgreSQL + RLS)
```

**Zero credentials in GitHub.** All secrets stored only in Netlify environment variables.

## Features

**Pre-Class Knowledge Check**
- One question at a time with Previous/Next navigation
- Two run modes chosen by the student:
  - **Test** — no feedback during the run. Score, verdict and topic breakdown
    on finishing; the question-by-question review unlocks on **Submit
    Results**, which is also what sends the result to the instructor. The
    review also opens if that submit fails, so a network problem never costs
    a student their feedback.
  - **Practice** — every answer is explained as it is picked, and **nothing is
    recorded**. A practice score is open-book and would inflate the cohort
    average if it were pooled with test results.
- Results screen: score ring, verdict, per-topic breakdown weakest-first,
  question-by-question review, and generated review links
- Single submission at the end, tagged with the run mode

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

**Post-Class Review**
- Links out to one hosted survey per course (SurveyMonkey)
- Driven by `POST_CLASS_SURVEYS` in index.html — adding a course is one row
- Nothing is collected in this tool, so course feedback stays separate from
  assessment results

**Platform**
- Three colour themes (Extreme / Dark / Light), remembered per browser
- Secure JWT-based instructor authentication (24-hour tokens)
- CSV export, plus cohort analytics: topic mastery, hardest questions,
  score distribution
- Auto-refresh on the live view only — off by default, and it stops when the
  tab is not showing or no session is live
- IP-based rate limiting on submissions (500/day)
- Responsive mobile-friendly design

## File Structure

```
index.html                      Student app (mode selection, pre-class quiz,
                                in-class quiz, post-class survey links)
instructor.html                 Instructor dashboard (live sessions + submissions)
config.js                       Netlify Functions base URL
styles.css                      Shared design system (themes, buttons, panels, toasts)
theme.js                        Theme switching, Network Graphic canvas, toast()

quiz-data/
├── quiz_data_pre_class.js      Pre-class assessment questions (32)
├── quiz_data_fabric_engine.js  Fabric Engine in-class questions (20)
├── quiz_data_switch_engine.js  Switch Engine in-class questions (20)
└── quiz_data_post_class.js     Retired — kept for reference, nothing loads it

netlify/functions/
├── submit-responses.js         Pre-class submission handler (rate-limited)
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
└── seed-demo-data.sql          Sample submissions + a live session, for demos

scripts/
└── gen_seed.py                 Regenerates sql/seed-demo-data.sql

assets/                         Official logo lockups (white/black/colour)
package.json                    Function dependencies (@supabase/supabase-js, jsonwebtoken)

docs/
├── DEPLOYMENT_GUIDE.md         Step-by-step setup
├── ARCHITECTURE.md             Technical deep-dive
├── DISPLAYS.md                 Inventory of every view and its purpose
├── ENVIRONMENT_VARIABLES.md    How to configure secrets
└── QUICK_REFERENCE.md          API contracts, schema, common tasks
```

`scratchpad/` is gitignored — local mockups and working files, never deployed.

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

- **submissions** — one row per completed pre-class quiz (score, topic_scores
  JSONB, responses JSONB). `section` carries the run mode (`test`) — practice
  runs are never submitted.
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

**Frontend** (`index.html`, `instructor.html`, `config.js`, `quiz-data/quiz_data_*.js`):
GitHub Pages — deploys on `git push`, no Netlify redeploy needed.

**Backend** (`netlify/functions/*.js`): Netlify Functions — requires a Netlify
redeploy when function code **or quiz data files** change (quiz data is bundled
into the functions at build time via static requires).

**Database**: Supabase. Run `sql/database-setup.sql` in the SQL Editor — it
drops and rebuilds every table, so treat it as a fresh setup rather than a
migration. `sql/seed-demo-data.sql` optionally loads sample data for a
walkthrough and can be re-run safely.

**Secrets** (Netlify env vars): `SUPABASE_URL`, `SUPABASE_KEY` (service_role),
`JWT_SECRET`.

**Instructor accounts**: create users in Supabase Dashboard → Authentication →
Users. No code changes needed.

## Support

See [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) for API contracts, schema,
common tasks, and troubleshooting.
