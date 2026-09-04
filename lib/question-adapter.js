/**
 * Question Schema Adapter
 *
 * Normalizes v1 (legacy) and v2 (Assessment Schema) questions to a unified internal format.
 * Enables backward compatibility with existing questions while supporting new metadata.
 *
 * v1 questions (topic, options with inline feedback) are automatically transformed.
 * v2 questions (objective, competencies, answerFeedback) are validated and enriched with defaults.
 */

/**
 * Detect question schema version
 * @param {Object} q - Question object
 * @returns {string} 'v1' or 'v2'
 */
export function detectVersion(q) {
  // v2 has answers array; v1 has options array
  if (q.answers && !q.options) return 'v2';
  if (q.options && !q.answers) return 'v1';

  // Edge case: if both exist, v2 takes precedence
  if (q.answers) return 'v2';
  return 'v1';
}

/**
 * Transform v1 options to v2 answers array
 * @param {Array} options - v1 options with {text, feedback, isCorrect}
 * @returns {Array} v2 answers with {text, id}
 */
function transformOptions(options) {
  return options.map((opt, i) => ({
    text: opt.text,
    id: String.fromCharCode(65 + i)  // A, B, C, D
  }));
}

/**
 * Find correct answer ID from v1 options
 * @param {Array} options - v1 options
 * @returns {string} Answer ID (A, B, C, D)
 */
function findCorrectAnswerId(options) {
  const idx = options.findIndex(opt => opt.isCorrect === true);
  return idx >= 0 ? String.fromCharCode(65 + idx) : 'a';
}

/**
 * Map v1 inline feedback to v2 answerFeedback structure
 * @param {Array} options - v1 options
 * @returns {Object} answerFeedback map: {id: {correct/wrong, misconception}}
 */
function mapLegacyFeedback(options) {
  return options.reduce((acc, opt, i) => {
    const id = String.fromCharCode(65 + i);
    const isCorrect = opt.isCorrect === true;

    acc[id] = {
      [isCorrect ? 'correct' : 'wrong']: opt.feedback || '',
      misconception: ''  // Legacy doesn't have this; leave empty
    };
    return acc;
  }, {});
}

/**
 * Normalize a question from v1 or v2 format to internal schema
 *
 * v1 questions are transformed with sensible defaults.
 * v2 questions are validated and filled with defaults for optional fields.
 *
 * @param {Object} q - Raw question object
 * @returns {Object} Normalized question with all v2 fields present
 */
export function normalizeQuestion(q) {
  const version = detectVersion(q);

  if (version === 'v1') {
    // Legacy question: transform and apply defaults
    return {
      // Keep existing fields
      id: q.id,
      question: q.question,
      explanation: q.explanation || '',

      // Transform options → answers
      answers: transformOptions(q.options),
      correctAnswer: findCorrectAnswerId(q.options),

      // Apply defaults for new metadata
      domain: q.topic || 'Unknown',
      objective: `Assess ${q.topic || 'knowledge'}`,
      primaryType: 'Concept',  // Default for legacy
      masteryLevel: 'Intermediate',  // Assumed default
      competencies: [],

      // Map feedback
      answerFeedback: mapLegacyFeedback(q.options),

      // Initialize remediation
      remediation: {
        objective: '',
        summary: '',
        tags: [],
        aiCoachingPrompt: ''
      },

      // Optional fields (v2 extensions)
      secondaryTypes: [],
      secondaryDomains: [],
      relatedObjectives: [],
      authorPurpose: '',
      distractorReason: {}
    };
  }

  // v2 question: validate and fill defaults
  return {
    id: q.id,
    question: q.question,

    // Required
    answers: q.answers || [],
    correctAnswer: q.correctAnswer || '',
    objective: q.objective || 'Unknown',
    primaryType: q.primaryType || 'Concept',
    // `domain` is the PRIMARY domain — same primary/secondary pattern as
    // primaryType/secondaryTypes below. A question that genuinely spans
    // more than one domain still picks one primary here and lists the
    // rest in secondaryDomains, so dashboards never need an "undefined
    // domain" bucket.
    domain: q.domain || 'Unknown',
    competencies: q.competencies || [],

    // Recommended with defaults
    masteryLevel: q.masteryLevel || 'Intermediate',
    explanation: q.explanation || '',
    answerFeedback: q.answerFeedback || {},
    remediation: q.remediation || {
      objective: '',
      summary: '',
      tags: [],
      aiCoachingPrompt: ''
    },

    // Optional
    secondaryTypes: q.secondaryTypes || [],
    secondaryDomains: q.secondaryDomains || [],
    relatedObjectives: q.relatedObjectives || [],
    authorPurpose: q.authorPurpose || '',
    distractorReason: q.distractorReason || {}
  };
}

/**
 * Get feedback for a specific answer
 * Prioritizes answer-specific feedback over generic explanation.
 *
 * @param {Object} question - Normalized question
 * @param {string} answerId - Selected answer ID (A, B, C, D)
 * @param {boolean} isCorrect - Whether the answer is correct
 * @returns {string} Feedback text (empty string if not found)
 */
export function getAnswerFeedback(question, answerId, isCorrect) {
  const feedback = question.answerFeedback?.[answerId];

  if (!feedback) {
    // Fallback: return explanation if no specific feedback
    return question.explanation || '';
  }

  if (isCorrect) {
    // For correct answers, prefer the "correct" field
    return feedback.correct || feedback.misconception || '';
  }

  // For incorrect answers, prefer the "wrong" field
  return feedback.wrong || feedback.misconception || '';
}

/**
 * Get remediation path for a failed question
 * Returns coaching guidance for the learning objective.
 *
 * @param {Object} question - Normalized question
 * @returns {Object} Remediation object with objective, summary, tags, aiCoachingPrompt
 */
export function getRemediation(question) {
  return {
    objective: question.remediation?.objective || question.objective || '',
    summary: question.remediation?.summary || question.explanation || '',
    tags: question.remediation?.tags || [],
    aiCoachingPrompt: question.remediation?.aiCoachingPrompt || ''
  };
}

/**
 * Schema V2 Enumeration Constants
 * Authoritative lists - do not change without schema revision
 */
export const SCHEMA_V2 = {
  COMPETENCIES: [
    'Traffic Flow Analysis',
    'Troubleshooting Foundations'
  ],
  PRIMARY_TYPES: [
    'Concept',
    'Purpose',
    'Behavior',
    'Scenario',
    'Troubleshooting'
  ],
  MASTERY_LEVELS: [
    'Fundamental',
    'Intermediate',
    'Advanced'
  ],
  // The pilot's 30 questions each map to exactly one of these. Dashboards
  // group by domain first (objective is the drill-down) since ~30 raw
  // objectives is too granular a list to show as a primary view.
  DOMAINS: [
    'Network Foundations',
    'Ethernet and Switching',
    'IP Addressing and Routing',
    'Resiliency and Operations',
    'Modern Networking Concepts',
    'Operational CLI Skills'
  ]
};

/**
 * Validate a normalized question
 * Returns array of validation errors (empty if valid).
 * Enforces strict Schema V2 compliance.
 *
 * @param {Object} question - Normalized question
 * @returns {Array<string>} Validation errors
 */
export function validateQuestion(question) {
  const errors = [];

  // ===== REQUIRED FIELDS =====

  if (!question.id || typeof question.id !== 'number') {
    errors.push('Missing or invalid id (must be number)');
  }

  if (!question.question || question.question.trim() === '') {
    errors.push('Missing or empty question text');
  }

  if (!Array.isArray(question.answers) || question.answers.length < 2) {
    errors.push('Must have at least 2 answers');
  }

  if (!question.correctAnswer) {
    errors.push('Missing correctAnswer');
  }

  const validIds = new Set(question.answers.map(a => a.id));
  if (!validIds.has(question.correctAnswer)) {
    errors.push(`correctAnswer "${question.correctAnswer}" does not match any answer id`);
  }

  if (!question.objective || question.objective.trim() === '') {
    errors.push('Missing objective');
  }

  // Strict primaryType validation
  if (!SCHEMA_V2.PRIMARY_TYPES.includes(question.primaryType)) {
    errors.push(
      `Invalid primaryType: "${question.primaryType}". ` +
      `Must be one of: ${SCHEMA_V2.PRIMARY_TYPES.join(', ')}`
    );
  }

  if (!Array.isArray(question.competencies)) {
    errors.push('competencies must be an array');
  }

  // ===== COMPETENCY VALIDATION =====

  // Check each competency against authoritative list
  question.competencies?.forEach(comp => {
    if (!SCHEMA_V2.COMPETENCIES.includes(comp)) {
      errors.push(
        `Unknown competency: "${comp}". ` +
        `Valid values: ${SCHEMA_V2.COMPETENCIES.join(', ')}`
      );
    }
  });

  // ===== RECOMMENDED FIELDS =====

  // Mastery level validation (if present)
  if (question.masteryLevel && !SCHEMA_V2.MASTERY_LEVELS.includes(question.masteryLevel)) {
    errors.push(
      `Invalid masteryLevel: "${question.masteryLevel}". ` +
      `Must be one of: ${SCHEMA_V2.MASTERY_LEVELS.join(', ')}`
    );
  }

  // Domain validation (if present) — domain is not required (a question
  // may not have settled on one yet), but a value that IS given must be
  // one of the authoritative domains or dashboards can't group by it.
  if (question.domain && question.domain !== 'Unknown' &&
      !SCHEMA_V2.DOMAINS.includes(question.domain)) {
    errors.push(
      `Invalid domain: "${question.domain}". ` +
      `Must be one of: ${SCHEMA_V2.DOMAINS.join(', ')}`
    );
  }
  (question.secondaryDomains || []).forEach(d => {
    if (!SCHEMA_V2.DOMAINS.includes(d)) {
      errors.push(
        `Invalid secondaryDomains entry: "${d}". ` +
        `Must be one of: ${SCHEMA_V2.DOMAINS.join(', ')}`
      );
    }
  });

  // ===== OPTIONAL FIELDS =====

  // Secondary types: no strict validation (future extension point)
  // Author purpose: no strict validation (free-form)

  return errors;
}

/**
 * Batch normalize and validate questions
 * @param {Array} questions - Raw questions
 * @param {Object} options - {logErrors: boolean}
 * @returns {Object} {valid: Array, invalid: Array}
 */
export function normalizeQuestions(questions, options = {}) {
  const { logErrors = false } = options;
  const valid = [];
  const invalid = [];

  questions.forEach(q => {
    try {
      const normalized = normalizeQuestion(q);
      const errors = validateQuestion(normalized);

      if (errors.length === 0) {
        valid.push(normalized);
      } else {
        invalid.push({
          id: q.id,
          errors
        });
        if (logErrors) {
          console.warn(`Question ${q.id} validation failed:`, errors);
        }
      }
    } catch (e) {
      invalid.push({
        id: q?.id || 'unknown',
        errors: [e.message]
      });
      if (logErrors) {
        console.error(`Question normalization failed:`, e);
      }
    }
  });

  return { valid, invalid };
}
