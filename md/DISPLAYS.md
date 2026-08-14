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
| Buttons | Three roles: `btn-primary` (solid accent — moves things forward), `btn-secondary` (tonal accent — supporting), `btn-danger` (tinted red — destructive). One size per row. Every button carries an icon and a `.btn-label` span, and always names a role class — a bare `.btn` gets the accent fill without the accent border. |
| Button emphasis | `.btn.is-ready` promotes whichever control has become the obvious next step to the solid accent. Exactly one per row at a time, or it stops meaning anything. On the quiz: nothing until an answer is picked, then Next, then Finish Quiz on the last question. |
| Disabled | An explicit muted fill (`--btn-off`), never a blanket opacity — at `.42` a secondary's label measured 2.65:1, under the readable minimum. |
| Surfaces | Two tiers, and the split is the rule: **if it holds prose, it is opaque**. `--surface` / `--surface-2` are content fills, opaque in every theme — every card runs through the 14-selector `.panel` group in styles.css. `--chrome` / `--chrome-2` are page furniture — status strips, action rows, the filter bar — translucent on Extreme so the animated canvas still moves behind the page. Question cards use `--field`, answer rows `--opt`. Only the Extreme theme is affected; Dark and Light were already opaque. |
| Panels | `.panel` surface + uppercase tracked `.panel-h` heading. All boxed regions use it. |
| Action placement | Buttons sit at the top of a screen, above variable-height content, so controls never shift. |
| Confirmations | Destructive or lossy actions confirm on the button itself (label swaps to "Discard?" / "Finish anyway" / "Click again to confirm") plus a toast, never `window.confirm()`. Once a browser offers "prevent additional dialogs" and the user accepts, `confirm()` returns false forever and the button becomes a silent no-op — which is how End Session broke once already. |
| Transient status | Every dynamic message ("Now showing question 3", "Couldn't reach the server", form validation) goes to a corner toast via `window.toast(message, type)` in `theme.js` — bottom-right, semi-transparent, self-expiring, colour-coded by `info` / `ok` / `warn` / `error`. Toasts are fixed-position, so showing one never moves the page. There are no inline status banners and no `alert()` calls left in either page. |

## Student app — index.html

| # | Display | Screen id | Purpose / notes |
|---|---------|-----------|-----------------|
| S1 | Home / mode selection | `modeSelectionScreen` | "EXtreme Assessment Module" hero, brand rule, three mode cards (Pre-Class Knowledge Check, In-Class Session, Post-Class Review). |
| S2 | Before We Begin | `studentInfoScreen` | Form card: name, optional email, and the run mode — **Test** (answers withheld until submitted, result recorded) or **Practice** (explained as you go, nothing recorded). |
| S3 | Join Your Class | `sessionJoinScreen` | Form card: name, optional email, class ID. |
| S4 | Full quiz | `fullQuizScreen` | Scheme B: action row (Previous / Next / Finish) → status strip (counter, **topic**, progress bar, student, mode) → **question card** holding question, letter-badge options and the reserved feedback slot. Nothing above the slot moves when answering. In test mode the slot is hidden for the whole run. |
| S5 | Results | `fullQuizResultsScreen` | Action row (Submit / Start Over / submit-state chip), animated score ring, verdict, stat tiles, topic breakdown weakest-first, **Your Answers** question-by-question review, What To Review with generated YouTube links. Practice hides the Submit button and opens the review immediately; test seals the review until Submit Results is pressed — and opens it even if that submit fails, so a network problem never costs a student their feedback. |
| S6 | In-class question | `inclassQuizScreen` | Action row (Submit Answer / Check for Question) → status strip (question #, **topic**, seen-so-far segments, attempt chip) → question card → options → reserved feedback slot. On-demand fetch, no polling. |
| S7 | Session ended | inside `inclassQuizScreen` | Panel with a Start New Quiz action. Shown only when a session that *was* active is ended by the instructor. |
| S9 | Post-Class Review | `postClassScreen` | Form card listing one outbound survey per course, built from `POST_CLASS_SURVEYS` in index.html. Opens SurveyMonkey in a new tab; nothing is collected in this tool. Adding a course is one row in that array. |
| S8 | Waiting for the instructor | inside `inclassQuizScreen` | Where students land when they join before the session exists — which is normal, since the class arrives before the instructor opens it. Check for Question toasts "has not been opened yet" and the student stays put; Home in the global bar is the way out of a mistyped class ID. |

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
| I9 | Submissions analytics | `historicalSection` | Filter bar panel (quiz, date range, search, Refresh, Export CSV) at one 38px height, KPI tiles, score distribution, topic mastery weakest-first, Pre→Post movement, hardest questions, sortable table, CSV export. |

## Where the styles live

- `styles.css` — tokens for all three themes, base, icons, logo, global bar,
  buttons, fields, panel pattern, chips.
- `theme.js` — theme switching + persistence, the Extreme node-graphic canvas,
  and the shared `window.toast()` corner-notification stack.
- Each page's `<style>` — layout only (grids, strips, charts, hero, cards).
- Assets: `assets/logo-white.svg` (used in the bar), black + colour variants
  committed for future collateral. Icon sprite is inline in each page: 17
  stroke-only symbols using `currentColor`.
- `styles.css` and `theme.js` are loaded with a `?v=` query. Bump it whenever
  either changes: the HTML deploys instantly via GitHub Pages, so a stale
  cached stylesheet otherwise ships alongside fresh markup.
