// Fabric Engine In-Class Quiz Data
// Questions organized by presentation section

const quizData = [
  // ===== INTRO SECTION =====
  {
    id: 1,
    topic: "Fabric Engine Basics",
    section: "Intro",
    question: "What is the primary purpose of Fabric Engine?",
    options: [
      { text: "To provide centralized network management", feedback: "Correct! Fabric Engine enables unified management.", isCorrect: true },
      { text: "To replace all network switches", feedback: "Fabric Engine works with existing switches.", isCorrect: false },
      { text: "To manage only wireless devices", feedback: "Fabric Engine manages broader infrastructure.", isCorrect: false },
      { text: "To improve security only", feedback: "Security is one benefit, but it's broader than that.", isCorrect: false }
    ],
    explanation: "Fabric Engine is a management and automation platform for network infrastructure.",
    resources: {
      videoTopic: "Fabric Engine Overview",
      youtubeLinks: [
        { title: "Fabric Engine Introduction", url: "https://www.youtube.com/results?search_query=extreme+fabric+engine+overview" }
      ]
    }
  },
  {
    id: 2,
    topic: "Fabric Architecture",
    section: "Intro",
    question: "Which components are part of the Fabric architecture?",
    options: [
      { text: "Controller, agents, and policies", feedback: "Correct! These are the key architectural components.", isCorrect: true },
      { text: "Only switches and routers", feedback: "Architecture includes more than just hardware.", isCorrect: false },
      { text: "Just the management server", feedback: "Architecture is more distributed than that.", isCorrect: false },
      { text: "Wireless devices only", feedback: "Architecture spans multiple device types.", isCorrect: false }
    ],
    explanation: "Fabric Engine uses a distributed architecture with controllers, agents on devices, and policy engines.",
    resources: {
      videoTopic: "Fabric Architecture",
      youtubeLinks: [
        { title: "Fabric Architecture Explained", url: "https://www.youtube.com/results?search_query=fabric+network+architecture" }
      ]
    }
  },
  {
    id: 3,
    topic: "Fabric Benefits",
    section: "Intro",
    question: "What is a key benefit of using Fabric Engine?",
    options: [
      { text: "Automated policy deployment", feedback: "Yes! Automation is a major advantage.", isCorrect: true },
      { text: "No changes to existing networks", feedback: "Integration requires some changes.", isCorrect: false },
      { text: "Eliminates the need for training", feedback: "Training is still important for operation.", isCorrect: false },
      { text: "Works with any vendor equipment", feedback: "Fabric Engine works best in integrated environments.", isCorrect: false }
    ],
    explanation: "Fabric Engine enables automated, consistent policy deployment across the network infrastructure.",
    resources: {
      videoTopic: "Fabric Benefits",
      youtubeLinks: [
        { title: "Network Automation Benefits", url: "https://www.youtube.com/results?search_query=network+automation+benefits" }
      ]
    }
  },
  {
    id: 4,
    topic: "Fabric Concepts",
    section: "Intro",
    question: "What does 'intent-based' networking mean?",
    options: [
      { text: "Specifying desired outcomes rather than configurations", feedback: "Exactly! Intent-based focuses on outcomes.", isCorrect: true },
      { text: "Creating detailed device-by-device configurations", feedback: "That's traditional config, not intent-based.", isCorrect: false },
      { text: "Manually managing all network policies", feedback: "Intent-based reduces manual management.", isCorrect: false },
      { text: "Using only default settings", feedback: "Intent-based involves defining business intent.", isCorrect: false }
    ],
    explanation: "Intent-based networking allows you to specify business goals, and the system figures out the configurations.",
    resources: {
      videoTopic: "Intent-Based Networking",
      youtubeLinks: [
        { title: "Intent-Based Networking", url: "https://www.youtube.com/results?search_query=intent+based+networking" }
      ]
    }
  },
  {
    id: 5,
    topic: "Getting Started",
    section: "Intro",
    question: "What is the first step in Fabric Engine deployment?",
    options: [
      { text: "Discover and onboard devices", feedback: "Correct! Discovery is the first step.", isCorrect: true },
      { text: "Deploy policies immediately", feedback: "Discovery must come first.", isCorrect: false },
      { text: "Reconfigure all switches", feedback: "Not required as the first step.", isCorrect: false },
      { text: "Remove existing management tools", feedback: "Integration happens gradually.", isCorrect: false }
    ],
    explanation: "Device discovery and onboarding is the foundation of Fabric Engine deployment.",
    resources: {
      videoTopic: "Fabric Deployment",
      youtubeLinks: [
        { title: "Deployment Best Practices", url: "https://www.youtube.com/results?search_query=fabric+engine+deployment" }
      ]
    }
  },

  // ===== LAYER 1 CONFIG SECTION =====
  {
    id: 6,
    topic: "Layer 1 Configuration",
    section: "Layer 1 Config",
    question: "What does Layer 1 configuration in Fabric Engine primarily involve?",
    options: [
      { text: "Port speed, duplex, and physical media settings", feedback: "Correct! Layer 1 handles physical settings.", isCorrect: true },
      { text: "IP address assignment", feedback: "That's Layer 3 configuration.", isCorrect: false },
      { text: "VLAN tagging", feedback: "That's Layer 2 configuration.", isCorrect: false },
      { text: "Application-level policies", feedback: "That's higher in the OSI model.", isCorrect: false }
    ],
    explanation: "Layer 1 configuration manages the physical characteristics of network connections.",
    resources: {
      videoTopic: "Layer 1 Settings",
      youtubeLinks: [
        { title: "Physical Layer Configuration", url: "https://www.youtube.com/results?search_query=osi+layer+1+physical+layer" }
      ]
    }
  },
  {
    id: 7,
    topic: "Port Configuration",
    section: "Layer 1 Config",
    question: "How does Fabric Engine simplify port configuration?",
    options: [
      { text: "Using templates and policy profiles", feedback: "Correct! Templates standardize port config.", isCorrect: true },
      { text: "By requiring manual configuration on each port", feedback: "That's what Fabric Engine avoids.", isCorrect: false },
      { text: "Using only default port settings", feedback: "Flexibility is important.", isCorrect: false },
      { text: "Automatically detecting optimal settings", feedback: "Admin input is required, but simplified.", isCorrect: false }
    ],
    explanation: "Fabric Engine uses reusable templates to apply consistent port configurations across the network.",
    resources: {
      videoTopic: "Port Templates",
      youtubeLinks: [
        { title: "Configuration Templates", url: "https://www.youtube.com/results?search_query=network+port+configuration+templates" }
      ]
    }
  },
  {
    id: 8,
    topic: "Physical Media",
    section: "Layer 1 Config",
    question: "Which physical media types does Fabric Engine support?",
    options: [
      { text: "Copper and optical fiber", feedback: "Correct! Both are commonly supported.", isCorrect: true },
      { text: "Only copper (Ethernet)", feedback: "Modern networks use both types.", isCorrect: false },
      { text: "Only optical fiber", feedback: "Copper connectivity is still common.", isCorrect: false },
      { text: "Wireless signals only", feedback: "Wireless is Layer 1 but not the only media.", isCorrect: false }
    ],
    explanation: "Fabric Engine supports diverse physical media for different deployment scenarios.",
    resources: {
      videoTopic: "Physical Media",
      youtubeLinks: [
        { title: "Network Media Types", url: "https://www.youtube.com/results?search_query=ethernet+fiber+optic+media" }
      ]
    }
  },
  {
    id: 9,
    topic: "Link Aggregation",
    section: "Layer 1 Config",
    question: "What is link aggregation in Fabric Engine?",
    options: [
      { text: "Combining multiple ports into one logical link", feedback: "Correct! Aggregation increases bandwidth.", isCorrect: true },
      { text: "Counting the number of links", feedback: "Aggregation is active linking, not counting.", isCorrect: false },
      { text: "Blocking certain ports", feedback: "That's a security policy, not aggregation.", isCorrect: false },
      { text: "Adding ports to the network", feedback: "Aggregation uses existing ports.", isCorrect: false }
    ],
    explanation: "Link aggregation combines multiple physical connections into a single logical link for increased throughput.",
    resources: {
      videoTopic: "Link Aggregation",
      youtubeLinks: [
        { title: "Port Aggregation (LACP/EtherChannel)", url: "https://www.youtube.com/results?search_query=link+aggregation+lacp" }
      ]
    }
  },
  {
    id: 10,
    topic: "Speed Negotiation",
    section: "Layer 1 Config",
    question: "How does Fabric Engine handle port speed negotiation?",
    options: [
      { text: "Policies define preferred speeds and fall-back options", feedback: "Correct! Policies manage speed negotiation.", isCorrect: true },
      { text: "Always using the maximum speed available", feedback: "Compatibility and policy determine speed.", isCorrect: false },
      { text: "Manual speed adjustment on each port", feedback: "Fabric Engine automates this process.", isCorrect: false },
      { text: "No control over port speeds", feedback: "Speed is definitely configurable.", isCorrect: false }
    ],
    explanation: "Fabric Engine policies allow you to specify port speed preferences and negotiation strategies.",
    resources: {
      videoTopic: "Port Speed",
      youtubeLinks: [
        { title: "Speed Negotiation Best Practices", url: "https://www.youtube.com/results?search_query=ethernet+speed+negotiation" }
      ]
    }
  },

  // ===== LAYER 2 CONFIG SECTION =====
  {
    id: 11,
    topic: "Layer 2 Configuration",
    section: "Layer 2 Config",
    question: "What does Fabric Engine Layer 2 configuration manage?",
    options: [
      { text: "VLANs, trunks, and switching behavior", feedback: "Correct! Layer 2 manages data link.", isCorrect: true },
      { text: "IP routing decisions", feedback: "That's Layer 3 configuration.", isCorrect: false },
      { text: "Physical port settings", feedback: "That's Layer 1 configuration.", isCorrect: false },
      { text: "Application traffic policies", feedback: "That's higher layers.", isCorrect: false }
    ],
    explanation: "Layer 2 configuration in Fabric Engine manages switching, VLANs, and MAC-level operations.",
    resources: {
      videoTopic: "Layer 2 Configuration",
      youtubeLinks: [
        { title: "Data Link Layer (Layer 2)", url: "https://www.youtube.com/results?search_query=osi+layer+2+data+link" }
      ]
    }
  },
  {
    id: 12,
    topic: "VLAN Management",
    section: "Layer 2 Config",
    question: "How does Fabric Engine simplify VLAN management?",
    options: [
      { text: "Dynamic VLAN creation and assignment via policies", feedback: "Correct! Fabric automates VLAN management.", isCorrect: true },
      { text: "Manual VLAN creation on each switch", feedback: "Fabric Engine reduces manual work.", isCorrect: false },
      { text: "Eliminating the need for VLANs", feedback: "VLANs are still fundamental.", isCorrect: false },
      { text: "Using only default VLANs", feedback: "Custom VLAN management is a key benefit.", isCorrect: false }
    ],
    explanation: "Fabric Engine automates VLAN provisioning and management through centralized policies.",
    resources: {
      videoTopic: "VLAN Management",
      youtubeLinks: [
        { title: "VLAN Management Best Practices", url: "https://www.youtube.com/results?search_query=vlan+management+automation" }
      ]
    }
  },
  {
    id: 13,
    topic: "Spanning Tree",
    section: "Layer 2 Config",
    question: "What role does Spanning Tree play in Fabric Engine?",
    options: [
      { text: "Prevents loops while allowing redundancy", feedback: "Correct! STP is crucial for Layer 2.", isCorrect: true },
      { text: "Blocks all redundant connections", feedback: "STP allows some redundancy.", isCorrect: false },
      { text: "Routes packets between subnets", feedback: "That's a Layer 3 function.", isCorrect: false },
      { text: "Manages individual device memories", feedback: "STP is about network topology.", isCorrect: false }
    ],
    explanation: "Spanning Tree Protocol prevents network loops while maintaining redundant paths for reliability.",
    resources: {
      videoTopic: "Spanning Tree",
      youtubeLinks: [
        { title: "Spanning Tree Protocol", url: "https://www.youtube.com/results?search_query=spanning+tree+protocol+stp" }
      ]
    }
  },
  {
    id: 14,
    topic: "MAC Learning",
    section: "Layer 2 Config",
    question: "How does Fabric Engine manage MAC address learning?",
    options: [
      { text: "Automatic learning with policy-based aging and limits", feedback: "Correct! Fabric automates MAC management.", isCorrect: true },
      { text: "Manual MAC address entry on each switch", feedback: "Fabric Engine automates this.", isCorrect: false },
      { text: "Disabling MAC learning entirely", feedback: "Learning is essential for switching.", isCorrect: false },
      { text: "No control over MAC address handling", feedback: "Policies define MAC behavior.", isCorrect: false }
    ],
    explanation: "Fabric Engine manages MAC address learning with automatic discovery and policy-based controls.",
    resources: {
      videoTopic: "MAC Learning",
      youtubeLinks: [
        { title: "MAC Address Learning", url: "https://www.youtube.com/results?search_query=mac+address+learning+table" }
      ]
    }
  },
  {
    id: 15,
    topic: "Switch Groups",
    section: "Layer 2 Config",
    question: "What is a switch group in Fabric Engine?",
    options: [
      { text: "A logical collection of switches with shared policies", feedback: "Correct! Switch groups simplify management.", isCorrect: true },
      { text: "A physical stack of switches", feedback: "Groups are logical, not physical.", isCorrect: false },
      { text: "A backup system for failed switches", feedback: "Groups are for management, not failover.", isCorrect: false },
      { text: "A security group for encryption", feedback: "Groups are organizational, not just security.", isCorrect: false }
    ],
    explanation: "Switch groups allow you to apply consistent policies across multiple switches simultaneously.",
    resources: {
      videoTopic: "Switch Management",
      youtubeLinks: [
        { title: "Device Grouping for Management", url: "https://www.youtube.com/results?search_query=network+device+groups+management" }
      ]
    }
  },

  // ===== LAYER 3 CONFIG SECTION =====
  {
    id: 16,
    topic: "Layer 3 Configuration",
    section: "Layer 3 Config",
    question: "What does Fabric Engine Layer 3 configuration include?",
    options: [
      { text: "IP addressing, routing, and default gateways", feedback: "Correct! Layer 3 manages IP network.", isCorrect: true },
      { text: "VLAN creation and trunk settings", feedback: "That's Layer 2 configuration.", isCorrect: false },
      { text: "Port physical settings", feedback: "That's Layer 1 configuration.", isCorrect: false },
      { text: "Firewall rules only", feedback: "Routing is broader than firewalls.", isCorrect: false }
    ],
    explanation: "Layer 3 configuration in Fabric Engine manages IP network infrastructure and routing policies.",
    resources: {
      videoTopic: "Layer 3 Configuration",
      youtubeLinks: [
        { title: "Network Layer (Layer 3)", url: "https://www.youtube.com/results?search_query=osi+layer+3+network+layer" }
      ]
    }
  },
  {
    id: 17,
    topic: "IP Addressing",
    section: "Layer 3 Config",
    question: "How does Fabric Engine manage IP address assignment?",
    options: [
      { text: "IPAM (IP Address Management) with DHCP integration", feedback: "Correct! Fabric includes comprehensive IPAM.", isCorrect: true },
      { text: "Manual IP assignment on every device", feedback: "Fabric automates IP management.", isCorrect: false },
      { text: "Only static IP addresses", feedback: "Fabric supports both static and dynamic.", isCorrect: false },
      { text: "No IP address control", feedback: "IP management is a core Fabric function.", isCorrect: false }
    ],
    explanation: "Fabric Engine includes IPAM capabilities for centralized IP address management and DHCP services.",
    resources: {
      videoTopic: "IP Address Management",
      youtubeLinks: [
        { title: "IPAM Best Practices", url: "https://www.youtube.com/results?search_query=ip+address+management+ipam" }
      ]
    }
  },
  {
    id: 18,
    topic: "Routing Policies",
    section: "Layer 3 Config",
    question: "What can Fabric Engine routing policies define?",
    options: [
      { text: "Traffic paths, next-hop selection, and routing protocols", feedback: "Correct! Policies define routing behavior.", isCorrect: true },
      { text: "Only the destination IP addresses", feedback: "Routing is broader than destinations.", isCorrect: false },
      { text: "Firewall block/allow rules", feedback: "Routing is distinct from security.", isCorrect: false },
      { text: "Physical cable connections", feedback: "Routing is logical, not physical.", isCorrect: false }
    ],
    explanation: "Fabric Engine routing policies define how traffic is routed through the network infrastructure.",
    resources: {
      videoTopic: "Routing Policies",
      youtubeLinks: [
        { title: "Routing Policy Management", url: "https://www.youtube.com/results?search_query=routing+policies+bgp+ospf" }
      ]
    }
  },
  {
    id: 19,
    topic: "Gateway Configuration",
    section: "Layer 3 Config",
    question: "How does Fabric Engine manage gateway settings?",
    options: [
      { text: "Defining default gateways and gateway redundancy", feedback: "Correct! Gateways are critical for routing.", isCorrect: true },
      { text: "Creating gates between network segments", feedback: "Gateways are logical, not physical.", isCorrect: false },
      { text: "Blocking external network access", feedback: "Gateways enable access, not block it.", isCorrect: false },
      { text: "Only supporting a single gateway per subnet", feedback: "Redundancy is supported and managed.", isCorrect: false }
    ],
    explanation: "Fabric Engine manages default gateway configuration and redundancy for network availability.",
    resources: {
      videoTopic: "Gateway Management",
      youtubeLinks: [
        { title: "Default Gateway Configuration", url: "https://www.youtube.com/results?search_query=default+gateway+configuration" }
      ]
    }
  },
  {
    id: 20,
    topic: "Subnet Management",
    section: "Layer 3 Config",
    question: "What does Fabric Engine offer for subnet management?",
    options: [
      { text: "Subnet creation, sizing, and optimization", feedback: "Correct! Fabric manages subnet lifecycle.", isCorrect: true },
      { text: "Only manual subnet creation", feedback: "Fabric automates subnet management.", isCorrect: false },
      { text: "Preventing subnet changes", feedback: "Fabric enables flexible subnet management.", isCorrect: false },
      { text: "No subnet-level controls", feedback: "Subnets are a fundamental management level.", isCorrect: false }
    ],
    explanation: "Fabric Engine provides tools for efficient subnet creation, allocation, and optimization.",
    resources: {
      videoTopic: "Subnet Management",
      youtubeLinks: [
        { title: "Subnetting and IP Planning", url: "https://www.youtube.com/results?search_query=subnet+planning+ipv4+ipv6" }
      ]
    }
  }
];
