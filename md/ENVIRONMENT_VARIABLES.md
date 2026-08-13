# EXAM — Environment Variables

All secrets go in **Netlify environment variables only**. Nothing in GitHub.

## Where to Find Your Secrets

### SUPABASE_URL

1. Go to **supabase.com** → Your project
2. Click **Settings** → **API** (left sidebar)
3. Copy **Project URL** (looks like `https://xxxxx.supabase.co`)

Example:
```
https://abcdefgh12345678.supabase.co
```

### SUPABASE_KEY

1. Same page: **Settings** → **API**
2. Copy **Service Role Key** (NOT the anon key)
3. Starts with `eyJ...` and is very long

Example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoMTIzNDU2NzgiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjk4NzY0ODAwLCJleHAiOjE5OTk5OTk5OTl9.ABC123XYZ789...
```

⚠️ **Keep this secret!** Anyone with this key can read/write to your database.

---

## Netlify Configuration

### Step 1: Go to Environment Variables

1. **netlify.com** → Your site
2. **Site settings** (left sidebar)
3. **Environment** (left sidebar under Settings)

### Step 2: Add Variables

Click **Add a variable** for each:

**Variable 1: SUPABASE_URL**
- Key: `SUPABASE_URL`
- Value: [Your Project URL from Supabase]
- Mark as: **Secret** ✅

**Variable 2: SUPABASE_KEY**
- Key: `SUPABASE_KEY`
- Value: [Your Service Role Key from Supabase]
- Mark as: **Secret** ✅

### Step 3: Verify Functions See Them

Your Netlify Functions automatically get these env vars. You can verify in:
- **Deployments** → Latest → **Function logs** (look for "Missing Supabase" errors)

---

## What Each Function Uses

| Function | Needs | Purpose |
|----------|-------|---------|
| submit-responses.js | SUPABASE_URL, SUPABASE_KEY | Students submit → database |
| authenticate-instructor.js | SUPABASE_URL, SUPABASE_KEY, JWT_SECRET | Instructors login, generate JWT token |
| get-submissions.js | SUPABASE_URL, SUPABASE_KEY, JWT_SECRET | Instructors fetch submissions, verify JWT |
| export-submissions.js | SUPABASE_URL, SUPABASE_KEY, JWT_SECRET | Instructors export CSV, verify JWT |

### JWT_SECRET

A signing key for JWT tokens. Generate a random 32+ character string:

**Option 1: Generate online**
- Go to https://www.random.org/strings/ (set length 32, numeric digits)
- Copy the result

**Option 2: Generate locally**
```bash
openssl rand -base64 32
```

This should be a long, random string (example):
```
rJ8K9vL3xQ2mN7pB5dF0gH1sW4aE6uI9
```

Set in Netlify:
- Key: `JWT_SECRET`
- Value: [Your random string]
- Mark as: **Secret** ✅

---

## Why Service Role Key (Not Anon Key)?

- **Anon key:** Limited permissions (students INSERT only)
- **Service role key:** Full permissions (functions can INSERT and SELECT)

Functions use service role key to:
1. Accept student submissions (INSERT)
2. Validate instructor login (SELECT from auth table)
3. Fetch submissions for instructor (SELECT)

---

## Security Checklist

Before going live:

- ✅ Supabase URL set in Netlify environment (not in code)
- ✅ Service role key set in Netlify environment (not in code)
- ✅ Both marked as **Secret** in Netlify
- ✅ No SUPABASE_ variables anywhere in GitHub files
- ✅ No credentials in index.html
- ✅ No credentials in instructor.html
- ✅ No credentials in any JavaScript file

Run this to verify (in your GitHub repo):
```bash
grep -r "supabase.co" . --include="*.js" --include="*.html"
grep -r "eyJ" . --include="*.js" --include="*.html"
```

Should return **nothing**. If it does, you've leaked credentials.

---

## Troubleshooting

### "Failed to fetch submissions" error

Check that both variables are set in Netlify:
1. Go to **Site settings** → **Environment**
2. You should see both variables listed
3. They should have status indicator (blue checkmark)

### Functions not deploying

Check Netlify build logs:
1. **Deployments** → latest
2. Look for "Cannot find module" or "Missing environment"
3. Common issues:
   - Variables not yet set (add them, then redeploy)
   - Wrong variable names (must be exactly `SUPABASE_URL` and `SUPABASE_KEY`)

### Rate limiting errors

Check the error logs in **Deployments** → **Function logs**. If you see permission errors on rate_limits table, the SQL schema didn't fully apply. Re-run `sql/database-setup.sql` in Supabase.

---

## For Production

**When deployed to production servers:**

- [ ] Rotate SUPABASE_KEY regularly (Supabase has rotation feature)
- [ ] Monitor function logs for suspicious activity
- [ ] Keep GitHub repo public (for GitHub Pages) but no secrets
- [ ] Consider IP allowlisting in Supabase (if fixed IPs)
- [ ] Set up monitoring alerts in Netlify

---

**Your secrets are safe if only in Netlify environment variables.** ✅
