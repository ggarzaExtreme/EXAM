// Switch Engine In-Class Quiz Data
// Questions organized by presentation section

const quizData = [
  // ===== INTRO SECTION =====
  {
    id: 1,
    topic: "Switch Engine Overview",
    section: "Intro",
    question: "What is Switch Engine?",
    options: [
      { text: "A hardware component that routes packets", feedback: "Switch Engine is more than just hardware.", isCorrect: false },
      { text: "A software platform for switch management", feedback: "Correct! Switch Engine is management software.", isCorrect: true },
      { text: "A replacement for all network switches", feedback: "It works with existing switches.", isCorrect: false },
      { text: "A firewall system", feedback: "Switch Engine has broader purposes.", isCorrect: false }
    ],
    explanation: "Switch Engine is a software platform that provides management and automation capabilities for network switches.",
    resources: {
      videoTopic: "Switch Engine Introduction",
      youtubeLinks: [
        { title: "Switch Engine Overview", url: "https://www.youtube.com/results?search_query=switch+engine+management" }
      ]
    }
  },
  {
    id: 2,
    topic: "Switch Types",
    section: "Intro",
    question: "Which types of switches does Switch Engine support?",
    options: [
      { text: "Layer 2 and Layer 3 switches", feedback: "Correct! Both types are supported.", isCorrect: true },
      { text: "Only Layer 2 switches", feedback: "Modern networks use both types.", isCorrect: false },
      { text: "Only Layer 3 routers", feedback: "Layer 2 switches are fundamental.", isCorrect: false },
      { text: "Only wireless access points", feedback: "Switch Engine focuses on wired infrastructure.", isCorrect: false }
    ],
    explanation: "Switch Engine manages both Layer 2 and Layer 3 switches for comprehensive network control.",
    resources: {
      videoTopic: "Switch Types",
      youtubeLinks: [
        { title: "Layer 2 vs Layer 3 Switches", url: "https://www.youtube.com/results?search_query=layer+2+layer+3+switch+difference" }
      ]
    }
  },
  {
    id: 3,
    topic: "Key Features",
    section: "Intro",
    question: "What is a primary feature of Switch Engine?",
    options: [
      { text: "Centralized configuration management", feedback: "Correct! Centralized management is key.", isCorrect: true },
      { text: "Requiring manual config on each switch", feedback: "Switch Engine automates this.", isCorrect: false },
      { text: "Limiting network size to 10 switches", feedback: "Switch Engine scales much further.", isCorrect: false },
      { text: "Eliminating redundancy in networks", feedback: "It maintains and manages redundancy.", isCorrect: false }
    ],
    explanation: "Switch Engine provides centralized management for consistent configuration and policy enforcement.",
    resources: {
      videoTopic: "Switch Engine Features",
      youtubeLinks: [
        { title: "Network Management Features", url: "https://www.youtube.com/results?search_query=network+management+software+features" }
      ]
    }
  },
  {
    id: 4,
    topic: "Deployment Models",
    section: "Intro",
    question: "How can Switch Engine be deployed?",
    options: [
      { text: "Cloud, on-premises, or hybrid", feedback: "Correct! Multiple deployment options available.", isCorrect: true },
      { text: "Only on-premises", feedback: "Cloud and hybrid options are available.", isCorrect: false },
      { text: "Only in the cloud", feedback: "On-premises deployment is also supported.", isCorrect: false },
      { text: "Directly on each switch", feedback: "Centralized deployment is the model.", isCorrect: false }
    ],
    explanation: "Switch Engine supports flexible deployment models to match different organizational needs.",
    resources: {
      videoTopic: "Deployment Options",
      youtubeLinks: [
        { title: "Cloud vs On-Premises", url: "https://www.youtube.com/results?search_query=cloud+on+premises+deployment" }
      ]
    }
  },
  {
    id: 5,
    topic: "Benefits",
    section: "Intro",
    question: "What benefit does Switch Engine provide?",
    options: [
      { text: "Reduces operational complexity", feedback: "Correct! Simplified management is a key benefit.", isCorrect: true },
      { text: "Requires complete network redesign", feedback: "Gradual implementation is possible.", isCorrect: false },
      { text: "Eliminates the need for networking knowledge", feedback: "Expertise is still valuable.", isCorrect: false },
      { text: "Works only with wireless networks", feedback: "It focuses on wired switching.", isCorrect: false }
    ],
    explanation: "Switch Engine reduces operational complexity through centralized, automated management.",
    resources: {
      videoTopic: "Management Benefits",
      youtubeLinks: [
        { title: "Operational Efficiency", url: "https://www.youtube.com/results?search_query=network+operational+efficiency" }
      ]
    }
  },

  // ===== PORT CONFIG SECTION =====
  {
    id: 6,
    topic: "Port Configuration",
    section: "Port Config",
    question: "What can be configured for a switch port in Switch Engine?",
    options: [
      { text: "Speed, duplex, VLAN, and port type", feedback: "Correct! Multiple port attributes are configurable.", isCorrect: true },
      { text: "Only the port speed", feedback: "Port config is more comprehensive.", isCorrect: false },
      { text: "Only the physical cable type", feedback: "Logical config is also important.", isCorrect: false },
      { text: "Nothingâ€”port settings are fixed", feedback: "Ports have many configurable options.", isCorrect: false }
    ],
    explanation: "Switch Engine allows comprehensive port configuration including speed, duplex, VLAN assignment, and port type.",
    resources: {
      videoTopic: "Port Settings",
      youtubeLinks: [
        { title: "Port Configuration Best Practices", url: "https://www.youtube.com/results?search_query=ethernet+port+configuration" }
      ]
    }
  },
  {
    id: 7,
    topic: "Port Types",
    section: "Port Config",
    question: "What are the common port types in Switch Engine?",
    options: [
      { text: "Access, trunk, and uplink ports", feedback: "Correct! These are the common types.", isCorrect: true },
      { text: "Only access ports", feedback: "Different port types serve different purposes.", isCorrect: false },
      { text: "Only trunk ports", feedback: "Access ports are needed for end devices.", isCorrect: false },
      { text: "Ports don't have types", feedback: "Port types define their behavior.", isCorrect: false }
    ],
    explanation: "Switch ports can be configured as access ports (for devices), trunk ports (for other switches), or uplink ports.",
    resources: {
      videoTopic: "Port Types",
      youtubeLinks: [
        { title: "Access Ports vs Trunk Ports", url: "https://www.youtube.com/results?search_query=access+port+trunk+port+difference" }
      ]
    }
  },
  {
    id: 8,
    topic: "Speed and Duplex",
    section: "Port Config",
    question: "What does duplex mode control?",
    options: [
      { text: "Simultaneous two-way communication capability", feedback: "Correct! Duplex controls bidirectional data flow.", isCorrect: true },
      { text: "The speed of data transmission", feedback: "Speed and duplex are separate settings.", isCorrect: false },
      { text: "How many devices can connect to the port", feedback: "Duplex is about direction, not device count.", isCorrect: false },
      { text: "Port security settings", feedback: "Duplex is a communication mode.", isCorrect: false }
    ],
    explanation: "Duplex mode determines if a port can transmit and receive data simultaneously (full-duplex) or not (half-duplex).",
    resources: {
      videoTopic: "Duplex Modes",
      youtubeLinks: [
        { title: "Full Duplex vs Half Duplex", url: "https://www.youtube.com/results?search_query=full+duplex+half+duplex" }
      ]
    }
  },
  {
    id: 9,
    topic: "Port Security",
    section: "Port Config",
    question: "What is port security in Switch Engine?",
    options: [
      { text: "Controlling which MAC addresses can connect to a port", feedback: "Correct! MAC filtering is port security.", isCorrect: true },
      { text: "Using a password on each switch port", feedback: "Port security uses MAC addresses, not passwords.", isCorrect: false },
      { text: "Encrypting data on the port", feedback: "Port security is about access control.", isCorrect: false },
      { text: "Physically securing the port with a lock", feedback: "Port security is a logical control.", isCorrect: false }
    ],
    explanation: "Port security restricts which devices (based on MAC address) can connect to a specific switch port.",
    resources: {
      videoTopic: "Port Security",
      youtubeLinks: [
        { title: "Port Security Implementation", url: "https://www.youtube.com/results?search_query=switch+port+security+mac+address+filtering" }
      ]
    }
  },
  {
    id: 10,
    topic: "PoE Configuration",
    section: "Port Config",
    question: "What does PoE (Power over Ethernet) do?",
    options: [
      { text: "Delivers power to devices through the same cable as data", feedback: "Correct! PoE combines power and data.", isCorrect: true },
      { text: "Increases the data speed of a port", feedback: "PoE is about power, not speed.", isCorrect: false },
      { text: "Encrypts all traffic on the port", feedback: "PoE is power delivery, not encryption.", isCorrect: false },
      { text: "Prevents unauthorized access to the port", feedback: "That's port security, not PoE.", isCorrect: false }
    ],
    explanation: "Power over Ethernet (PoE) allows a switch port to provide electrical power to connected devices like IP phones and cameras.",
    resources: {
      videoTopic: "Power over Ethernet",
      youtubeLinks: [
        { title: "PoE Standards and Implementation", url: "https://www.youtube.com/results?search_query=power+over+ethernet+poe+standard" }
      ]
    }
  },

  // ===== VLAN CONFIG SECTION =====
  {
    id: 11,
    topic: "VLAN Configuration",
    section: "VLAN Config",
    question: "What is a VLAN?",
    options: [
      { text: "A logical grouping of devices in the same broadcast domain", feedback: "Correct! VLANs create logical networks.", isCorrect: true },
      { text: "A physical separation of network cables", feedback: "VLANs are logical, not physical.", isCorrect: false },
      { text: "A security group that prevents all communication", feedback: "VLANs isolate but allow some communication.", isCorrect: false },
      { text: "A backup network that activates on failure", feedback: "VLANs are primary networks, not backups.", isCorrect: false }
    ],
    explanation: "A VLAN (Virtual LAN) is a logical network created within a physical switch infrastructure.",
    resources: {
      videoTopic: "VLAN Concepts",
      youtubeLinks: [
        { title: "VLAN Fundamentals", url: "https://www.youtube.com/results?search_query=vlan+virtual+lan+concepts" }
      ]
    }
  },
  {
    id: 12,
    topic: "VLAN Tagging",
    section: "VLAN Config",
    question: "What is VLAN tagging (802.1Q)?",
    options: [
      { text: "Adding VLAN information to Ethernet frames", feedback: "Correct! Tags identify VLAN membership.", isCorrect: true },
      { text: "Labeling cables with VLAN numbers", feedback: "Tagging is in data frames, not physical.", isCorrect: false },
      { text: "Preventing unauthorized VLANs", feedback: "Tagging identifies VLANs, doesn't block them.", isCorrect: false },
      { text: "Encrypting VLAN traffic", feedback: "Tagging is identification, not encryption.", isCorrect: false }
    ],
    explanation: "802.1Q tagging embeds VLAN identification information in Ethernet frames to distinguish between VLANs.",
    resources: {
      videoTopic: "VLAN Tagging",
      youtubeLinks: [
        { title: "802.1Q VLAN Tagging", url: "https://www.youtube.com/results?search_query=802.1q+vlan+tagging+frame+format" }
      ]
    }
  },
  {
    id: 13,
    topic: "Trunk Ports",
    section: "VLAN Config",
    question: "What is a trunk port?",
    options: [
      { text: "A port that carries multiple VLANs", feedback: "Correct! Trunks carry multiple VLAN traffic.", isCorrect: true },
      { text: "A port that blocks all VLAN traffic", feedback: "Trunk ports enable VLAN traffic.", isCorrect: false },
      { text: "A backup connection between switches", feedback: "Trunks are primary inter-switch links.", isCorrect: false },
      { text: "A port connected to the main network switch", feedback: "Trunks are primarily between switches.", isCorrect: false }
    ],
    explanation: "A trunk port is a switch-to-switch connection that carries traffic for multiple VLANs simultaneously.",
    resources: {
      videoTopic: "Trunk Ports",
      youtubeLinks: [
        { title: "Configuring Trunk Ports", url: "https://www.youtube.com/results?search_query=switch+trunk+port+configuration" }
      ]
    }
  },
  {
    id: 14,
    topic: "Access Ports",
    section: "VLAN Config",
    question: "What is an access port?",
    options: [
      { text: "A port configured to belong to a single VLAN", feedback: "Correct! Access ports are VLAN-specific.", isCorrect: true },
      { text: "A port that connects to the internet", feedback: "Access ports are for end devices.", isCorrect: false },
      { text: "A port that bypasses VLAN restrictions", feedback: "Access ports enforce VLAN membership.", isCorrect: false },
      { text: "A port for administrative access only", feedback: "Access ports are for regular devices.", isCorrect: false }
    ],
    explanation: "An access port is a switch port configured to belong to a single VLAN and connects to end devices.",
    resources: {
      videoTopic: "Access Ports",
      youtubeLinks: [
        { title: "Access Port Configuration", url: "https://www.youtube.com/results?search_query=ethernet+switch+access+port+vlan" }
      ]
    }
  },
  {
    id: 15,
    topic: "VLAN Routing",
    section: "VLAN Config",
    question: "How do devices in different VLANs communicate?",
    options: [
      { text: "Through a router or Layer 3 switch", feedback: "Correct! Routing enables inter-VLAN communication.", isCorrect: true },
      { text: "Directly through the switch", feedback: "Switch-only connections are within a VLAN.", isCorrect: false },
      { text: "They cannot communicate", feedback: "Routing enables communication between VLANs.", isCorrect: false },
      { text: "By reconfiguring both devices to the same VLAN", feedback: "Routing allows communication without changes.", isCorrect: false }
    ],
    explanation: "Devices in different VLANs communicate through a router or Layer 3 switch that forwards between VLANs.",
    resources: {
      videoTopic: "Inter-VLAN Routing",
      youtubeLinks: [
        { title: "Inter-VLAN Routing Explained", url: "https://www.youtube.com/results?search_query=inter+vlan+routing+layer+3+switch" }
      ]
    }
  },

  // ===== ROUTING CONFIG SECTION =====
  {
    id: 16,
    topic: "Routing Configuration",
    section: "Routing Config",
    question: "What is a routing table?",
    options: [
      { text: "A list of network destinations and how to reach them", feedback: "Correct! Routing tables guide packet forwarding.", isCorrect: true },
      { text: "A physical table holding network cables", feedback: "Routing tables are logical structures.", isCorrect: false },
      { text: "A database of authorized users", feedback: "Routing tables are about destinations.", isCorrect: false },
      { text: "A schedule for network maintenance", feedback: "Routing tables are for data flow.", isCorrect: false }
    ],
    explanation: "A routing table is a list of routes to various network destinations, used to determine where to forward packets.",
    resources: {
      videoTopic: "Routing Tables",
      youtubeLinks: [
        { title: "Understanding Routing Tables", url: "https://www.youtube.com/results?search_query=routing+table+explanation+network+destinations" }
      ]
    }
  },
  {
    id: 17,
    topic: "Static Routes",
    section: "Routing Config",
    question: "What is a static route?",
    options: [
      { text: "A manually configured path to a destination network", feedback: "Correct! Static routes are manually configured.", isCorrect: true },
      { text: "A route that changes automatically", feedback: "That's a dynamic route.", isCorrect: false },
      { text: "A route that never moves data", feedback: "Static routes are actively used.", isCorrect: false },
      { text: "A backup route for emergencies only", feedback: "Static routes are primary routes.", isCorrect: false }
    ],
    explanation: "A static route is a manually configured route that doesn't change unless an administrator changes it.",
    resources: {
      videoTopic: "Static Routing",
      youtubeLinks: [
        { title: "Static Route Configuration", url: "https://www.youtube.com/results?search_query=static+routing+configuration" }
      ]
    }
  },
  {
    id: 18,
    topic: "Dynamic Routes",
    section: "Routing Config",
    question: "What is a dynamic routing protocol?",
    options: [
      { text: "A protocol that automatically discovers and updates routes", feedback: "Correct! Dynamic protocols adapt automatically.", isCorrect: true },
      { text: "A protocol that only works during network changes", feedback: "Dynamic protocols run continuously.", isCorrect: false },
      { text: "A manual process for updating routes", feedback: "Dynamic means automatic.", isCorrect: false },
      { text: "A security protocol for route encryption", feedback: "Dynamic routing is about discovery, not security.", isCorrect: false }
    ],
    explanation: "Dynamic routing protocols automatically discover the best routes and adapt to network changes.",
    resources: {
      videoTopic: "Dynamic Routing",
      youtubeLinks: [
        { title: "Dynamic Routing Protocols (OSPF, BGP)", url: "https://www.youtube.com/results?search_query=ospf+bgp+dynamic+routing+protocols" }
      ]
    }
  },
  {
    id: 19,
    topic: "Default Gateway",
    section: "Routing Config",
    question: "What is a default gateway?",
    options: [
      { text: "The router that handles packets to unknown destinations", feedback: "Correct! Default gateway is the first hop.", isCorrect: true },
      { text: "The main entry point to the internet", feedback: "That's one role, but it's broader.", isCorrect: false },
      { text: "A security device that blocks traffic", feedback: "Gateways forward traffic, not block.", isCorrect: false },
      { text: "A spare router for backup", feedback: "Default gateway is the primary route.", isCorrect: false }
    ],
    explanation: "The default gateway is the router that a device uses to send packets to destinations outside its local network.",
    resources: {
      videoTopic: "Default Gateway",
      youtubeLinks: [
        { title: "Default Gateway Configuration", url: "https://www.youtube.com/results?search_query=default+gateway+networking+how+it+works" }
      ]
    }
  },
  {
    id: 20,
    topic: "Routing Protocols",
    section: "Routing Config",
    question: "Which are common routing protocols?",
    options: [
      { text: "OSPF and BGP", feedback: "Correct! Both are widely used protocols.", isCorrect: true },
      { text: "Only OSPF", feedback: "BGP is also very common.", isCorrect: false },
      { text: "Only BGP", feedback: "OSPF is also widely deployed.", isCorrect: false },
      { text: "DNS and HTTP", feedback: "Those are application layer, not routing.", isCorrect: false }
    ],
    explanation: "OSPF (Open Shortest Path First) and BGP (Border Gateway Protocol) are the most common modern routing protocols.",
    resources: {
      videoTopic: "Routing Protocols",
      youtubeLinks: [
        { title: "OSPF vs BGP Comparison", url: "https://www.youtube.com/results?search_query=ospf+bgp+routing+protocol+comparison" }
      ]
    }
  }
];



// Export for use in HTML and Node.js
if (typeof window !== 'undefined') {
  window.quizData = quizData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizData;
}
