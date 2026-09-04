// Partner Readiness Program - Pilot Assessment v1
// Schema v2 native question set
const quizDataV2 = [
  {
    "id": 1,
    "question": "Which device is primarily responsible for directing Ethernet frames within a local network by using destination MAC addresses?",
    "answers": [
      {
        "text": "Router",
        "id": "a"
      },
      {
        "text": "Layer 2 switch",
        "id": "b"
      },
      {
        "text": "Firewall",
        "id": "c"
      },
      {
        "text": "Wireless access point",
        "id": "d"
      }
    ],
    "correctAnswer": "b",
    "objective": "Distinguish the primary roles of common network devices",
    "primaryType": "Concept",
    "domain": "Network Foundations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A Layer 2 switch learns MAC-to-port mappings and uses the destination MAC address to direct Ethernet frames within a local network.",
    "answerFeedback": {
      "a": {
        "wrong": "A router primarily moves packets between IP networks. Some routers also contain switching functions, but routing is their defining role.",
        "misconception": "Treating routing and Layer 2 switching as the same function"
      },
      "b": {
        "correct": "Correct! A Layer 2 switch primarily uses destination MAC addresses to direct frames toward the appropriate port.",
        "misconception": ""
      },
      "c": {
        "wrong": "A firewall primarily permits or denies traffic according to security policy, although many firewalls can also route.",
        "misconception": "Confusing security enforcement with Layer 2 switching"
      },
      "d": {
        "wrong": "An access point primarily provides wireless access and bridges wireless clients into the network; it is not the primary LAN forwarding device described.",
        "misconception": "Confusing wireless access with general Layer 2 switching"
      }
    },
    "remediation": {
      "objective": "Understand common network device roles",
      "summary": "Review the primary roles of hosts, switches, routers, firewalls, and wireless access points.",
      "tags": [
        "device-roles",
        "switching-vs-routing"
      ],
      "aiCoachingPrompt": "Teach the primary roles of a host, Layer 2 switch, router, firewall, and wireless access point. Emphasize that devices may combine functions, then quiz me using practical traffic-flow examples."
    },
    "relatedObjectives": [
      "Compare switching and routing"
    ],
    "authorPurpose": "Confirm that the learner can identify a switch without implying that multifunction devices perform only one role.",
    "secondaryTypes": [
      "Purpose"
    ],
    "distractorReason": {
      "a": "Common Layer 2 versus Layer 3 confusion",
      "c": "Security appliance versus forwarding-function confusion",
      "d": "Wireless edge versus switching-function confusion"
    }
  },
  {
    "id": 2,
    "question": "A cable is connected and the link light is on, but the workstation cannot reach its default gateway. What does the link light prove?",
    "answers": [
      {
        "text": "Only that basic physical connectivity is present",
        "id": "a"
      },
      {
        "text": "That VLAN membership is correct",
        "id": "b"
      },
      {
        "text": "That IP routing is working",
        "id": "c"
      },
      {
        "text": "That the application server is reachable",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Use layered networking concepts during basic troubleshooting",
    "primaryType": "Troubleshooting",
    "domain": "Network Foundations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "A link light is evidence of basic Physical-layer connectivity. It does not verify VLAN configuration, IP addressing, routing, or application reachability.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! A link light confirms basic physical connectivity, but higher-layer functions still need validation.",
        "misconception": ""
      },
      "b": {
        "wrong": "A link can be physically active while the port is assigned to the wrong VLAN.",
        "misconception": "Assuming Layer 1 success proves Layer 2 configuration"
      },
      "c": {
        "wrong": "A physical link does not prove that IP addressing, gateway configuration, or routing is correct.",
        "misconception": "Assuming Layer 1 success proves Layer 3 reachability"
      },
      "d": {
        "wrong": "Application reachability depends on multiple higher-layer functions beyond the physical link.",
        "misconception": "Assuming one successful layer proves end-to-end service"
      }
    },
    "remediation": {
      "objective": "Understand OSI fundamentals",
      "summary": "Validate network functions layer by layer instead of assuming physical connectivity proves end-to-end communication.",
      "tags": [
        "osi-fundamentals",
        "layered-troubleshooting"
      ],
      "aiCoachingPrompt": "Teach me how to troubleshoot from Physical through Data Link and Network layers. Give me symptoms and require me to state exactly what each observation proves and does not prove."
    },
    "relatedObjectives": [
      "Distinguish Layer 1, Layer 2, and Layer 3"
    ],
    "authorPurpose": "Test whether the learner understands that successful physical connectivity does not guarantee network reachability.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Layer 1 versus VLAN configuration confusion",
      "c": "Layer 1 versus routing confusion",
      "d": "Physical connectivity versus application reachability confusion"
    }
  },
  {
    "id": 3,
    "question": "What best describes encapsulation when a host sends data onto a network?",
    "answers": [
      {
        "text": "Each layer adds information needed for its part of communication",
        "id": "a"
      },
      {
        "text": "The switch converts every packet into a routing protocol update",
        "id": "b"
      },
      {
        "text": "The host removes all addressing before transmission",
        "id": "c"
      },
      {
        "text": "The firewall assigns a new MAC address to every frame",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain encapsulation as part of layered communication",
    "primaryType": "Behavior",
    "domain": "Network Foundations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "During encapsulation, networking layers add headers or other control information so data can be delivered and processed across the network.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Encapsulation adds layer-specific information used for delivery and processing.",
        "misconception": ""
      },
      "b": {
        "wrong": "Ordinary user traffic is not converted into routing protocol updates.",
        "misconception": "Confusing data traffic with routing control traffic"
      },
      "c": {
        "wrong": "Addressing and control information are added before transmission, not removed.",
        "misconception": "Reversing encapsulation and decapsulation"
      },
      "d": {
        "wrong": "Firewalls do not normally assign a new MAC address to every frame as the definition of encapsulation.",
        "misconception": "Confusing security processing with encapsulation"
      }
    },
    "remediation": {
      "objective": "Understand communication fundamentals",
      "summary": "Review how data becomes a segment, packet, and frame as information moves down a networking stack.",
      "tags": [
        "encapsulation",
        "frames-and-packets"
      ],
      "aiCoachingPrompt": "Teach encapsulation and decapsulation using one web-request example. Ask me to identify what information is added or removed at each major layer."
    },
    "relatedObjectives": [
      "Recognize frames and packets"
    ],
    "authorPurpose": "Check that the learner has a useful layered mental model before studying switching and routing.",
    "secondaryTypes": [
      "Concept"
    ],
    "distractorReason": {
      "b": "Control-plane versus data-plane confusion",
      "c": "Encapsulation direction reversed",
      "d": "Security function confused with layering"
    }
  },
  {
    "id": 4,
    "question": "A workstation determines that a destination is outside its local IP network. What is the workstation's next traffic-flow decision?",
    "answers": [
      {
        "text": "Send the traffic toward its default gateway",
        "id": "a"
      },
      {
        "text": "Send the frame directly to the remote server's MAC address",
        "id": "b"
      },
      {
        "text": "Ask LLDP to create a route",
        "id": "c"
      },
      {
        "text": "Wait for STP to assign an IP address",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize the basic path used to reach a remote network",
    "primaryType": "Scenario",
    "domain": "Network Foundations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "When the destination is remote, the workstation sends the traffic toward its configured default gateway. At Layer 2, it uses the gateway's MAC address for the local hop.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! A remote destination is reached through the local default gateway.",
        "misconception": ""
      },
      "b": {
        "wrong": "The remote server's MAC address is not used across routed network boundaries. MAC addressing is local to each Layer 2 segment.",
        "misconception": "Assuming an end-to-end destination MAC remains unchanged across routers"
      },
      "c": {
        "wrong": "LLDP discovers directly connected neighbors; it does not create routes for workstation traffic.",
        "misconception": "Confusing neighbor discovery with routing"
      },
      "d": {
        "wrong": "STP prevents Layer 2 loops and does not assign IP addresses.",
        "misconception": "Confusing loop prevention with addressing"
      }
    },
    "remediation": {
      "objective": "Understand traffic-flow foundations",
      "summary": "Review how a host distinguishes local and remote destinations and uses a default gateway.",
      "tags": [
        "traffic-flow",
        "default-gateway",
        "local-vs-remote"
      ],
      "aiCoachingPrompt": "Teach me the first decisions a host makes when sending to local and remote destinations. Quiz me on the Layer 2 destination used for each first hop."
    },
    "relatedObjectives": [
      "Understand default gateway concepts",
      "Distinguish Layer 2 and Layer 3"
    ],
    "authorPurpose": "Establish the life-of-a-packet foundation used throughout the readiness program.",
    "secondaryTypes": [
      "Behavior"
    ],
    "distractorReason": {
      "b": "Remote IP versus local-hop MAC confusion",
      "c": "Discovery versus routing confusion",
      "d": "STP versus DHCP/addressing confusion"
    }
  },
  {
    "id": 5,
    "question": "How does a switch normally learn where a device is located?",
    "answers": [
      {
        "text": "It observes the source MAC address of an incoming frame",
        "id": "a"
      },
      {
        "text": "It reads the destination IP address from DNS",
        "id": "b"
      },
      {
        "text": "It asks the default gateway for the switch port",
        "id": "c"
      },
      {
        "text": "It learns the location from the subnet mask",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain source MAC learning",
    "primaryType": "Behavior",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A switch learns a source MAC address on the port where a frame enters and records that mapping in its MAC address table.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Source MAC learning associates the sender's MAC address with the ingress switch port.",
        "misconception": ""
      },
      "b": {
        "wrong": "DNS resolves names to IP addresses; it does not tell a switch which port owns a MAC address.",
        "misconception": "Confusing name resolution with MAC learning"
      },
      "c": {
        "wrong": "The switch learns locally from received frames rather than asking the gateway for a port mapping.",
        "misconception": "Assuming the router controls the switch MAC table"
      },
      "d": {
        "wrong": "A subnet mask identifies IP network boundaries and does not identify a physical switch port.",
        "misconception": "Confusing Layer 3 addressing with Layer 2 learning"
      }
    },
    "remediation": {
      "objective": "Understand MAC learning",
      "summary": "Review source MAC learning and the relationship between MAC addresses and switch ports.",
      "tags": [
        "mac-learning",
        "mac-table"
      ],
      "aiCoachingPrompt": "Teach source MAC learning with a three-port switch example. After each frame, ask me what new MAC-to-port entry the switch learns."
    },
    "relatedObjectives": [
      "Understand MAC address tables"
    ],
    "authorPurpose": "Validate the core learning behavior required to reason about Ethernet switching.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "DNS confusion",
      "c": "Gateway control misconception",
      "d": "Subnet-mask confusion"
    }
  },
  {
    "id": 6,
    "question": "A switch receives a unicast frame whose destination MAC address is already associated with port 7. What should the switch normally do?",
    "answers": [
      {
        "text": "Send the frame only out port 7",
        "id": "a"
      },
      {
        "text": "Flood the frame out all other ports in the VLAN",
        "id": "b"
      },
      {
        "text": "Send the frame to the default gateway regardless of destination",
        "id": "c"
      },
      {
        "text": "Discard the frame because the address is already known",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Predict known-unicast switching behavior",
    "primaryType": "Behavior",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "For known unicast traffic, the switch uses its MAC address table and sends the frame only toward the learned destination port.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Known unicast is directed toward the port associated with the destination MAC.",
        "misconception": ""
      },
      "b": {
        "wrong": "Flooding is used for broadcast, relevant multicast behavior, or an unknown unicast destination, not a known unicast destination.",
        "misconception": "Assuming all Ethernet frames are flooded"
      },
      "c": {
        "wrong": "A gateway is used for remote IP networks, not automatically for same-VLAN known-unicast delivery.",
        "misconception": "Assuming all traffic passes through a router"
      },
      "d": {
        "wrong": "Knowing the destination is what allows efficient delivery; it is not a reason to discard the frame.",
        "misconception": "Reversing the purpose of the MAC table"
      }
    },
    "remediation": {
      "objective": "Understand known-unicast forwarding",
      "summary": "Review destination MAC lookup and directed frame delivery within a VLAN.",
      "tags": [
        "known-unicast",
        "switching-behavior"
      ],
      "aiCoachingPrompt": "Give me MAC-table scenarios and ask which single port receives each known-unicast frame. Correct any confusion between switching and routing."
    },
    "relatedObjectives": [
      "Understand switch MAC tables"
    ],
    "authorPurpose": "Test precise prediction of known-unicast behavior.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Known versus unknown unicast confusion",
      "c": "Switching versus routing confusion",
      "d": "MAC-table purpose reversed"
    }
  },
  {
    "id": 7,
    "question": "A switch receives a frame for a unicast destination MAC address that is not in its MAC address table. What should occur within that VLAN?",
    "answers": [
      {
        "text": "The frame is flooded out eligible ports except the receiving port",
        "id": "a"
      },
      {
        "text": "The frame is sent only to the default gateway",
        "id": "b"
      },
      {
        "text": "The frame is converted into an LLDP advertisement",
        "id": "c"
      },
      {
        "text": "The switch disables the receiving port",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Predict unknown-unicast flooding behavior",
    "primaryType": "Behavior",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "An unknown unicast frame is flooded within its VLAN so the destination can receive it even though the switch has not learned its location.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Unknown unicast is flooded within the VLAN, excluding the ingress port and any ports not eligible to carry that VLAN.",
        "misconception": ""
      },
      "b": {
        "wrong": "A switch does not automatically send unknown unicast to a gateway; the Layer 2 destination may still be local.",
        "misconception": "Treating unknown MAC location as a routing requirement"
      },
      "c": {
        "wrong": "LLDP is a separate neighbor-discovery protocol and does not transport unknown-unicast user traffic.",
        "misconception": "Confusing data traffic with discovery traffic"
      },
      "d": {
        "wrong": "An unknown destination is normal and does not by itself justify disabling the port.",
        "misconception": "Treating normal flooding as a security fault"
      }
    },
    "remediation": {
      "objective": "Understand flooding behavior",
      "summary": "Review unknown-unicast flooding and the boundary created by a VLAN.",
      "tags": [
        "unknown-unicast",
        "flooding",
        "vlan-boundary"
      ],
      "aiCoachingPrompt": "Teach unknown-unicast flooding with a switch diagram described in text. Ask exactly which ports receive the frame and why."
    },
    "relatedObjectives": [
      "Understand VLAN broadcast domains"
    ],
    "authorPurpose": "Verify that the learner can predict unknown-unicast behavior without confusing it with routing.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Unknown unicast versus gateway confusion",
      "c": "Data-plane versus LLDP confusion",
      "d": "Normal behavior mistaken for fault"
    }
  },
  {
    "id": 8,
    "question": "Which statement best describes how a Layer 2 broadcast is normally handled by a switch?",
    "answers": [
      {
        "text": "It is flooded to eligible ports in the same VLAN except the ingress port",
        "id": "a"
      },
      {
        "text": "It is routed to every IP network",
        "id": "b"
      },
      {
        "text": "It is delivered only to the port with the lowest number",
        "id": "c"
      },
      {
        "text": "It is always discarded to prevent loops",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain broadcast handling within a VLAN",
    "primaryType": "Behavior",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A Layer 2 broadcast is flooded within its VLAN. A router does not normally forward that Layer 2 broadcast into other IP networks.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Broadcasts are flooded within the VLAN's Layer 2 boundary.",
        "misconception": ""
      },
      "b": {
        "wrong": "Routers normally separate broadcast domains rather than forwarding Layer 2 broadcasts everywhere.",
        "misconception": "Assuming broadcasts cross routed boundaries by default"
      },
      "c": {
        "wrong": "Port numbering does not determine broadcast delivery.",
        "misconception": "Inventing a port-selection rule"
      },
      "d": {
        "wrong": "Broadcasts are a normal part of Ethernet; loops require prevention, but legitimate broadcasts are not always discarded.",
        "misconception": "Equating all broadcasts with broadcast storms"
      }
    },
    "remediation": {
      "objective": "Understand broadcast flooding",
      "summary": "Review broadcasts, flooding, and VLAN broadcast boundaries.",
      "tags": [
        "broadcast",
        "flooding",
        "broadcast-domain"
      ],
      "aiCoachingPrompt": "Teach broadcasts and broadcast domains. Contrast one legitimate broadcast with a broadcast storm, then quiz me on where each frame travels."
    },
    "relatedObjectives": [
      "Understand loop prevention concepts"
    ],
    "authorPurpose": "Distinguish normal broadcast behavior from routing and loop-related failure behavior.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Routed-boundary confusion",
      "c": "Arbitrary port-selection misconception",
      "d": "Broadcast versus storm confusion"
    }
  },
  {
    "id": 9,
    "question": "What is the main purpose of creating multiple VLANs on a switch?",
    "answers": [
      {
        "text": "Create separate Layer 2 broadcast domains",
        "id": "a"
      },
      {
        "text": "Increase the physical speed of every port",
        "id": "b"
      },
      {
        "text": "Replace IP addressing with VLAN numbers",
        "id": "c"
      },
      {
        "text": "Make all traffic bypass security policy",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain the purpose of VLAN segmentation",
    "primaryType": "Purpose",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "VLANs logically separate switch ports and devices into distinct Layer 2 broadcast domains, supporting segmentation and traffic organization.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Each VLAN forms a separate Layer 2 broadcast domain.",
        "misconception": ""
      },
      "b": {
        "wrong": "VLANs segment traffic but do not increase a port's negotiated physical speed.",
        "misconception": "Confusing logical segmentation with bandwidth"
      },
      "c": {
        "wrong": "VLAN identifiers and IP addresses serve different purposes and commonly coexist.",
        "misconception": "Treating VLAN IDs as replacements for IP addresses"
      },
      "d": {
        "wrong": "Segmentation can support security, but VLANs do not automatically bypass or replace security controls.",
        "misconception": "Misunderstanding the relationship between segmentation and security"
      }
    },
    "remediation": {
      "objective": "Understand VLAN fundamentals",
      "summary": "Review VLAN purpose, broadcast domains, and logical segmentation.",
      "tags": [
        "vlan",
        "segmentation",
        "broadcast-domain"
      ],
      "aiCoachingPrompt": "Teach why VLANs exist using an office with employee, voice, camera, and guest devices. Ask me to explain the Layer 2 boundary created by each VLAN."
    },
    "relatedObjectives": [
      "Understand network segmentation"
    ],
    "authorPurpose": "Confirm understanding of VLAN purpose before testing tagging and inter-VLAN behavior.",
    "secondaryTypes": [
      "Concept"
    ],
    "distractorReason": {
      "b": "Segmentation versus speed confusion",
      "c": "VLAN ID versus IP confusion",
      "d": "Segmentation versus security-control confusion"
    }
  },
  {
    "id": 10,
    "question": "Two hosts are connected to the same physical switch but assigned to different VLANs. What additional function is normally required for them to communicate?",
    "answers": [
      {
        "text": "Layer 3 routing",
        "id": "a"
      },
      {
        "text": "A larger MAC address table",
        "id": "b"
      },
      {
        "text": "LLDP advertisements",
        "id": "c"
      },
      {
        "text": "A second cable between the hosts",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize the need for Layer 3 communication between VLANs",
    "primaryType": "Scenario",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Different VLANs are separate Layer 2 broadcast domains. Communication between them normally requires a Layer 3 routing function.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Inter-VLAN communication requires a Layer 3 routing function.",
        "misconception": ""
      },
      "b": {
        "wrong": "A larger MAC table does not connect separate VLANs; MAC learning remains scoped to each Layer 2 domain.",
        "misconception": "Assuming MAC-table capacity removes VLAN boundaries"
      },
      "c": {
        "wrong": "LLDP can describe neighbors but does not provide inter-VLAN forwarding.",
        "misconception": "Confusing discovery with forwarding"
      },
      "d": {
        "wrong": "A direct cable does not replace the required logical Layer 3 function and could create other problems.",
        "misconception": "Trying to solve logical segmentation with cabling"
      }
    },
    "remediation": {
      "objective": "Understand inter-VLAN communication",
      "summary": "Review VLAN boundaries and why routing is needed between VLANs.",
      "tags": [
        "inter-vlan",
        "routing",
        "vlan"
      ],
      "aiCoachingPrompt": "Teach inter-VLAN communication without vendor commands. Use two VLANs and ask me to trace the frame and packet through the gateway."
    },
    "relatedObjectives": [
      "Understand routing concepts",
      "Understand default gateway concepts"
    ],
    "authorPurpose": "Check readiness for later VLAN-interface and gateway configuration topics.",
    "secondaryTypes": [
      "Behavior"
    ],
    "distractorReason": {
      "b": "MAC-table versus VLAN-boundary confusion",
      "c": "Discovery versus routing confusion",
      "d": "Physical versus logical topology confusion"
    }
  },
  {
    "id": 11,
    "question": "Why is an IEEE 802.1Q tagged link commonly used between two switches?",
    "answers": [
      {
        "text": "To carry traffic for multiple VLANs across one physical link",
        "id": "a"
      },
      {
        "text": "To combine several physical links into one logical link",
        "id": "b"
      },
      {
        "text": "To assign IP addresses to connected hosts",
        "id": "c"
      },
      {
        "text": "To prevent every possible Layer 2 loop",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain tagged VLAN transport",
    "primaryType": "Purpose",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "An 802.1Q tag identifies the VLAN associated with a frame, allowing one physical link to transport traffic for multiple VLANs.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! VLAN tags preserve VLAN identity while multiple VLANs share a link.",
        "misconception": ""
      },
      "b": {
        "wrong": "Combining physical links is link aggregation, not the purpose of VLAN tagging.",
        "misconception": "Confusing VLAN trunks with LAGs"
      },
      "c": {
        "wrong": "IP address assignment is handled by host configuration or services such as DHCP, not 802.1Q tagging.",
        "misconception": "Confusing VLAN tagging with IP configuration"
      },
      "d": {
        "wrong": "STP or other loop-avoidance mechanisms address Layer 2 loops; tagging alone does not prevent them.",
        "misconception": "Confusing VLAN identification with loop prevention"
      }
    },
    "remediation": {
      "objective": "Understand tagged and untagged membership",
      "summary": "Review how tagged links carry multiple VLANs and preserve VLAN identity.",
      "tags": [
        "8021q",
        "tagged",
        "trunk"
      ],
      "aiCoachingPrompt": "Teach tagged and untagged VLAN membership using an endpoint port and a switch-to-switch link. Quiz me on whether transmitted frames carry a tag."
    },
    "relatedObjectives": [
      "Understand VLAN fundamentals"
    ],
    "authorPurpose": "Validate the core trunking concept without relying on vendor-specific configuration syntax.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Trunk versus LAG confusion",
      "c": "Layer 2 tag versus IP assignment confusion",
      "d": "Tagging versus STP confusion"
    }
  },
  {
    "id": 12,
    "question": "A workstation that does not understand VLAN tags is connected to a normal user-access port. How should its user VLAN traffic usually leave the switch port?",
    "answers": [
      {
        "text": "Untagged",
        "id": "a"
      },
      {
        "text": "With every VLAN tag configured on the switch",
        "id": "b"
      },
      {
        "text": "Inside an OSPF update",
        "id": "c"
      },
      {
        "text": "Only after LLDP creates a route",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize normal untagged endpoint connectivity",
    "primaryType": "Behavior",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A typical endpoint access port sends and receives ordinary user traffic untagged. The switch internally associates that traffic with the configured VLAN.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! A normal endpoint commonly sends and receives untagged traffic on its assigned access VLAN.",
        "misconception": ""
      },
      "b": {
        "wrong": "A normal endpoint should not receive all VLANs or tags; that would defeat access-port segmentation.",
        "misconception": "Assuming endpoint ports behave like trunks"
      },
      "c": {
        "wrong": "OSPF is a routing protocol and does not encapsulate ordinary access-port frames in this manner.",
        "misconception": "Confusing routing control traffic with VLAN membership"
      },
      "d": {
        "wrong": "LLDP may advertise information but does not create the route required for basic access-port operation.",
        "misconception": "Confusing discovery automation with normal VLAN forwarding"
      }
    },
    "remediation": {
      "objective": "Understand endpoint port membership",
      "summary": "Review access-port behavior and the distinction between tagged and untagged traffic.",
      "tags": [
        "untagged",
        "access-port",
        "vlan-membership"
      ],
      "aiCoachingPrompt": "Teach how an untagged endpoint frame is associated with a VLAN on ingress and sent untagged on egress. Give me port-membership scenarios."
    },
    "relatedObjectives": [
      "Understand tagged VLAN transport"
    ],
    "authorPurpose": "Ensure the learner can distinguish endpoint access behavior from tagged inter-device links.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Access-versus-trunk confusion",
      "c": "Control-plane confusion",
      "d": "LLDP automation confusion"
    }
  },
  {
    "id": 13,
    "question": "During installation, a technician wants to confirm which network device is directly connected to switch port 18. Which information source is most appropriate?",
    "answers": [
      {
        "text": "LLDP neighbor information",
        "id": "a"
      },
      {
        "text": "The Internet routing table",
        "id": "b"
      },
      {
        "text": "The workstation browser history",
        "id": "c"
      },
      {
        "text": "The STP root priority alone",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Use LLDP for direct-neighbor discovery",
    "primaryType": "Scenario",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "LLDP exchanges identity and capability information between directly connected devices and is useful for topology verification.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! LLDP neighbor information can identify the device and remote port directly attached to a local interface.",
        "misconception": ""
      },
      "b": {
        "wrong": "An Internet routing table describes IP reachability, not the identity of the device on a local switch port.",
        "misconception": "Confusing routing data with physical-neighbor data"
      },
      "c": {
        "wrong": "Browser history does not identify the network device attached to a switch port.",
        "misconception": "Using application data for infrastructure discovery"
      },
      "d": {
        "wrong": "STP root priority helps explain loop-prevention topology but does not by itself identify the direct neighbor on port 18.",
        "misconception": "Confusing STP state with neighbor inventory"
      }
    },
    "remediation": {
      "objective": "Understand LLDP neighbor discovery",
      "summary": "Review the purpose of LLDP and the type of direct-neighbor information it provides.",
      "tags": [
        "lldp",
        "neighbor-discovery",
        "verification"
      ],
      "aiCoachingPrompt": "Teach LLDP as a deployment and verification tool. Give me examples of local port, remote system name, and remote port ID and ask me to interpret them."
    },
    "relatedObjectives": [
      "Develop operational verification awareness"
    ],
    "authorPurpose": "Measure whether the learner can choose an appropriate verification source during installation.",
    "secondaryTypes": [
      "Troubleshooting"
    ],
    "distractorReason": {
      "b": "Routing versus neighbor-discovery confusion",
      "c": "Application versus infrastructure data confusion",
      "d": "STP versus LLDP confusion"
    }
  },
  {
    "id": 14,
    "question": "A technician adds a second active Ethernet path between two switches. Soon afterward, traffic spikes and MAC addresses appear on changing ports. What should be investigated first?",
    "answers": [
      {
        "text": "A Layer 2 loop and the loop-prevention design",
        "id": "a"
      },
      {
        "text": "The DNS suffix on user laptops",
        "id": "b"
      },
      {
        "text": "The default document printer",
        "id": "c"
      },
      {
        "text": "The NTP time zone",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize symptoms of a Layer 2 loop",
    "primaryType": "Troubleshooting",
    "domain": "Ethernet and Switching",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Troubleshooting Foundations",
      "Traffic Flow Analysis"
    ],
    "explanation": "An uncontrolled redundant Layer 2 path can form a loop. Flooded traffic can circulate repeatedly, causing high utilization and unstable MAC learning.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The topology change, traffic spike, and MAC movement strongly indicate a possible Layer 2 loop.",
        "misconception": ""
      },
      "b": {
        "wrong": "A DNS suffix can affect name resolution but does not explain a traffic storm and rapidly moving MAC entries.",
        "misconception": "Blaming name resolution for Layer 2 symptoms"
      },
      "c": {
        "wrong": "A printer selection does not explain switch-wide traffic amplification or MAC instability.",
        "misconception": "Focusing on an unrelated endpoint setting"
      },
      "d": {
        "wrong": "Time-zone configuration does not create Ethernet loops or MAC flapping.",
        "misconception": "Focusing on unrelated management configuration"
      }
    },
    "remediation": {
      "objective": "Understand loop prevention concepts",
      "summary": "Review why redundant Layer 2 paths need loop prevention and how a loop affects flooding and MAC learning.",
      "tags": [
        "layer-2-loop",
        "stp",
        "mac-flapping",
        "broadcast-storm"
      ],
      "aiCoachingPrompt": "Teach why Ethernet loops are harmful. Use a three-switch triangle and ask me to predict broadcast behavior and MAC-table symptoms with and without loop prevention."
    },
    "relatedObjectives": [
      "Understand switch flooding behavior",
      "Understand STP purpose"
    ],
    "authorPurpose": "Test practical recognition of a high-impact Layer 2 failure without requiring STP internals.",
    "secondaryTypes": [
      "Behavior",
      "Scenario"
    ],
    "distractorReason": {
      "b": "Layer 2 symptom versus DNS confusion",
      "c": "Infrastructure versus endpoint confusion",
      "d": "Operational timestamp versus traffic-cause confusion"
    }
  },
  {
    "id": 15,
    "question": "A host uses its IPv4 address and subnet mask together primarily to determine what?",
    "answers": [
      {
        "text": "Whether a destination is local or remote",
        "id": "a"
      },
      {
        "text": "Which physical switch port is fastest",
        "id": "b"
      },
      {
        "text": "Which device is the STP root",
        "id": "c"
      },
      {
        "text": "Which LLDP neighbor has the newest software",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Interpret IPv4 addresses and subnet boundaries",
    "primaryType": "Behavior",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "The host compares the destination with its own IP address and mask to determine whether it can deliver locally or must use a gateway.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The subnet mask identifies the local IP network boundary.",
        "misconception": ""
      },
      "b": {
        "wrong": "IP addressing does not measure physical switch-port speed.",
        "misconception": "Confusing Layer 3 addressing with Layer 1 capabilities"
      },
      "c": {
        "wrong": "STP root selection is a Layer 2 loop-prevention process, not an IPv4 subnet calculation.",
        "misconception": "Confusing Layer 2 control with Layer 3 addressing"
      },
      "d": {
        "wrong": "LLDP neighbor details are separate from IPv4 subnet-boundary decisions.",
        "misconception": "Confusing discovery metadata with IP forwarding logic"
      }
    },
    "remediation": {
      "objective": "Understand IPv4 addressing",
      "summary": "Review network and host portions, subnet masks, and local-versus-remote determination.",
      "tags": [
        "ipv4",
        "subnet-mask",
        "local-vs-remote"
      ],
      "aiCoachingPrompt": "Teach how a host uses an IPv4 address and subnet mask to decide whether a destination is local. Give me several address pairs and ask me to explain the decision."
    },
    "relatedObjectives": [
      "Understand default gateway concepts"
    ],
    "authorPurpose": "Validate practical IPv4 interpretation rather than memorized definitions.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Layer 1 versus Layer 3 confusion",
      "c": "STP versus subnetting confusion",
      "d": "LLDP versus IP logic confusion"
    }
  },
  {
    "id": 16,
    "question": "Which description of the IPv4 prefix 192.168.50.0/24 is correct?",
    "answers": [
      {
        "text": "It normally contains 256 total addresses, with 254 traditional usable host addresses",
        "id": "a"
      },
      {
        "text": "It contains exactly two total addresses",
        "id": "b"
      },
      {
        "text": "It identifies one host only",
        "id": "c"
      },
      {
        "text": "It is the same size as a /16 network",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize the practical meaning of a common /24 subnet",
    "primaryType": "Concept",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Fundamental",
    "competencies": [],
    "explanation": "A /24 leaves 8 host bits, producing 256 total addresses. In a traditional subnet, the network and broadcast addresses are not assigned to hosts, leaving 254 usable host addresses.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! A traditional /24 has 256 total addresses and 254 usable host addresses.",
        "misconception": ""
      },
      "b": {
        "wrong": "Two usable host addresses are commonly associated with a traditional /30, not a /24.",
        "misconception": "Confusing /24 and /30 sizes"
      },
      "c": {
        "wrong": "A /32 identifies a single IPv4 address; a /24 is much larger.",
        "misconception": "Confusing /24 and /32 prefixes"
      },
      "d": {
        "wrong": "A /16 contains far more addresses than a /24 because it leaves 16 host bits instead of 8.",
        "misconception": "Assuming prefix lengths do not affect subnet size"
      }
    },
    "remediation": {
      "objective": "Understand common subnet sizes",
      "summary": "Review /8, /16, /24, /30, and /32, with awareness of /28 and /31.",
      "tags": [
        "subnetting",
        "cidr",
        "slash-24"
      ],
      "aiCoachingPrompt": "Teach common IPv4 prefix lengths and their practical uses. Let me use a reference sheet, but require me to interpret the result correctly."
    },
    "relatedObjectives": [
      "Interpret IPv4 addresses"
    ],
    "authorPurpose": "Check recognition of a common subnet without over-weighting manual calculation.",
    "secondaryTypes": [
      "Calculation"
    ],
    "distractorReason": {
      "b": "/30 confusion",
      "c": "/32 confusion",
      "d": "/16 confusion"
    }
  },
  {
    "id": 17,
    "question": "A traditional IPv4 point-to-point link needs one address for each of two routers. Which prefix is commonly used?",
    "answers": [
      {
        "text": "/30",
        "id": "a"
      },
      {
        "text": "/24",
        "id": "b"
      },
      {
        "text": "/16",
        "id": "c"
      },
      {
        "text": "/8",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize a common point-to-point subnet size",
    "primaryType": "Scenario",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Fundamental",
    "competencies": [],
    "explanation": "A traditional /30 contains four total addresses and two usable host addresses, making it a common choice for point-to-point links. /31 is also used in supported environments but is awareness-level here.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! A /30 traditionally supplies two usable addresses for the two ends of a point-to-point link.",
        "misconception": ""
      },
      "b": {
        "wrong": "A /24 would work technically but allocates far more addresses than a simple two-router link normally needs.",
        "misconception": "Selecting a familiar prefix without considering purpose"
      },
      "c": {
        "wrong": "A /16 is far larger than needed for a two-endpoint link.",
        "misconception": "Ignoring efficient address allocation"
      },
      "d": {
        "wrong": "A /8 is an extremely large network and is not a practical point-to-point allocation.",
        "misconception": "Ignoring prefix-size meaning"
      }
    },
    "remediation": {
      "objective": "Apply practical subnetting choices",
      "summary": "Review why /30 is common for traditional point-to-point links and recognize /31 as an alternative where supported.",
      "tags": [
        "subnetting",
        "point-to-point",
        "slash-30"
      ],
      "aiCoachingPrompt": "Teach practical subnet selection for LANs, point-to-point links, and host routes. Avoid speed drills; ask me to justify each prefix choice."
    },
    "relatedObjectives": [
      "Understand common subnet sizes"
    ],
    "authorPurpose": "Assess practical prefix selection rather than arbitrary binary conversion.",
    "secondaryTypes": [
      "Purpose"
    ],
    "distractorReason": {
      "b": "Familiar-prefix bias",
      "c": "Oversized-subnet choice",
      "d": "Extreme over-allocation"
    }
  },
  {
    "id": 18,
    "question": "A workstation needs to send traffic to its default gateway but does not yet know the gateway's MAC address. What happens next?",
    "answers": [
      {
        "text": "The workstation uses ARP to resolve the gateway IP address to a MAC address",
        "id": "a"
      },
      {
        "text": "The workstation uses DNS to resolve the gateway IP address to a switch port",
        "id": "b"
      },
      {
        "text": "The workstation waits for OSPF to form with the gateway",
        "id": "c"
      },
      {
        "text": "The workstation sends the frame using the remote server's MAC address",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain ARP resolution for a default gateway",
    "primaryType": "Behavior",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Before sending an Ethernet frame to the local gateway, the host needs the gateway's MAC address. ARP provides the local IP-to-MAC mapping.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! ARP resolves the local gateway IP address to the gateway's MAC address.",
        "misconception": ""
      },
      "b": {
        "wrong": "DNS resolves names to IP addresses; it does not map an IP address to a switch port.",
        "misconception": "Confusing DNS with ARP"
      },
      "c": {
        "wrong": "Ordinary workstations do not form OSPF adjacencies with their default gateway for this traffic.",
        "misconception": "Confusing host forwarding with dynamic routing"
      },
      "d": {
        "wrong": "For a remote destination, the local Ethernet frame uses the gateway's MAC, not the remote server's MAC.",
        "misconception": "Assuming destination MAC remains end-to-end"
      }
    },
    "remediation": {
      "objective": "Understand ARP",
      "summary": "Review the ARP request/reply process and why a host resolves the gateway for remote traffic.",
      "tags": [
        "arp",
        "default-gateway",
        "ip-to-mac"
      ],
      "aiCoachingPrompt": "Teach ARP using local-host and remote-host examples. Ask whose MAC address the sender resolves in each case and why."
    },
    "relatedObjectives": [
      "Understand default gateway concepts",
      "Analyze Layer 3 traffic flow"
    ],
    "authorPurpose": "Validate a critical step in the life of a packet to a remote network.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "DNS versus ARP confusion",
      "c": "Host versus routing-protocol confusion",
      "d": "End-to-end MAC misconception"
    }
  },
  {
    "id": 19,
    "question": "Host A is 10.10.1.20/24 and Host B is 10.10.2.30/24. Host A has gateway 10.10.1.1. Which MAC address will Host A put as the destination when forwarding traffic to Host B?",
    "answers": [
      {
        "text": "The MAC address of gateway 10.10.1.1",
        "id": "a"
      },
      {
        "text": "The MAC address of Host B",
        "id": "b"
      },
      {
        "text": "The broadcast MAC address for every data frame",
        "id": "c"
      },
      {
        "text": "The MAC address of the DNS server",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Apply default gateway behavior to remote traffic",
    "primaryType": "Scenario",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Host B is outside Host A's /24. Host A keeps Host B's IP as the packet destination but addresses the local Ethernet frame to the default gateway's MAC.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The first local frame goes to the gateway MAC while the packet remains addressed to Host B's IP.",
        "misconception": ""
      },
      "b": {
        "wrong": "Host B is on a remote subnet, so its MAC address is not used on Host A's local Ethernet segment.",
        "misconception": "Assuming remote MAC addresses are resolved end-to-end"
      },
      "c": {
        "wrong": "ARP may use a broadcast request, but the actual unicast data frame is sent to the gateway MAC once resolved.",
        "misconception": "Confusing ARP broadcast with subsequent data traffic"
      },
      "d": {
        "wrong": "DNS may be used to resolve a name, but it is not the Layer 2 destination for this remote data flow.",
        "misconception": "Confusing name resolution with packet forwarding"
      }
    },
    "remediation": {
      "objective": "Understand default gateway concepts",
      "summary": "Review the distinction between the packet's remote destination IP and the frame's local-hop destination MAC.",
      "tags": [
        "default-gateway",
        "traffic-flow",
        "layer-2-layer-3"
      ],
      "aiCoachingPrompt": "Give me remote-destination scenarios and require me to identify both the packet destination IP and first-frame destination MAC."
    },
    "relatedObjectives": [
      "Understand ARP",
      "Distinguish frames and packets"
    ],
    "authorPurpose": "Test synthesis of subnet, gateway, ARP, frame, and packet concepts.",
    "secondaryTypes": [
      "Behavior"
    ],
    "distractorReason": {
      "b": "Remote MAC misconception",
      "c": "ARP request versus data-frame confusion",
      "d": "DNS versus forwarding confusion"
    }
  },
  {
    "id": 20,
    "question": "A router has these matching routes for destination 10.20.30.40: 10.0.0.0/8, 10.20.0.0/16, 10.20.30.0/24, and 0.0.0.0/0. Which route is selected first?",
    "answers": [
      {
        "text": "10.20.30.0/24",
        "id": "a"
      },
      {
        "text": "10.20.0.0/16",
        "id": "b"
      },
      {
        "text": "10.0.0.0/8",
        "id": "c"
      },
      {
        "text": "0.0.0.0/0",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Apply longest-prefix match in a routing table",
    "primaryType": "Scenario",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Routers prefer the most specific matching route. The /24 matches the destination and has the longest prefix among the listed routes.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The /24 is the most specific matching route.",
        "misconception": ""
      },
      "b": {
        "wrong": "The /16 matches, but the /24 is more specific and is preferred first.",
        "misconception": "Choosing a valid but less-specific route"
      },
      "c": {
        "wrong": "The /8 matches broadly, but both /16 and /24 are more specific.",
        "misconception": "Assuming the largest network is preferred"
      },
      "d": {
        "wrong": "The default route is used only when no more specific route matches.",
        "misconception": "Assuming the default route has priority over specific routes"
      }
    },
    "remediation": {
      "objective": "Understand routing concepts",
      "summary": "Review routing tables, matching prefixes, and why the most specific route is selected.",
      "tags": [
        "routing-table",
        "longest-prefix-match",
        "route-selection"
      ],
      "aiCoachingPrompt": "Teach longest-prefix match with small routing tables. Let me identify every matching entry, then choose the most specific route."
    },
    "relatedObjectives": [
      "Interpret IPv4 prefixes"
    ],
    "authorPurpose": "Assess basic route-table interpretation required for installation and verification work.",
    "secondaryTypes": [
      "Behavior"
    ],
    "distractorReason": {
      "b": "Less-specific match",
      "c": "Broad-route preference misconception",
      "d": "Default-route misconception"
    }
  },
  {
    "id": 21,
    "question": "What is the main operational difference between a static route and a route learned through OSPF, RIP, or BGP?",
    "answers": [
      {
        "text": "A static route is entered deliberately, while a dynamic protocol can exchange route information",
        "id": "a"
      },
      {
        "text": "A static route uses MAC addresses, while dynamic routes use IP addresses",
        "id": "b"
      },
      {
        "text": "Static routes work only inside VLANs, while dynamic routes work only on wireless networks",
        "id": "c"
      },
      {
        "text": "Dynamic routes eliminate the need for a routing table",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Distinguish static and dynamic route learning",
    "primaryType": "Concept",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Static routes are configured explicitly. Dynamic routing protocols exchange reachability information and can update learned routes as the network changes.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The distinction is how route information is supplied and updated.",
        "misconception": ""
      },
      "b": {
        "wrong": "Both static and dynamically learned routes describe Layer 3 IP reachability.",
        "misconception": "Confusing route source with forwarding address type"
      },
      "c": {
        "wrong": "Both route types can be used in wired or wireless environments and are not limited this way.",
        "misconception": "Inventing media restrictions"
      },
      "d": {
        "wrong": "Dynamically learned routes are installed in and selected from a routing table.",
        "misconception": "Assuming routing protocols replace the routing table"
      }
    },
    "remediation": {
      "objective": "Understand dynamic routing awareness",
      "summary": "Review the purpose of OSPF, RIP, and BGP at a high level, without protocol internals.",
      "tags": [
        "static-routing",
        "dynamic-routing",
        "ospf",
        "rip",
        "bgp"
      ],
      "aiCoachingPrompt": "Compare static routes with OSPF, RIP, and BGP at a purpose-only level. Quiz me on which approach fits simple versus changing networks."
    },
    "relatedObjectives": [
      "Understand routing tables"
    ],
    "authorPurpose": "Ensure routing protocol names are familiar and associated with automatic route exchange.",
    "secondaryTypes": [
      "Purpose"
    ],
    "distractorReason": {
      "b": "Layer 2 versus Layer 3 confusion",
      "c": "Media restriction fiction",
      "d": "Protocol versus table confusion"
    }
  },
  {
    "id": 22,
    "question": "A host can reach its default gateway, but the gateway has no matching specific route and no default route for the destination. What should the gateway normally do with the packet?",
    "answers": [
      {
        "text": "Drop it because no usable route exists",
        "id": "a"
      },
      {
        "text": "Flood it out every VLAN as an unknown unicast",
        "id": "b"
      },
      {
        "text": "Send it back to the host using the same destination IP",
        "id": "c"
      },
      {
        "text": "Ask LLDP to discover the remote network",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Predict behavior when no route exists",
    "primaryType": "Troubleshooting",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Traffic Flow Analysis",
      "Troubleshooting Foundations"
    ],
    "explanation": "A router needs a usable route to forward a packet. Without a matching route or default route, it normally drops the packet and may generate an error indication.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Without a usable route, the router cannot forward the packet toward the destination.",
        "misconception": ""
      },
      "b": {
        "wrong": "Routers do not solve missing Layer 3 routes by flooding packets across all VLANs.",
        "misconception": "Applying Layer 2 unknown-unicast behavior to Layer 3 routing"
      },
      "c": {
        "wrong": "Returning the unchanged packet does not create reachability and could contribute to looping behavior.",
        "misconception": "Assuming the router automatically reverses unsuccessful traffic"
      },
      "d": {
        "wrong": "LLDP discovers directly connected devices, not remote IP routes.",
        "misconception": "Confusing neighbor discovery with route discovery"
      }
    },
    "remediation": {
      "objective": "Understand route availability",
      "summary": "Review route lookup, default routes, and packet handling when no route is available.",
      "tags": [
        "no-route",
        "default-route",
        "routing-table"
      ],
      "aiCoachingPrompt": "Give me small routing tables and test what happens for matching, default-only, and no-route destinations. Require one-best-answer reasoning."
    },
    "relatedObjectives": [
      "Understand default routes",
      "Analyze Layer 3 traffic flow"
    ],
    "authorPurpose": "Test a common failure condition after the local gateway has already been proven reachable.",
    "secondaryTypes": [
      "Behavior",
      "Scenario"
    ],
    "distractorReason": {
      "b": "Layer 2 flooding applied to Layer 3",
      "c": "Automatic return-path misconception",
      "d": "LLDP versus routing confusion"
    }
  },
  {
    "id": 23,
    "question": "Users in one large Layer 2 network experience excessive broadcast traffic. Which design change most directly limits the impact of those broadcasts?",
    "answers": [
      {
        "text": "Segment devices into appropriate VLANs and IP subnets",
        "id": "a"
      },
      {
        "text": "Increase every user's screen resolution",
        "id": "b"
      },
      {
        "text": "Place all devices into one larger VLAN",
        "id": "c"
      },
      {
        "text": "Remove all default gateways",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Apply basic network segmentation principles",
    "primaryType": "Scenario",
    "domain": "IP Addressing and Routing",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "VLANs create separate Layer 2 broadcast domains. Pairing intentional VLAN and subnet design limits how far ordinary broadcasts are flooded.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Appropriate segmentation limits each Layer 2 broadcast domain.",
        "misconception": ""
      },
      "b": {
        "wrong": "Display settings have no effect on Ethernet broadcast scope.",
        "misconception": "Unrelated endpoint setting"
      },
      "c": {
        "wrong": "A larger single VLAN expands rather than limits the broadcast domain.",
        "misconception": "Reversing the effect of segmentation"
      },
      "d": {
        "wrong": "Removing gateways prevents inter-network communication but does not divide the existing Layer 2 broadcast domain.",
        "misconception": "Confusing routing removal with Layer 2 segmentation"
      }
    },
    "remediation": {
      "objective": "Understand basic network design awareness",
      "summary": "Review intentional VLAN/subnet segmentation, broadcast-domain control, and the continuing role of routing between segments.",
      "tags": [
        "network-design",
        "segmentation",
        "broadcast-control"
      ],
      "aiCoachingPrompt": "Teach basic segmentation decisions using users, voice, cameras, servers, and guests. Ask what belongs together and how routing reconnects segments when needed."
    },
    "relatedObjectives": [
      "Understand VLAN fundamentals",
      "Understand routing concepts"
    ],
    "authorPurpose": "Check whether the learner can connect broadcast behavior to a basic deployment design decision.",
    "secondaryTypes": [
      "Purpose",
      "Troubleshooting"
    ],
    "distractorReason": {
      "b": "Unrelated endpoint action",
      "c": "Segmentation effect reversed",
      "d": "Layer 2 versus Layer 3 boundary confusion"
    }
  },
  {
    "id": 24,
    "question": "A critical service depends on one switch and one link, with no alternate path. What risk does this design contain?",
    "answers": [
      {
        "text": "A single point of failure",
        "id": "a"
      },
      {
        "text": "Too many routing protocols",
        "id": "b"
      },
      {
        "text": "An oversized MAC address",
        "id": "c"
      },
      {
        "text": "Excessive VRF separation",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize a single point of failure",
    "primaryType": "Concept",
    "domain": "Resiliency and Operations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "When one device or link can interrupt the whole service, that component is a single point of failure.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! If the only switch or link fails, the service loses connectivity.",
        "misconception": ""
      },
      "b": {
        "wrong": "The scenario describes dependence on one path, not competing routing protocols.",
        "misconception": "Adding unmentioned protocol complexity"
      },
      "c": {
        "wrong": "MAC address size is fixed and unrelated to path redundancy.",
        "misconception": "Confusing addressing with availability"
      },
      "d": {
        "wrong": "The scenario does not describe VRFs or excessive logical isolation.",
        "misconception": "Confusing virtualization with physical resiliency"
      }
    },
    "remediation": {
      "objective": "Understand redundancy fundamentals",
      "summary": "Review single points of failure and why critical networks use redundant links, devices, or paths.",
      "tags": [
        "redundancy",
        "single-point-of-failure",
        "high-availability"
      ],
      "aiCoachingPrompt": "Teach single points of failure with simple topologies. Ask me to identify which link or device can interrupt service and suggest a high-level redundant alternative."
    },
    "relatedObjectives": [
      "Understand traffic flow during failure"
    ],
    "authorPurpose": "Validate the basic reason resiliency features appear in installation courses.",
    "secondaryTypes": [
      "Purpose"
    ],
    "distractorReason": {
      "b": "Invented protocol issue",
      "c": "Addressing versus resiliency confusion",
      "d": "Virtualization versus resiliency confusion"
    }
  },
  {
    "id": 25,
    "question": "Two physical links are operating as one logical link through link aggregation. One physical link fails. What is the intended result?",
    "answers": [
      {
        "text": "Traffic continues over the remaining operational link",
        "id": "a"
      },
      {
        "text": "Every VLAN on both devices is deleted",
        "id": "b"
      },
      {
        "text": "Both devices must stop routing permanently",
        "id": "c"
      },
      {
        "text": "The remaining link becomes an access point",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain the purpose of link resiliency",
    "primaryType": "Behavior",
    "domain": "Resiliency and Operations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "Link aggregation can add capacity and link-level resiliency. If one member fails, the logical link can remain available through surviving members.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The logical connection should remain available if enough member links remain operational.",
        "misconception": ""
      },
      "b": {
        "wrong": "A member failure does not normally remove VLAN configuration from the devices.",
        "misconception": "Confusing link state with configuration deletion"
      },
      "c": {
        "wrong": "A link-member failure does not require routing to stop permanently.",
        "misconception": "Assuming a local link fault disables all Layer 3 operation"
      },
      "d": {
        "wrong": "A link does not change into a wireless access point.",
        "misconception": "Confusing interface resiliency with device roles"
      }
    },
    "remediation": {
      "objective": "Understand link aggregation awareness",
      "summary": "Review how multiple physical links can form one logical connection for capacity and resiliency.",
      "tags": [
        "link-aggregation",
        "lacp-awareness",
        "link-failure"
      ],
      "aiCoachingPrompt": "Teach link aggregation at a purpose-only level. Give me member-failure scenarios and ask what continuity the design should provide."
    },
    "relatedObjectives": [
      "Understand redundancy fundamentals"
    ],
    "authorPurpose": "Test the expected result of link redundancy without requiring LACP protocol details.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Failure versus configuration-loss confusion",
      "c": "Link fault versus routing shutdown confusion",
      "d": "Device-role confusion"
    }
  },
  {
    "id": 26,
    "question": "End-user devices use virtual gateway IP address that is shared by two routers. Why is this design used?",
    "answers": [
      {
        "text": "To preserve gateway availability if one router fails",
        "id": "a"
      },
      {
        "text": "To make Ethernet frames travel without MAC addresses",
        "id": "b"
      },
      {
        "text": "To remove the need for any routing table",
        "id": "c"
      },
      {
        "text": "To replace VLAN tagging on switch links",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Explain gateway resiliency at a high level",
    "primaryType": "Purpose",
    "domain": "Resiliency and Operations",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A shared virtual gateway allows another gateway-capable device to provide the default-gateway function if the active device becomes unavailable.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The design reduces the default gateway as a single point of failure.",
        "misconception": ""
      },
      "b": {
        "wrong": "Local Ethernet delivery still uses MAC addresses.",
        "misconception": "Assuming gateway redundancy removes Layer 2 addressing"
      },
      "c": {
        "wrong": "Gateway devices still require routing information to reach remote networks.",
        "misconception": "Assuming redundancy replaces routing logic"
      },
      "d": {
        "wrong": "Gateway resiliency and VLAN tagging solve different problems.",
        "misconception": "Confusing Layer 3 high availability with Layer 2 VLAN transport"
      }
    },
    "remediation": {
      "objective": "Understand gateway resiliency awareness",
      "summary": "Review why a resilient virtual gateway is used and what failure it is intended to tolerate.",
      "tags": [
        "gateway-resiliency",
        "vrrp-awareness",
        "virtual-gateway"
      ],
      "aiCoachingPrompt": "Teach gateway resiliency without protocol timers or election details. Ask me what clients should experience when one gateway device fails."
    },
    "relatedObjectives": [
      "Understand default gateway concepts",
      "Understand redundancy fundamentals"
    ],
    "authorPurpose": "Prepare learners to recognize VRRP-like concepts later without making a product-specific implementation a prerequisite.",
    "secondaryTypes": [
      "Scenario"
    ],
    "distractorReason": {
      "b": "Redundancy versus MAC-addressing confusion",
      "c": "Redundancy versus routing-table confusion",
      "d": "Gateway HA versus tagging confusion"
    }
  },
  {
    "id": 27,
    "question": "A device is connected redundantly to two switches. One upstream switch fails, and connectivity is lost even though the other physical link remains up. What should be investigated first?",
    "answers": [
      {
        "text": "Whether the resiliency design correctly supports traffic on the surviving switch",
        "id": "a"
      },
      {
        "text": "Whether all clients should be upgraded immediately",
        "id": "b"
      },
      {
        "text": "Whether the remaining cable should be removed",
        "id": "c"
      },
      {
        "text": "Whether every VLAN should be merged into one",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Analyze traffic flow during a device failure",
    "primaryType": "Troubleshooting",
    "domain": "Resiliency and Operations",
    "masteryLevel": "Intermediate",
    "competencies": [
      "Traffic Flow Analysis",
      "Troubleshooting Foundations"
    ],
    "explanation": "A redundant physical connection alone does not guarantee service continuity. The logical resiliency design and surviving traffic path must also function correctly.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Verify that the surviving link, logical topology, VLANs, and forwarding or routing state support the intended failover.",
        "misconception": ""
      },
      "b": {
        "wrong": "Upgrading all clients before isolating the failure is an unjustified and disruptive first action.",
        "misconception": "Using upgrades as a default troubleshooting step"
      },
      "c": {
        "wrong": "Removing the surviving path makes resilience worse and does not explain the failure.",
        "misconception": "Responding to failure by removing redundancy"
      },
      "d": {
        "wrong": "Merging VLANs changes segmentation and does not directly repair a failed resiliency mechanism.",
        "misconception": "Using broad redesign instead of targeted diagnosis"
      }
    },
    "remediation": {
      "objective": "Understand device resiliency",
      "summary": "Review that dual connections require a valid logical design and consistent configuration, not just two cables.",
      "tags": [
        "device-resiliency",
        "dual-homing",
        "failure-analysis"
      ],
      "aiCoachingPrompt": "Teach vendor-neutral dual-homing and device resiliency. Give me failure scenarios and require me to trace the surviving traffic path before proposing a fix."
    },
    "relatedObjectives": [
      "Understand traffic flow during failure",
      "Understand VLAN path consistency"
    ],
    "authorPurpose": "Reinforce diagnosis of a failed redundant design and include the common but weak 'upgrade first' distractor.",
    "secondaryTypes": [
      "Scenario",
      "Behavior"
    ],
    "distractorReason": {
      "b": "Upgrade-first troubleshooting anti-pattern",
      "c": "Removing surviving redundancy",
      "d": "Unnecessary broad redesign"
    }
  },
  {
    "id": 28,
    "question": "Two customers share the same physical network equipment but require separate routing tables and isolated traffic. Which concept most directly supports this requirement?",
    "answers": [
      {
        "text": "Virtual Routing and Forwarding, or VRF",
        "id": "a"
      },
      {
        "text": "Spanning Tree Protocol",
        "id": "b"
      },
      {
        "text": "Link Layer Discovery Protocol",
        "id": "c"
      },
      {
        "text": "Link Aggregation",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize the purpose of VRF-based routing separation",
    "primaryType": "Scenario",
    "domain": "Modern Networking Concepts",
    "masteryLevel": "Advanced",
    "competencies": [
      "Traffic Flow Analysis"
    ],
    "explanation": "A VRF provides a separate logical routing table, allowing traffic and route information to remain isolated while physical infrastructure is shared.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! VRFs create separate routing domains on shared infrastructure.",
        "misconception": ""
      },
      "b": {
        "wrong": "STP prevents Layer 2 loops; it does not create separate routing tables.",
        "misconception": "Confusing loop prevention with routing virtualization"
      },
      "c": {
        "wrong": "LLDP discovers directly connected neighbors; it does not isolate routing domains.",
        "misconception": "Confusing discovery with virtualization"
      },
      "d": {
        "wrong": "Link aggregation combines physical links for capacity or resiliency; it does not create separate routing tables.",
        "misconception": "Confusing link resiliency with routing isolation"
      }
    },
    "remediation": {
      "objective": "Understand modern network virtualization awareness",
      "summary": "Review segmentation, VPN and overlay awareness, and the purpose of separate VRF routing tables.",
      "tags": [
        "vrf",
        "routing-isolation",
        "multi-tenancy"
      ],
      "aiCoachingPrompt": "Teach VRFs as separate routing tables using two tenants with overlapping addresses. Keep implementation details out, and quiz me on the isolation goal."
    },
    "relatedObjectives": [
      "Understand segmentation concepts",
      "Understand network virtualization awareness"
    ],
    "authorPurpose": "Provide the minimum conceptual bridge needed before product courses introduce virtualized network services.",
    "secondaryTypes": [
      "Purpose"
    ],
    "distractorReason": {
      "b": "STP versus VRF confusion",
      "c": "LLDP versus virtualization confusion",
      "d": "LAG versus VRF confusion"
    }
  },
  {
    "id": 29,
    "question": "You have used SSH to reach a switch CLI and want to verify whether interface 12 is enabled and working. What is the best next action?",
    "answers": [
      {
        "text": "Run a non-disruptive command that displays interface status",
        "id": "a"
      },
      {
        "text": "Erase the running configuration to remove possible errors",
        "id": "b"
      },
      {
        "text": "Upgrade the switch",
        "id": "c"
      },
      {
        "text": "Disable every interface and re-enable them one at a time",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Use a CLI to inspect device state before making changes",
    "primaryType": "Troubleshooting",
    "domain": "Operational CLI Skills",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "A show or display command is the safest first step because it gathers evidence about administrative and operational state without changing the device.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! Begin with a non-disruptive status command and interpret the output before changing configuration.",
        "misconception": ""
      },
      "b": {
        "wrong": "Erasing configuration is highly disruptive and discards evidence before the problem is understood.",
        "misconception": "Using destructive reset as an initial diagnostic action"
      },
      "c": {
        "wrong": "An upgrade may introduce additional variables and should not replace basic evidence gathering.",
        "misconception": "Using upgrade-first troubleshooting"
      },
      "d": {
        "wrong": "Disabling all interfaces creates a larger outage and is not a targeted first step.",
        "misconception": "Using broad disruptive changes instead of observation"
      }
    },
    "remediation": {
      "objective": "Develop basic CLI operational confidence",
      "summary": "Review console and SSH access, prompts, help, command history, and non-disruptive status commands.",
      "tags": [
        "cli",
        "ssh",
        "show-command",
        "interface-status"
      ],
      "aiCoachingPrompt": "Act as a vendor-neutral CLI coach. Show a fictional switch prompt and ask me to choose safe verification actions before configuration changes. Do not require specific vendor syntax."
    },
    "relatedObjectives": [
      "Apply structured troubleshooting"
    ],
    "authorPurpose": "Replace the overly generic CLI pilot item with a realistic and one-best-answer operational task.",
    "secondaryTypes": [
      "Behavior"
    ],
    "distractorReason": {
      "b": "Reset-first anti-pattern",
      "c": "Upgrade-first anti-pattern",
      "d": "Broad disruptive troubleshooting"
    }
  },
  {
    "id": 30,
    "question": "A switch CLI prompt changes after the technician enters a configuration mode. What does this most likely indicate?",
    "answers": [
      {
        "text": "Further commands may change device configuration rather than only display information",
        "id": "a"
      },
      {
        "text": "The physical cable speed has automatically doubled",
        "id": "b"
      },
      {
        "text": "The switch has joined a dynamic routing protocol",
        "id": "c"
      },
      {
        "text": "All unsaved changes have already been written permanently",
        "id": "d"
      }
    ],
    "correctAnswer": "a",
    "objective": "Recognize operational and configuration CLI contexts",
    "primaryType": "Behavior",
    "domain": "Operational CLI Skills",
    "masteryLevel": "Fundamental",
    "competencies": [
      "Troubleshooting Foundations"
    ],
    "explanation": "Many network CLIs distinguish operational viewing from configuration contexts. Entering configuration context means commands may modify device state, but it does not imply that changes were saved.",
    "answerFeedback": {
      "a": {
        "correct": "Correct! The prompt or context helps the operator recognize that commands may now modify configuration.",
        "misconception": ""
      },
      "b": {
        "wrong": "CLI context does not change the physical link speed by itself.",
        "misconception": "Confusing management context with interface operation"
      },
      "c": {
        "wrong": "Entering configuration context does not automatically enable or join a routing protocol.",
        "misconception": "Assuming context entry performs protocol configuration"
      },
      "d": {
        "wrong": "Entering configuration mode does not necessarily save changes; saving is usually a separate action.",
        "misconception": "Confusing editing configuration with persisting configuration"
      }
    },
    "remediation": {
      "objective": "Understand basic CLI navigation",
      "summary": "Review operational versus configuration contexts, help, command history, and the need to save changes when required.",
      "tags": [
        "cli",
        "configuration-context",
        "save-configuration"
      ],
      "aiCoachingPrompt": "Teach vendor-neutral CLI concepts: operational mode, configuration context, help, command history, and saving. Quiz me on what each prompt transition implies and does not imply."
    },
    "relatedObjectives": [
      "Use a CLI safely"
    ],
    "authorPurpose": "Ensure the learner is comfortable with generic network CLI context without teaching a vendor-specific command sequence.",
    "secondaryTypes": [
      "Concept"
    ],
    "distractorReason": {
      "b": "CLI versus physical-interface confusion",
      "c": "Context entry versus protocol activation confusion",
      "d": "Configuration versus persistence confusion"
    }
  }
];

// Export for both browser and Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizDataV2;
}
if (typeof window !== 'undefined') {
  window.quizData = quizDataV2;
}
