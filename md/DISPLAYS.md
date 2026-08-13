# Display Inventory

Every view in the platform, where it lives, and what it's for. All displays
share the design system in `styles.css` (theme tokens, global bar, buttons,
panels, form fields, icons); each page's own `<style>` block adds only
layout specific to that page.

## Common to every display

| Element | Behaviour |
|---|---|
| Global bar | Sticky. Home far left, official logo, live context, theme toggle far right. Identical markup on both pages. |
| Theme toggle | Extreme (default, node-graphic canvas) / Dark / Light. Saved per browser, applied before first paint. |
| Home | Returns to the start. Confirms first mid-full-quiz (answers live only in the browser); goes straight from in-class (answers already saved). |
| Buttons | Three roles: `btn-primary` (solid accent — moves things forward), `btn-quiet` (outlined — supporting), `btn-danger` (outlined red — destructive). One size per row. |
| Panels | `.panel` surface + uppercase tracked `.panel-h` heading. All boxed regions use it. |
| Action placement | Buttons sit at the top of a screen, above variable-height content, so controls never shift. |

## Student app — index.html

| # | Display | Screen id | Purpose / notes |
|---|---------|-----------|-----------------|
| S1 | Home / mode selection | `modeSelectionScreen` | "EXtreme Assessment Module" hero, brand rule, two mode cards (Pre-Class Knowledge Check, In-Class Session). |
| S2 | Before We Begin | `studentInfoScreen` | Form card: name, optional email, assessment type. Post-class option slated for replacement by an external survey link. |
| S3 | Join Your Class | `sessionJoinScreen` | Form card: name, optional email, class ID. |
| S4 | Full quiz | `fullQuizScreen` | Scheme B: action row (Previous / Next / Finish) → status strip (progress bar, student, type) → question → letter-badge options → reserved feedback slot. Nothing moves when answering. |
| S5 | Results | `fullQuizResultsScreen` | Action row (Submit / Start Over / submit-state chip), animated score ring, verdict, stat tiles, topic breakdown weakest-first, What To Review with generated YouTube links. |
| S6 | In-class question | `inclassQuizScreen` | Action row (Submit Answer / Check for Question) → status strip (question #, seen-so-far segments, attempt chip) → question → options → reserved feedback slot. On-demand fetch, no polling. |
| S7 | Session ended | inside `inclassQuizScreen` | Panel with a Start New Quiz action. Shown when the instructor ends the session; a bad class ID returns to S3 instead. |

## Instructor app — instructor.html

| # | Display | Where | Purpose / notes |
|---|---------|-------|-----------------|
| I1 | Sign in | `loginScreen` | Form card matching S2/S3. Backed by Supabase Auth → JWT. |
| I2 | Dashboard header + tabs | `dashboardScreen` | Centred "Instructor Dashboard" title, two tabs (In-Class Live Sessions, Student Submissions), auto-refresh toggle + interval. |
| I3 | No active session | `createSessionContainer` | Panel with Create New Session. |
| I4 | Create session dialog | `createSessionModal` | Opaque modal: class ID, quiz type, optional name. Resumes the instructor's own active session on a duplicate ID. |
| I5 | Active session | `liveSessionContainer` | Overline + "Fabric Engine — class7" headline + joined count, segmented metric strip (Question n/total, Section, Answered n/roster, Correct), controls row (Previous / Next / Refresh / End Session). |
| I6 | Student responses | in I5 | Alphabetical roster: First and Now answer letters, tries, status badge. Students persist across questions as "Not answered" until they respond. |
| I7 | Answer distribution | in I5 | Grouped bar chart: first answers (one vote per student) vs all submissions, correct option flagged on the axis. |
| I8 | Response statistics | in I5 | First-try / one-retry / multiple / still-working / roster size. |
| I9 | Submissions analytics | `historicalSection` | Filters (quiz, date range, search) at one 38px height, KPI tiles, score distribution, topic mastery weakest-first, Pre→Post movement, hardest questions, sortable table, CSV export. |

## Where the styles live

- `styles.css` — tokens for all three themes, base, icons, logo, global bar,
  buttons, fields, panel pattern, chips.
- `theme.js` — theme switching + persistence + the Extreme node-graphic canvas.
- Each page's `<style>` — layout only (grids, strips, charts, hero, cards).
- Assets: `assets/logo-white.svg` (used in the bar), black + colour variants
  committed for future collateral. Icon sprite is inline in each page: 15
  stroke-only symbols using `currentColor`.
