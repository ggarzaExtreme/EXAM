/**
 * EXAM - Pre-Class Knowledge Assessment V2 (Sample Questions)
 *
 * Assessment Schema V2 format with:
 * - Learning objectives (what learners should know/do)
 * - Question types: Concept, Purpose, Behavior, Scenario, Troubleshooting
 * - Competencies (ONLY): "Traffic Flow Analysis", "Troubleshooting Foundations"
 * - Answer-level feedback (teaches why each option matters)
 * - Remediation paths (recovery guidance for failed objectives)
 * - Mastery levels: Fundamental, Intermediate, Advanced
 *
 * Design principle: Every answer teaches something.
 * - Correct answer: why it's right
 * - Incorrect answers: why wrong + misconception it represents
 *
 * This file demonstrates the new schema. Gradual migration: v1 questions use
 * defaults, v2 questions leverage full metadata.
 */

const quizDataV2 = [
  // ===== EXAMPLE 1: v2 NATIVE QUESTION =====
  {
    id: 1,
    question: "What information does a Layer 2 switch primarily use to forward Ethernet frames?",

    answers: [
      { text: "Destination IP address", id: "a" },
      { text: "Destination MAC address", id: "b" },
      { text: "TCP port number", id: "c" },
      { text: "Subnet mask", id: "d" }
    ],
    correctAnswer: "b",

    // Learning metadata
    objective: "Identify Layer 2 forwarding mechanisms",
    primaryType: "Concept",
    domain: "Layer 2 Switching",
    masteryLevel: "Fundamental",
    competencies: ["Traffic Flow Analysis"],

    // Teaching resources
    explanation: "Layer 2 switches maintain a MAC address table that maps MAC addresses to physical ports. When a frame arrives, the switch looks up the destination MAC address to determine which port to forward the frame to. This is fundamental to switch operation.",

    // Per-answer feedback (teaches why each option matters)
    answerFeedback: {
      a: {
        wrong: "IP addresses are used by routers at Layer 3, not switches. Switches operate at Layer 2 and make decisions based on MAC addresses.",
        misconception: "Confusing Layer 2 switches with Layer 3 routers"
      },
      b: {
        correct: "Correct! Layer 2 switches use the destination MAC address in their MAC address table to forward frames to the correct port.",
        misconception: ""
      },
      c: {
        wrong: "TCP port numbers operate at Layer 4 (Transport). Switches don't examine TCP headers.",
        misconception: "Seeing 'port' and assuming all ports are the same (network vs transport)"
      },
      d: {
        wrong: "Subnet masks relate to IP addressing (Layer 3), not MAC-based forwarding.",
        misconception: "Confusing IP layer concepts with Layer 2 forwarding"
      }
    },

    // Recovery guidance
    remediation: {
      objective: "Understand Layer 2 vs Layer 3 forwarding",
      summary: "Switches (Layer 2) forward based on MAC addresses. Routers (Layer 3) forward based on IP addresses. Each layer uses different information.",
      tags: ["switching-fundamentals", "mac-addressing", "layer-2"],
      aiCoachingPrompt: "The student confused Layer 2 and Layer 3. Start with the OSI model: show where Switches operate (Layer 2 = MAC) vs Routers (Layer 3 = IP). Use an example: 'Your switch looks at the destination MAC address, like the apartment number. The router looks at the IP address, like the city.'"
    },

    // Optional extensions
    relatedObjectives: ["Understand OSI model layers", "Compare switching and routing"],
    authorPurpose: "Pre-assessment: Can students distinguish Layer 2 from Layer 3 operations? Required before advancing to VLANs.",
    secondaryTypes: ["Purpose"],  // Also asks why it's designed this way
    distractorReason: {
      a: "Common confusion: students fresh to networking think all forwarding uses IP addresses",
      c: "Natural trap: 'port' appears in both 'switch port' and 'TCP port'; students conflate them",
      d: "Another IP confusion: students see routing mentioned and assume IP is involved everywhere"
    }
  },

  // ===== EXAMPLE 2: v2 BEHAVIOR QUESTION =====
  {
    id: 2,
    question: "A switch receives a frame with an unknown destination MAC address. What is the typical behavior?",

    answers: [
      { text: "Drop the frame immediately", id: "a" },
      { text: "Flood the frame out all appropriate ports in the same VLAN except the source port", id: "b" },
      { text: "Send the frame only to trunk ports", id: "c" },
      { text: "Route the frame using the default gateway", id: "d" }
    ],
    correctAnswer: "b",

    // Learning metadata
    objective: "Explain switch flooding behavior for unknown unicast destinations",
    primaryType: "Behavior",  // Asks "what happens?" not just "what is?"
    domain: "Layer 2 Switching",
    masteryLevel: "Intermediate",  // Requires understanding of VLANs + flooding
    competencies: ["Traffic Flow Analysis", "Troubleshooting Foundations"],

    // Teaching resources
    explanation: "Flooding is the switch's way of handling unknown unicast destinations. By flooding to all ports in the VLAN (except the source), the frame reaches the destination host, which typically responds. The switch then learns the destination's MAC address and port association from that response. This is the core MAC learning mechanism.",

    answerFeedback: {
      a: {
        wrong: "Switches don't drop unknown unicast frames. They flood them to discover the destination.",
        misconception: "Unknown = error = drop. Actually, unknown = discovery mechanism = flood"
      },
      b: {
        correct: "Correct! When the destination MAC is unknown, the switch floods the frame to all ports in that VLAN except the input port. This helps discover the correct path and often triggers an ARP reply, which teaches the switch.",
        misconception: ""
      },
      c: {
        wrong: "Trunk ports carry multiple VLANs, but flooding is not restricted to trunks. The switch floods to all ports in the same VLAN, including access ports.",
        misconception: "Confusing which ports receive floods (VLAN membership) with trunk configuration"
      },
      d: {
        wrong: "Switches don't route; that's a router function. Switches forward within a VLAN using MAC addresses.",
        misconception: "Layer 2 switches can't route and don't have default gateways"
      }
    },

    remediation: {
      objective: "Understand switch flooding and MAC learning as discovery, not failure",
      summary: "Unknown = opportunity to learn, not an error. Switches flood to all VLAN members. The reply teaches the switch where the destination is. This is normal operation.",
      tags: ["switch-flooding", "mac-learning", "vlan-operation", "switch-behavior"],
      aiCoachingPrompt: "Many students see 'unknown destination' and think 'problem.' But flooding is actually how switches discover the network. Use a post-office analogy: 'If the postal service doesn't know your address, they distribute your letter to all neighborhoods and let it find you. When you reply, they learn your address.'"
    },

    relatedObjectives: [
      "Identify Layer 2 forwarding mechanisms",
      "Explain MAC learning process",
      "Distinguish unicast, broadcast, and multicast forwarding"
    ],
    authorPurpose: "Intermediate check: Do students understand flooding is a *mechanism* for discovery, not a bug? Critical for troubleshooting unknown MAC behavior.",
    secondaryTypes: [],
    distractorReason: {
      a: "Students who think 'unknown' = 'error' naturally choose drop",
      c: "Trunk port confusion; students see trunks and think all special handling involves trunks",
      d: "Layer 2/3 confusion again; students route = default gateway"
    }
  },

  // ===== EXAMPLE 3: v2 SCENARIO QUESTION =====
  {
    id: 3,
    question: "In a switched network, what is the primary benefit of VLANs?",

    answers: [
      { text: "Increasing network bandwidth by creating parallel paths", id: "a" },
      { text: "Logically isolating broadcast domains without requiring a router between them", id: "b" },
      { text: "Automatically backing up switch configurations", id: "c" },
      { text: "Preventing physical cable breaks", id: "d" }
    ],
    correctAnswer: "b",

    // Learning metadata
    objective: "Explain why VLANs partition broadcast domains",
    primaryType: "Scenario",  // "How is it applied?" context
    domain: "VLANs & Trunks",
    masteryLevel: "Intermediate",
    competencies: ["Traffic Flow Analysis"],

    explanation: "A broadcast domain is the set of devices that receive each other's broadcast frames. By default, a switch is one large broadcast domain. VLANs divide the switch into multiple, isolated broadcast domains. Broadcasts from one VLAN don't reach other VLANs, which reduces unnecessary traffic and improves network isolation and security.",

    answerFeedback: {
      a: {
        wrong: "VLANs don't increase bandwidth. They segment a switch's ports logically; bandwidth-doubling requires physical redundancy or better hardware.",
        misconception: "Segmentation = capacity increase. Actually, segmentation = reduced unnecessary traffic = perceived efficiency"
      },
      b: {
        correct: "Correct! VLANs partition a single switch into multiple, isolated broadcast domains. Devices in one VLAN don't receive broadcasts from another VLAN, isolating traffic and improving security—without needing a router between them.",
        misconception: ""
      },
      c: {
        wrong: "VLANs don't handle configuration backup. That's a separate administrative function.",
        misconception: "VLANs have nothing to do with redundancy or backup"
      },
      d: {
        wrong: "VLANs operate at Layer 2 and don't prevent physical failures. Physical redundancy (port channels, ring topologies) handles that.",
        misconception: "Confusing logical isolation (VLANs) with physical redundancy"
      }
    },

    remediation: {
      objective: "Understand broadcast domains and VLAN isolation",
      summary: "VLANs = broadcast domains. Each VLAN is its own broadcast domain. Broadcasts stay in the VLAN. This reduces traffic and isolates devices logically.",
      tags: ["vlan-basics", "broadcast-domain", "traffic-isolation"],
      aiCoachingPrompt: "If a student chose 'A' (bandwidth), they're thinking of capacity; clarify that VLANs reduce *unnecessary* traffic (broadcasts), freeing capacity for useful data. If they chose 'D' (physical), they're confusing logical vs physical—explain that VLANs are software; physical redundancy requires hardware."
    },

    relatedObjectives: [
      "Identify broadcast domain boundaries",
      "Compare VLAN benefits (isolation, management, security)"
    ],
    authorPurpose: "Test understanding of VLAN's primary design goal before advancing to configuration.",
    secondaryTypes: ["Purpose"],
    distractorReason: {
      a: "Student confusion: segmentation feels like it should increase capacity",
      c: "Random distractor; tests reading comprehension vs actual VLAN knowledge",
      d: "Layer 2/Physical confusion; students may overgeneralize VLAN benefits"
    }
  },

  // ===== EXAMPLE 4: v2 TROUBLESHOOTING QUESTION =====
  {
    id: 4,
    question: "A host in VLAN 10 cannot ping a host in VLAN 20. Both are on the same switch. What is the most likely cause?",

    answers: [
      { text: "MAC address table is full and dropped the VLAN 20 entry", id: "a" },
      { text: "A router is needed to route between VLANs; switches don't forward between VLANs", id: "b" },
      { text: "The switch cable is unplugged", id: "c" },
      { text: "VLAN 20 is using broadcast addresses incorrectly", id: "d" }
    ],
    correctAnswer: "b",

    // Learning metadata
    objective: "Diagnose inter-VLAN communication failures",
    primaryType: "Troubleshooting",  // "Why is it broken?"
    domain: "VLANs & Trunks",
    masteryLevel: "Intermediate",
    competencies: ["Troubleshooting Foundations"],

    explanation: "VLANs isolate broadcast domains. Hosts in different VLANs cannot communicate at Layer 2. To communicate between VLANs, traffic must go through a Layer 3 device (router). The router has interfaces on both VLANs and can forward traffic between them. This is a fundamental design principle: VLANs = broadcast isolation = Layer 3 required for inter-VLAN traffic.",

    answerFeedback: {
      a: {
        wrong: "MAC tables don't drop entries simply because they're full; switches use aging (entries expire after ~5 min unused). Even if full, the switch would flood unknown MACs, not block inter-VLAN traffic.",
        misconception: "MAC table fullness blocks communication. Actually, MAC table is per-VLAN and used for forwarding within a VLAN, not between VLANs."
      },
      b: {
        correct: "Correct! VLANs isolate broadcast domains at Layer 2. Hosts in different VLANs cannot communicate without a Layer 3 router to forward between VLANs. This is by design.",
        misconception: ""
      },
      c: {
        wrong: "If the switch cable were unplugged, the entire switch would be disconnected. The question says both hosts are 'on the same switch,' implying connectivity exists.",
        misconception: "Physical failures are the most obvious cause, but the setup implies connectivity exists"
      },
      d: {
        wrong: "Broadcast address configuration doesn't prevent VLAN isolation. VLANs block *all* inter-VLAN Layer 2 traffic, regardless of addressing.",
        misconception: "Assuming addressing issues rather than understanding VLAN isolation"
      }
    },

    remediation: {
      objective: "Understand VLAN isolation and inter-VLAN routing requirements",
      summary: "VLANs isolate at Layer 2. Different VLANs = need a router. Same VLAN = L2 switching only. If your VLANs can't talk, you're missing a router interface.",
      tags: ["inter-vlan-routing", "vlan-isolation", "router-requirement", "troubleshooting"],
      aiCoachingPrompt: "Students who chose 'A' are over-thinking capacity. Redirect: 'MAC tables isolate traffic within a VLAN, not between. Does the question say the switch is full?' Students who chose 'C' or 'D': 'We know connectivity works because both hosts are on the same switch. What's the *logical* barrier?'"
    },

    relatedObjectives: [
      "Apply VLAN isolation principles",
      "Identify Layer 3 requirements for inter-VLAN communication",
      "Diagnose blocked inter-VLAN traffic"
    ],
    authorPurpose: "Troubleshooting validation: Can students apply VLAN knowledge to diagnose real failures? This is critical for support roles.",
    secondaryTypes: [],
    distractorReason: {
      a: "Tempts students who fixate on capacity/memory limits (real in other contexts)",
      c: "Tests if student is actually thinking about the setup or just guessing",
      d: "Misdirects to addressing instead of VLAN principles"
    }
  }

  // ... more questions would follow, mixing v1 and v2 formats
];

// Export in both formats for dual support (browser + Node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizDataV2;
}
if (typeof window !== 'undefined') {
  window.quizData = quizDataV2;
}
