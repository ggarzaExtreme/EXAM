# Complete Deployment Guide

Deploy a working quiz system from scratch in ~30 minutes.

---

## Phase 1: Supabase Setup (5 minutes)

### Step 1.1: Create Supabase Project

1. Go to **supabase.com** → Sign up or login
2. Click **New Project**
3. Enter:
   - **Name:** Extreme Knowledge Assessment (or your choice)
   - **Database Password:** [strong password - save securely]
   - **Region:** Choose closest to you
4. Click **Create**
5. Wait 2-3 minutes for project to initialize

### Step 1.2: Get API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. Copy and save:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Service Role Key** (starts with `eyJ...` - NOT the anon key)
   
⚠️ **Important:** Keep these secret. You'll never put them in GitHub.

### Step 1.3: Create Instructor User

1. Go to **Authentication** → **Users** (left sidebar)
2. Click **Create User**
3. Enter:
   - **Email:** `instructor@extremenetworks.com`
   - **Password:** [strong password - save securely]
4. Click **Create User**

### Step 1.4: Set up Database Schema

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste the entire content of `sql/database-setup.sql`
4. Click **Run** (top right)
5. Wait for completion (should see green checkmark)

✅ Unified submissions table created with RLS enabled and service_role permissions.

---

## Phase 2: GitHub Setup (10 minutes)

### Step 2.1: Create Repository

1. Go to **github.com** → Click **New Repository**
2. Enter:
   - **Name:** extreme-knowledge-assessment (or your choice)
   - **Visibility:** Public (required for GitHub Pages)
   - **DO NOT** initialize with README
3. Click **Create Repository**

### Step 2.2: Add Quiz Files

Upload these files to the root of your GitHub repo:

```
/
├── index.html
├── instructor.html
├── config.js
├── styles.css
├── theme.js
├── assets/
└── quiz-data/
    ├── quiz_data_pre_class.js
    ├── quiz_data_fabric_engine.js
    ├── quiz_data_switch_engine.js
    └── quiz_data_post_class.js      (retired; kept for reference)
```

⚠️ The Netlify functions `require()` these by relative path
(`../../quiz-data/...`). Moving or renaming the folder breaks the next deploy,
not the current one — the deployed functions carry their own bundled copy.

✅ **No credentials needed in these files.**

You can upload via:
- Web interface (click **Add file** → **Upload files**)
- Git CLI: `git add . && git commit -m "Initial commit" && git push`

### Step 2.3: Create Netlify Functions Folder

Create this folder structure in your repo (add via web or CLI):

```
netlify/
└── functions/
    ├── submit-responses.js
    ├── authenticate-instructor.js
    ├── get-submissions.js
    └── export-submissions.js
```

Upload the 4 function files from `netlify/functions/` folder.

Also upload `package.json` to the root of your repo (defines dependencies).

### Step 2.4: Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Select **main** branch, **/ (root)** folder
4. Click **Save**
5. Wait 1-2 minutes for deployment

✅ Your quiz is now live at `https://YOUR_USERNAME.github.io/extreme-knowledge-assessment/`

---

## Phase 3: Netlify Setup (10 minutes)

### Step 3.1: Connect Netlify to GitHub

1. Go to **netlify.com** → Sign up or login
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub**, authorize, then select your repo
4. **Build settings:**
   - **Build command:** `echo "Using GitHub Pages"` (or leave blank)
   - **Publish directory:** `/` (root)
5. Click **Deploy Site**

⚠️ Netlify will give you a site URL like `https://YOUR-SITE.netlify.app`

### Step 3.2: Add Environment Variables

1. Go to **Site Settings** → **Environment** (left sidebar)
2. Click **Add a variable**
3. Add these three variables (mark all as **secret**):

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | Your Project URL from Step 1.2 |
| `SUPABASE_KEY` | Your Service Role Key from Step 1.2 |
| `JWT_SECRET` | Generate a random string (see below) |

**To generate JWT_SECRET:**

Option 1 (use an online tool):
- Go to https://www.random.org/strings/
- Set: Length=32, Numeric digits only
- Copy the result

Option 2 (command line):
```bash
openssl rand -base64 32
```

Example (DO NOT copy — generate YOUR OWN):
- `SUPABASE_URL` = `https://abcdef123456.supabase.co`
- `SUPABASE_KEY` = `eyJhbGc... (full key)`
- `JWT_SECRET` = `rJ8K9vL3xQ2mN7pB5dF0gH1sW4aE6uI9`

Click **Save** after each variable.

### Step 3.3: Wait for Functions Deploy

1. Go to **Deployments** → Click latest deploy
2. Wait for status to show **Published**
3. Your functions are now live at `https://YOUR-SITE.netlify.app/.netlify/functions/FUNCTION_NAME`

✅ Functions are ready.

### Step 3.4: Make Netlify Site Public (Critical!)

⚠️ **Your Netlify site MUST be public for GitHub Pages to access the functions.**

1. Go to **Site settings** → **General** (left sidebar)
2. Scroll to **Site details** section
3. Find **Access control** or **Private site** setting
4. **Toggle it OFF** to make the site public
5. Save the changes

This allows GitHub Pages (and your student quiz) to call the Netlify functions. Without this, all function requests will be blocked with 401 errors.

✅ **Result:** Functions are now publicly accessible from GitHub Pages.

### Step 3.5: Disable Auto-Deploy (Important!)

Since your **frontend is on GitHub Pages** and only **functions are on Netlify**, you want to prevent unnecessary redeploys.

**Disable auto-deploy:**
1. Go to **Site settings** → **Build & deploy** (left sidebar)
2. Click **Linked repositories** (under "Build & deploy")
3. Click **Unlink repository** or toggle **auto publishing** to **OFF**

⚠️ **Why?** 
- Frontend changes on GitHub → deploy to GitHub Pages (instant, free)
- Frontend changes would also trigger Netlify redeploy → waste tokens!
- Only redeploy Netlify when function code changes

**Manual redeploy when you change functions:**
1. Edit function in `netlify/functions/*.js`
2. Commit and push: `git push origin main`
3. Go to Netlify → **Deployments** → **Trigger deploy** → **Deploy site**
4. Wait for build to complete

This way you control exactly when Netlify builds—no wasted token deployments!

---

## Phase 4: Configuration (5 minutes)

**Hosting Summary:**
- **Frontend (HTML/JS):** GitHub Pages (instant deploys on `git push`)
- **Functions:** Netlify (separate redeploys only when functions change)
- **Database:** Supabase (managed)

This setup means **frontend changes deploy instantly via GitHub**—no Netlify redeploy needed!

### Step 4.1: Configure the Functions URL

Both `index.html` and `instructor.html` read the Netlify Functions base URL
from a single file: **`config.js`** at the repo root.

Edit `config.js` and set your Netlify site name (from Phase 3.1):
```javascript
const CONFIG = {
    NETLIFY_FUNCTIONS_URL: 'https://my-quiz-site.netlify.app/.netlify/functions'
};
```

Then commit and push:
```bash
git add config.js
git commit -m "Configure Netlify functions URL"
git push origin main
```

✅ **Result:** Both HTML files on GitHub Pages call functions on Netlify. Frontend changes deploy instantly via GitHub—no Netlify redeploy needed!

⚠️ **Note:** editing `quiz-data/quiz_data_*.js` question files DOES require a Netlify
redeploy — the quiz data is bundled into the functions for server-side grading.

---

## Phase 5: Testing (5 minutes)

### Test Student Submission

1. Open your quiz: `https://YOUR_USERNAME.github.io/extreme-knowledge-assessment/index.html`
   - This is hosted on **GitHub Pages**
2. Fill in name and email
3. Select "Pre-Class Assessment"
4. Answer 2-3 questions
5. Click "Submit"
6. Should see "Submission successful"

**Check Supabase:**
- Go to **Table Editor** → **submissions**
- You should see your test submission with `quiz_type = 'pretraining'`

### Test Instructor Dashboard

1. Open instructor dashboard: `https://YOUR_USERNAME.github.io/extreme-knowledge-assessment/instructor.html`
   - This is also hosted on **GitHub Pages** (same domain as student quiz)
2. Login with:
   - Email: `instructor@extremenetworks.com`
   - Password: [the password from Step 1.3]
3. Open the **Student Submissions** tab
4. Pick your quiz in the dropdown — it loads straight away
5. Set the range to **All time** if your test submission is older than the
   default 30 days; **Refresh** re-pulls
6. You should see your test submission in the table, and the KPI tiles above it
7. Try **Export CSV** to download the raw rows

✅ Everything working!

**Note:** Both HTML files are on GitHub Pages and call Netlify Functions. Verify in browser dev tools (F12 → Network tab) that function calls go to `https://YOUR-SITE.netlify.app/.netlify/functions/...`

---

## Troubleshooting

### Quiz submission fails with "Method not allowed" or network error
- Check that Netlify Functions deployed successfully
- Verify all three environment variables are set: `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`
- Check Netlify function logs: **Deployments** → latest → **Function logs**
- Hard refresh browser (Ctrl+Shift+R)

### Instructor login fails with "Invalid email or password"
- Verify user exists: Supabase → **Authentication** → **Users**
- Check email and password are correct (case-sensitive)
- Clear browser cache and try again

### Instructor dashboard shows "Invalid or expired token"
- Verify `JWT_SECRET` environment variable is set in Netlify
- Check that token is being stored in browser memory (not localStorage)
- Hard refresh browser and login again

### Instructor dashboard shows "Failed to fetch submissions"
- Check Netlify function logs: **Deployments** → latest → **Function logs** → search for errors
- Verify all environment variables are set and marked as **secret**
- Confirm database schema was created (check Supabase Table Editor → **submissions** table exists)
- Try selecting a different quiz_type

### No submissions appear in Supabase
- Check browser console (F12) for JavaScript errors during submission
- Verify quiz is pointing to correct Netlify function URL
- Check Supabase → **SQL Editor** → run `SELECT COUNT(*) FROM submissions;` to verify table exists
- Check rate limiting: `SELECT * FROM rate_limits ORDER BY created_at DESC;`

---

## Adding More Quiz Types

All quizzes use the unified `submissions` table. To add a new quiz type:

1. Create `quiz-data/quiz_data_YOUR_TYPE.js` with your questions
2. Add it to `quizDataFiles` in `index.html` and to both `QUIZ_FILES` maps in
   `instructor.html`
3. Add `your_type` to `ALLOWED_QUIZ_TYPES` in `submit-responses.js`,
   `get-submissions.js` and `export-submissions.js`
4. Add a static `require('../../quiz-data/quiz_data_YOUR_TYPE.js')` to the
   `QUIZ_DATA` map in `get-current-question.js`, `get-submissions.js` and
   `submit-question-response.js`
5. Add the option to the quiz dropdown in `instructor.html`
6. Commit, push, **and trigger a Netlify redeploy**

⚠️ The requires in step 4 must be static string literals. Netlify's bundler
cannot trace a path built at runtime, so a dynamic
`require('../../quiz-data/' + type + '.js')` compiles fine and then throws
"Cannot find module" in production. This has bitten before.

⚠️ No database schema changes needed — the unified table handles all quiz types.

---

## Adding More Instructors

1. Supabase → **Authentication** → **Users**
2. Click **Create User**
3. Enter email and password
4. Done! No code changes needed.

---

## Rate Limiting

Currently set to **500 submissions per day per IP address**. To change:

Edit `netlify/functions/submit-responses.js`, line 11:
```javascript
const RATE_LIMIT_PER_DAY = 500; // Change this number
```

---

## Production Checklist

- ✅ Supabase project created with unified schema
- ✅ Database permissions set correctly (service_role has INSERT/SELECT on all tables and sequences)
- ✅ GitHub repo with all quiz files + package.json
- ✅ Netlify Functions deployed (4 functions)
- ✅ **Netlify site is PUBLIC** (critical for GitHub Pages access)
- ✅ Environment variables set (SUPABASE_URL, SUPABASE_KEY, JWT_SECRET)
- ✅ JWT_SECRET is strong (32+ random characters)
- ✅ Instructor user created in Supabase Auth
- ✅ GitHub Pages enabled
- ✅ Function URLs in HTML files point to absolute Netlify URLs
- ✅ Student quiz tested (see submission in Supabase)
- ✅ Instructor login tested (JWT token generated)
- ✅ Instructor dashboard tested (can view submissions)
- ✅ Historical and real-time modes tested
- ✅ CSV export tested
- ✅ CORS errors resolved (functions return proper headers)
- ✅ No credentials in GitHub repo

---

## Dashboard Features

**Instructor view includes:**
- Login with email/password (JWT-based sessions)
- Two tabs, one visible at a time:
  - **In-Class Live Sessions** — create/resume/end a session, advance
    questions, and watch the roster (first vs. current answer, retries,
    who is still working), the answer distribution and retry stats.
    Auto-refresh lives here, is **off by default**, and only runs while this
    tab is showing and a session is live.
  - **Student Submissions** — cohort analytics over a date range: KPI tiles,
    score distribution, topic mastery weakest-first, most-missed questions,
    and a sortable table. Manual refresh only.
- Filter by student name or email
- Colour-coded scores (green ≥80%, amber ≥60%, red below)
- CSV export for the selected quiz and date range

---

**You're done!** Your quiz system is live and secure. 🎉
