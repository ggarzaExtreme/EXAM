"""Generate demo seed data for EXAM.

Emits two artefacts from one dataset, so the screenshots in the launch note
show exactly what a teammate will see after running the SQL:

  sql/seed-demo-data.sql   - INSERTs for Supabase (run in the SQL editor)
  scratchpad/demo-data.json - the same rows, for driving the local UI
                              (gitignored; regenerate with this script)

Deterministic: fixed seed, and all timestamps are derived from ANCHOR rather
than "now", so re-running produces an identical file.
"""
import json, os, random, datetime as dt

random.seed(20260813)
ANCHOR = dt.datetime(2026, 8, 13, 9, 0)          # "today" for the demo window
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- questions --
# id / topic / correct-option index, lifted from the real quiz data files.
PRE = [
    (1, "Layer 2 Switching", 1), (2, "Layer 2 Switching", 1), (3, "Layer 2 Switching", 1),
    (4, "Layer 2 Switching", 1), (5, "Layer 2 Switching", 1),
    (6, "VLANs & Trunks", 1), (7, "VLANs & Trunks", 0), (8, "VLANs & Trunks", 1),
    (9, "VLANs & Trunks", 1), (10, "VLANs & Trunks", 1),
    (11, "Subnetting & IP Addressing", 0), (12, "Subnetting & IP Addressing", 2),
    (13, "Subnetting & IP Addressing", 0), (14, "Subnetting & IP Addressing", 1),
    (15, "Subnetting & IP Addressing", 3), (16, "Subnetting & IP Addressing", 1),
    (17, "ARP & Default Gateway", 0), (18, "ARP & Default Gateway", 1),
    (19, "ARP & Default Gateway", 1), (20, "ARP & Default Gateway", 1),
    (21, "Routing & VRF", 1), (22, "Routing & VRF", 2), (23, "Routing & VRF", 1),
    (24, "Routing & VRF", 0), (25, "Routing & VRF", 1), (26, "Routing & VRF", 0),
    (27, "Routing & VRF", 1), (28, "Routing & VRF", 0),
    (29, "CLI & Troubleshooting", 1), (30, "CLI & Troubleshooting", 1),
    (31, "CLI & Troubleshooting", 1), (32, "CLI & Troubleshooting", 1),
]
POST = [
    (1, "Course Concepts", 1), (2, "Instructor Feedback", 0), (3, "Course Content", 0),
    (4, "Course Pace", 1), (5, "Hands-on Labs", 0), (6, "Course Materials", 0),
    (7, "Support Resources", 0), (8, "Real-World Application", 0),
    (9, "Instructor Knowledge", 0), (10, "Overall Satisfaction", 0),
]
FABRIC = [(i, t, c) for i, t, c in [
    (1, "OS Naming", 0), (2, "Zero-Touch Onboarding", 1), (3, "Quick SPBM Setup", 2),
    (4, "EDM SPBM Configuration", 3), (5, "spbm-config-mode Caveat", 0),
    (6, "CLI Configuration Basics", 1), (7, "Backbone VLAN Consistency", 2),
    (8, "NNI Port Behavior", 3),
]]

# How well the cohort does per topic. Subnetting and Routing/VRF are the
# designed weak spots so Topic Mastery and Hardest Questions have real shape.
TOPIC_BASE = {
    "Layer 2 Switching": .87, "VLANs & Trunks": .79,
    "Subnetting & IP Addressing": .56, "ARP & Default Gateway": .74,
    "Routing & VRF": .62, "CLI & Troubleshooting": .83,
}
# Per-question wobble, so two questions in a topic are not equally hard.
QJITTER = {q[0]: random.uniform(-.16, .16) for q in PRE}

# ------------------------------------------------------------------- people --
# Synthetic. @example.com (RFC 2606) so nobody mistakes a seeded row for a
# real colleague's result.
FIRST = ["Alina", "Marcus", "Priya", "Devon", "Sofia", "Ethan", "Naomi", "Caleb",
         "Imani", "Tobias", "Wren", "Rafael", "Yuki", "Owen", "Talia", "Jonas",
         "Freya", "Malik", "Nadia", "Oscar", "Livia", "Andre", "Simone", "Bram",
         "Rosa", "Felix", "Aisha", "Milo", "Greta", "Idris", "Camila", "Soren",
         "Delia", "Kwame"]
LAST = ["Vasquez", "Okonjo", "Lindqvist", "Barros", "Nakamura", "Fitzgerald",
        "Amari", "Duarte", "Kowalski", "Mbeki", "Ferrara", "Stavros", "Halvorsen",
        "Oyelaran", "Bianchi", "Rasmussen", "Sandoval", "Whitlock", "Petrova",
        "Adeyemi", "Marchetti", "Novak", "Silva", "Berger", "Castellanos",
        "Thorne", "Ibrahim", "Larsen", "Moreau", "Quintero", "Ashworth",
        "Delacroix", "Vukovic", "Osei"]
PEOPLE = []
for i in range(34):
    n = "%s %s" % (FIRST[i], LAST[i])
    PEOPLE.append({
        "name": n,
        "email": "%s.%s@example.com" % (FIRST[i].lower(), LAST[i].lower()),
        # ability multiplier; a couple of strong and a couple of struggling
        "ability": max(.55, min(1.32, random.gauss(1.0, .19))),
    })


def business_time(days_ago):
    """A plausible weekday timestamp, days_ago before the anchor."""
    d = ANCHOR - dt.timedelta(days=days_ago)
    while d.weekday() >= 5:                       # nudge weekends to Friday
        d -= dt.timedelta(days=1)
    return d.replace(hour=random.randint(8, 16), minute=random.choice([4, 11, 19, 27, 33, 41, 52]),
                     second=random.randint(0, 59), microsecond=0)


def take(questions, person, base_lookup, jitter, window):
    """One student's run through a quiz. Returns a submissions row dict."""
    responses, topics = [], {}
    for qid, topic, correct in questions:
        p = base_lookup(topic) + jitter.get(qid, 0)
        p = max(.05, min(.97, p * person["ability"]))
        ok = random.random() < p
        if ok:
            sel = correct
        else:
            sel = random.choice([i for i in range(4) if i != correct])
        responses.append({"selected": chr(65 + sel), "isCorrect": ok, "question_id": qid})
        t = topics.setdefault(topic, {"correct": 0, "total": 0})
        t["total"] += 1
        t["correct"] += 1 if ok else 0

    n_correct = sum(1 for r in responses if r["isCorrect"])
    total = len(responses)
    return {
        "name": person["name"], "email": person["email"],
        "score": round(n_correct / total * 100),
        "total_questions": total, "correct_answers": n_correct,
        "topic_scores": topics, "responses": responses,
        "created_at": business_time(random.randint(*window)),
    }


rows = []
# Pre-class: everyone, spread across the last six weeks.
for p in PEOPLE:
    r = take(PRE, p, lambda t: TOPIC_BASE[t], QJITTER, (1, 41))
    r["quiz_type"] = "pretraining"
    r["duration_minutes"] = max(9, round(31 - p["ability"] * 9 + random.uniform(-3, 5)))
    rows.append(r)

# Post-class review is a satisfaction survey, not a knowledge re-test, so it
# scores high and only a subset of the cohort fills it in.
for p in PEOPLE[:21]:
    r = take(POST, p, lambda t: .90, {}, (1, 28))
    r["quiz_type"] = "post_class"
    r["duration_minutes"] = random.randint(3, 8)
    rows.append(r)

rows.sort(key=lambda r: r["created_at"])

# ---------------------------------------------- in-class live demo session --
# 14 of the cohort, part-way through a Fabric Engine session: questions 1-3
# closed out, question 4 still in progress. Retries included, because retry
# behaviour is the thing the live view is actually for.
LIVE = PEOPLE[:14]
SESSION_START = ANCHOR - dt.timedelta(minutes=26)
qr = []
for qi, (qid, topic, correct) in enumerate(FABRIC[:4]):
    asked = SESSION_START + dt.timedelta(minutes=qi * 6)
    for si, p in enumerate(LIVE):
        # on the live question, a few students have not answered yet
        if qi == 3 and si >= 9:
            continue
        p_first = max(.2, min(.95, .66 * p["ability"]))
        attempt, done = 1, False
        while not done and attempt <= 3:
            ok = random.random() < (p_first if attempt == 1 else min(.9, p_first + .28 * attempt))
            sel = correct if ok else random.choice([i for i in range(4) if i != correct])
            qr.append({
                "question_id": str(qid), "name": p["name"], "email": p["email"],
                "selected_option": chr(65 + sel), "is_correct": ok,
                "attempt_number": attempt, "final_answer": ok,
                "time_spent_seconds": random.randint(14, 95),
                "created_at": asked + dt.timedelta(seconds=si * 7 + attempt * 21),
            })
            done = ok
            attempt += 1

# ------------------------------------------------------------------ output --
def q(v):
    return "'" + str(v).replace("'", "''") + "'"


def jq(v):
    return "'" + json.dumps(v, separators=(",", ":")).replace("'", "''") + "'::jsonb"


out = []
out.append("""-- EXAM demo seed data
--
-- Sample submissions so the Student Submissions analytics and the in-class
-- live view have something to show during a walkthrough. Safe to re-run: the
-- first statement deletes only rows this script created (every demo address
-- ends in @example.com, which is the RFC 2606 documentation domain and can
-- never belong to a real person).
--
-- Run in the Supabase SQL editor. Nothing here touches schema or policies.
--
-- Generated by scripts/gen_seed.py - edit that, not this file.

BEGIN;

-- ===== clean out any previous run =====
DELETE FROM question_responses WHERE email LIKE '%@example.com';
DELETE FROM submissions        WHERE email LIKE '%@example.com';
DELETE FROM class_sessions     WHERE class_id = 'demo-fabric';

-- ===== full-quiz submissions =====
INSERT INTO submissions
  (created_at, quiz_type, name, email, score, total_questions,
   correct_answers, duration_minutes, topic_scores, responses, submission_type)
VALUES""")

vals = []
for r in rows:
    vals.append("  (%s, %s, %s, %s, %d, %d, %d, %d, %s, %s, 'full_quiz')" % (
        q(r["created_at"].isoformat(sep=" ")), q(r["quiz_type"]), q(r["name"]),
        q(r["email"]), r["score"], r["total_questions"], r["correct_answers"],
        r["duration_minutes"], jq(r["topic_scores"]), jq(r["responses"])))
out.append(",\n".join(vals) + ";")

out.append("""
-- ===== in-class live session =====
-- Attached to your instructor account so the dashboard's row-level security
-- lets you see it. If the project has more than one instructor, replace the
-- SELECT below with the address you sign in as.
DO $$
DECLARE
  v_instructor UUID;
  v_session    UUID;
BEGIN
  SELECT id INTO v_instructor FROM auth.users ORDER BY created_at LIMIT 1;
  -- SELECT id INTO v_instructor FROM auth.users WHERE email = 'you@extremenetworks.com';

  IF v_instructor IS NULL THEN
    RAISE NOTICE 'No auth user found - skipping the live session. Submissions still loaded.';
    RETURN;
  END IF;

  INSERT INTO class_sessions
    (class_id, instructor_id, quiz_type, session_name, current_question_id,
     is_active, student_count, created_at, updated_at)
  VALUES
    ('demo-fabric', v_instructor, 'fabric', 'Demo - Fabric Engine walkthrough',
     '4', TRUE, 14, %s, %s)
  RETURNING id INTO v_session;

  INSERT INTO question_responses
    (session_id, question_id, quiz_type, name, email, selected_option,
     is_correct, time_spent_seconds, attempt_number, final_answer, created_at)
  VALUES""" % (q(SESSION_START.isoformat(sep=" ")), q(ANCHOR.isoformat(sep=" "))))

qvals = []
for r in qr:
    qvals.append("    (v_session, %s, 'fabric', %s, %s, %s, %s, %d, %d, %s, %s)" % (
        q(r["question_id"]), q(r["name"]), q(r["email"]), q(r["selected_option"]),
        "TRUE" if r["is_correct"] else "FALSE", r["time_spent_seconds"],
        r["attempt_number"], "TRUE" if r["final_answer"] else "FALSE",
        q(r["created_at"].isoformat(sep=" "))))
out.append(",\n".join(qvals) + ";\nEND $$;\n\nCOMMIT;")

out.append("""
-- ===== what you should see afterwards =====
--   Student Submissions -> Pre-Class Assessment, All time
--     %d submissions, Subnetting and Routing/VRF weakest on Topic Mastery
--   Student Submissions -> Post-Class Review
--     %d responses (satisfaction survey - scores run high by design)
--   In-Class Live Sessions
--     class ID "demo-fabric", live on question 4, 9 of 14 answered
--
-- Pre -> Post Movement stays hidden, by design: it compares topic names
-- across the two quizzes, and the post-class review asks about the course
-- (Course Pace, Hands-on Labs) rather than re-testing the networking topics,
-- so the two sets share no topic. The card only appears once a post-class
-- quiz re-tests the same topics as the pre-class check.
--
-- To clear the demo out again:
--   DELETE FROM question_responses WHERE email LIKE '%%@example.com';
--   DELETE FROM submissions        WHERE email LIKE '%%@example.com';
--   DELETE FROM class_sessions     WHERE class_id = 'demo-fabric';""" % (
    sum(1 for r in rows if r["quiz_type"] == "pretraining"),
    sum(1 for r in rows if r["quiz_type"] == "post_class")))

sql_path = os.path.join(ROOT, "sql", "seed-demo-data.sql")
with open(sql_path, "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(out) + "\n")

json_path = os.path.join(ROOT, "scratchpad", "demo-data.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump({
        "submissions": [dict(r, created_at=r["created_at"].isoformat()) for r in rows],
        "question_responses": [dict(r, created_at=r["created_at"].isoformat()) for r in qr],
        "roster": [{"name": p["name"], "email": p["email"]} for p in LIVE],
    }, f, indent=1)

pre = [r for r in rows if r["quiz_type"] == "pretraining"]
print("submissions: %d pre-class, %d post-class" % (len(pre), len(rows) - len(pre)))
print("pre-class mean score: %.1f%%  range %d-%d" % (
    sum(r["score"] for r in pre) / len(pre),
    min(r["score"] for r in pre), max(r["score"] for r in pre)))
print("question_responses: %d rows, %d students" % (len(qr), len(LIVE)))
print("wrote %s" % sql_path)
print("wrote %s" % json_path)
