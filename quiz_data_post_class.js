// Post-Class Review/Feedback Quiz Data
// 10 placeholder questions

window.quizData = [
  {
    id: 1,
    topic: "Course Concepts",
    section: "General",
    question: "Did the course material match your expectations?",
    options: [
      { text: "Exceeded expectations", feedback: "Great! We're glad the content was valuable.", isCorrect: false },
      { text: "Met expectations", feedback: "Thank you for confirming the content quality.", isCorrect: true },
      { text: "Below expectations", feedback: "We appreciate this feedback for future improvements.", isCorrect: false },
      { text: "I haven't taken the course yet", feedback: "Please take the course first, then return to this assessment.", isCorrect: false }
    ],
    explanation: "This question helps us understand if the course content aligns with student expectations.",
    resources: {
      videoTopic: "Course Quality",
      youtubeLinks: [
        { title: "Course Overview", url: "https://www.youtube.com/results?search_query=extreme+networks" }
      ]
    }
  },
  {
    id: 2,
    topic: "Instructor Feedback",
    section: "General",
    question: "How would you rate the instructor's teaching style?",
    options: [
      { text: "Excellent", feedback: "Thank you! We'll pass this along.", isCorrect: true },
      { text: "Good", feedback: "We appreciate your feedback.", isCorrect: false },
      { text: "Adequate", feedback: "Thank you for the honest feedback.", isCorrect: false },
      { text: "Needs improvement", feedback: "We value this constructive feedback.", isCorrect: false }
    ],
    explanation: "Instructor feedback helps us improve teaching quality for future sessions.",
    resources: {
      videoTopic: "Teaching Methods",
      youtubeLinks: [
        { title: "Effective Teaching", url: "https://www.youtube.com/results?search_query=teaching+best+practices" }
      ]
    }
  },
  {
    id: 3,
    topic: "Course Content",
    section: "General",
    question: "Which topic was most useful?",
    options: [
      { text: "Networking fundamentals", feedback: "Good to know this foundational topic was helpful.", isCorrect: true },
      { text: "Advanced configurations", feedback: "Great feedback on deeper topics.", isCorrect: false },
      { text: "Troubleshooting methodology", feedback: "Excellent choice for practical skills.", isCorrect: false },
      { text: "All topics equally useful", feedback: "We're glad the overall curriculum was valuable.", isCorrect: false }
    ],
    explanation: "Understanding which topics resonate most helps us prioritize curriculum updates.",
    resources: {
      videoTopic: "Networking Concepts",
      youtubeLinks: [
        { title: "Networking Fundamentals", url: "https://www.youtube.com/results?search_query=networking+fundamentals" }
      ]
    }
  },
  {
    id: 4,
    topic: "Course Pace",
    section: "General",
    question: "How was the pace of the course?",
    options: [
      { text: "Too slow", feedback: "We can accelerate content for advanced students.", isCorrect: false },
      { text: "Just right", feedback: "Perfect! We'll maintain this pace.", isCorrect: true },
      { text: "Too fast", feedback: "We'll add more time for complex topics next time.", isCorrect: false },
      { text: "Inconsistent", feedback: "We appreciate this feedback on pacing consistency.", isCorrect: false }
    ],
    explanation: "Feedback on course pace helps us optimize learning outcomes.",
    resources: {
      videoTopic: "Course Design",
      youtubeLinks: [
        { title: "Adult Learning Principles", url: "https://www.youtube.com/results?search_query=adult+learning+theory" }
      ]
    }
  },
  {
    id: 5,
    topic: "Hands-on Labs",
    section: "General",
    question: "How valuable were the hands-on lab exercises?",
    options: [
      { text: "Very valuable", feedback: "Excellent! We'll include more hands-on work.", isCorrect: true },
      { text: "Somewhat valuable", feedback: "We'll enhance the lab experience.", isCorrect: false },
      { text: "Not very valuable", feedback: "We'll redesign the labs based on this feedback.", isCorrect: false },
      { text: "No labs in my course", feedback: "Different course offerings vary in lab availability.", isCorrect: false }
    ],
    explanation: "Lab feedback helps us improve practical learning opportunities.",
    resources: {
      videoTopic: "Lab Exercises",
      youtubeLinks: [
        { title: "Hands-on Learning", url: "https://www.youtube.com/results?search_query=hands+on+learning" }
      ]
    }
  },
  {
    id: 6,
    topic: "Course Materials",
    section: "General",
    question: "Were the course materials well-organized?",
    options: [
      { text: "Very well-organized", feedback: "Great! Clear organization aids learning.", isCorrect: true },
      { text: "Mostly organized", feedback: "We'll improve the structure.", isCorrect: false },
      { text: "Somewhat disorganized", feedback: "We'll reorganize the materials.", isCorrect: false },
      { text: "Very disorganized", feedback: "We apologize and will restructure the content.", isCorrect: false }
    ],
    explanation: "Material organization directly impacts student comprehension and retention.",
    resources: {
      videoTopic: "Content Organization",
      youtubeLinks: [
        { title: "Instructional Design", url: "https://www.youtube.com/results?search_query=instructional+design+principles" }
      ]
    }
  },
  {
    id: 7,
    topic: "Support Resources",
    section: "General",
    question: "How helpful were the support resources available?",
    options: [
      { text: "Very helpful", feedback: "We're glad support was accessible.", isCorrect: true },
      { text: "Somewhat helpful", feedback: "We'll expand our support offerings.", isCorrect: false },
      { text: "Not very helpful", feedback: "We'll improve support accessibility.", isCorrect: false },
      { text: "Didn't use support", feedback: "Support is available if you need it in the future.", isCorrect: false }
    ],
    explanation: "Good support resources enhance the learning experience and confidence.",
    resources: {
      videoTopic: "Learning Support",
      youtubeLinks: [
        { title: "Effective Support Systems", url: "https://www.youtube.com/results?search_query=learning+support" }
      ]
    }
  },
  {
    id: 8,
    topic: "Real-World Application",
    section: "General",
    question: "How well did the course apply to real-world scenarios?",
    options: [
      { text: "Very applicable", feedback: "Excellent! Real-world relevance enhances learning.", isCorrect: true },
      { text: "Mostly applicable", feedback: "We'll add more practical examples.", isCorrect: false },
      { text: "Limited application", feedback: "We'll increase real-world relevance.", isCorrect: false },
      { text: "Not applicable", feedback: "We'll review the course content for relevance.", isCorrect: false }
    ],
    explanation: "Courses with strong real-world application improve job readiness.",
    resources: {
      videoTopic: "Practical Applications",
      youtubeLinks: [
        { title: "Real-World Examples", url: "https://www.youtube.com/results?search_query=real+world+networking+examples" }
      ]
    }
  },
  {
    id: 9,
    topic: "Instructor Knowledge",
    section: "General",
    question: "Did the instructor demonstrate strong knowledge of the subject?",
    options: [
      { text: "Absolutely", feedback: "Thank you for recognizing our expertise.", isCorrect: true },
      { text: "Generally yes", feedback: "We appreciate the feedback.", isCorrect: false },
      { text: "Somewhat", feedback: "We'll continue professional development.", isCorrect: false },
      { text: "Not really", feedback: "We'll address knowledge gaps.", isCorrect: false }
    ],
    explanation: "Instructor expertise directly impacts course quality and credibility.",
    resources: {
      videoTopic: "Expert Knowledge",
      youtubeLinks: [
        { title: "Subject Matter Expertise", url: "https://www.youtube.com/results?search_query=expert+knowledge" }
      ]
    }
  },
  {
    id: 10,
    topic: "Overall Satisfaction",
    section: "General",
    question: "Would you recommend this course to others?",
    options: [
      { text: "Definitely yes", feedback: "Thank you! Word-of-mouth recommendations mean a lot.", isCorrect: true },
      { text: "Probably yes", feedback: "We're glad you found it worthwhile.", isCorrect: false },
      { text: "Maybe", feedback: "We'll work on improving the course.", isCorrect: false },
      { text: "Definitely no", feedback: "We apologize and will address your concerns.", isCorrect: false }
    ],
    explanation: "Recommendation likelihood indicates overall course satisfaction.",
    resources: {
      videoTopic: "Course Quality",
      youtubeLinks: [
        { title: "Quality Assurance", url: "https://www.youtube.com/results?search_query=education+quality+assurance" }
      ]
    }
  }
];
