// Networking Fundamentals Knowledge Assessment
// Questions 1-32 with answers, explanations, and topic-based learning resources

const quizData = [
  // ===== LAYER 2 SWITCHING (Questions 1-5) =====
  {
    id: 1,
    topic: "Layer 2 Switching",
    question: "What information does a Layer 2 switch primarily use to forward Ethernet frames?",
    options: [
      { text: "Destination IP address", feedback: "IP addresses are used by routers at Layer 3, not switches. Switches operate at Layer 2 and make decisions based on MAC addresses." },
      { text: "Destination MAC address", feedback: "✓ Correct! Layer 2 switches use the destination MAC address in their MAC address table to forward frames to the correct port.", isCorrect: true },
      { text: "TCP port number", feedback: "TCP port numbers operate at Layer 4 (Transport). Switches don't examine TCP headers." },
      { text: "Subnet mask", feedback: "Subnet masks relate to IP addressing (Layer 3), not MAC-based forwarding." }
    ],
    explanation: "Layer 2 switches maintain a MAC address table that maps MAC addresses to physical ports. When a frame arrives, the switch looks up the destination MAC address to determine which port to forward the frame to. This is fundamental to switch operation.",
    resources: {
      videoTopic: "Layer 2 Switching and MAC Address Tables"
    }
  },
  {
    id: 2,
    topic: "Layer 2 Switching",
    question: "A switch receives a frame with an unknown destination MAC address. What is the typical behavior?",
    options: [
      { text: "Drop the frame immediately", feedback: "Switches don't drop unknown unicast frames. They flood them to learn the topology." },
      { text: "Flood the frame out all appropriate ports in the same VLAN except the source port", feedback: "✓ Correct! When the destination MAC is unknown, the switch floods the frame to all ports in that VLAN except the input port. This helps discover the correct path and often triggers an ARP reply.", isCorrect: true },
      { text: "Send the frame only to trunk ports", feedback: "Trunk ports carry multiple VLANs, but flooding is not restricted to trunks. The switch floods to all ports in the same VLAN." },
      { text: "Route the frame using the default gateway", feedback: "Switches don't route; that's a router function. Switches forward within a VLAN." }
    ],
    explanation: "Flooding is the switch's way of handling unknown unicast destinations. By flooding to all ports in the VLAN (except the source), the frame reaches the destination host, which typically responds. The switch then learns the destination's MAC address and port association from that response.",
    resources: {
      videoTopic: "Switch Flooding and MAC Learning"
    }
  },
  {
    id: 3,
    topic: "Layer 2 Switching",
    question: "What causes a switch to learn a MAC address?",
    options: [
      { text: "The destination MAC address of a frame it receives", feedback: "The destination MAC tells the switch where to send the frame, but the switch doesn't learn from it. Learning happens from the source." },
      { text: "The source MAC address of a frame it receives", feedback: "✓ Correct! Switches learn MAC addresses from the source MAC address of frames they receive. The source indicates where the frame came from and which port it arrived on.", isCorrect: true },
      { text: "The default gateway configured on the host", feedback: "The default gateway is a host routing decision, not relevant to switch MAC learning." },
      { text: "The VLAN name configured on the switch", feedback: "VLAN names are administrative labels. MAC learning is based on frame headers, not VLAN names." }
    ],
    explanation: "When a switch receives a frame, it examines the source MAC address and the incoming port. It records this pair in its MAC address table: 'MAC X came in on port Y.' This is how switches learn the network topology and build their forwarding tables.",
    resources: {
      videoTopic: "MAC Address Learning in Switches"
    }
  },
  {
    id: 4,
    topic: "Layer 2 Switching",
    question: "Which condition is most likely to cause MAC address table instability?",
    options: [
      { text: "A host using DHCP", feedback: "DHCP affects IP addressing, not MAC addresses. MAC addresses remain stable regardless of DHCP." },
      { text: "A Layer 2 loop", feedback: "✓ Correct! A Layer 2 loop (created by redundant switch connections without spanning tree) causes frames to loop indefinitely. This creates constant MAC address table changes and instability. STP prevents this.", isCorrect: true },
      { text: "A valid default route", feedback: "Default routes are a routing concept and don't affect Layer 2 MAC tables." },
      { text: "A switch using a management IP address", feedback: "A management IP address is for administrative access and doesn't affect MAC learning." }
    ],
    explanation: "A Layer 2 loop occurs when there are multiple paths between switches without a mechanism to prevent loops. Frames recirculate, causing the same MAC addresses to appear on different ports constantly. Spanning Tree Protocol (STP) prevents loops by blocking redundant paths.",
    resources: {
      videoTopic: "Layer 2 Loops and Spanning Tree Protocol"
    }
  },
  {
    id: 5,
    topic: "Layer 2 Switching",
    question: "What does a VLAN logically separate?",
    options: [
      { text: "Collision domains only", feedback: "Switches already separate collision domains at Layer 1. VLANs go further by separating broadcast domains." },
      { text: "Broadcast domains", feedback: "✓ Correct! VLANs partition a switch into separate broadcast domains. Devices in different VLANs cannot communicate via Layer 2 broadcasts without a router.", isCorrect: true },
      { text: "TCP sessions", feedback: "TCP sessions are application-layer concerns, not related to VLANs." },
      { text: "Routing protocols only", feedback: "VLANs affect broadcast domains, not just routing protocols." }
    ],
    explanation: "A broadcast domain is the set of devices that receive each other's broadcast frames. By default, a switch is one large broadcast domain. VLANs divide the switch into multiple, isolated broadcast domains. Broadcasts from one VLAN don't reach other VLANs, which also reduces unnecessary traffic.",
    resources: {
      videoTopic: "VLANs and Broadcast Domains"
    }
  },

  // ===== VLANs & TRUNKS (Questions 6-10) =====
  {
    id: 6,
    topic: "VLANs & Trunks",
    question: "A host sends an ARP request in VLAN 20. Which devices should receive the broadcast?",
    options: [
      { text: "All devices on the switch", feedback: "VLANs restrict broadcasts to members of that VLAN only. Devices in other VLANs don't receive VLAN 20 broadcasts." },
      { text: "Only devices in VLAN 20, subject to normal switch forwarding rules", feedback: "✓ Correct! VLANs isolate broadcasts. ARP requests in VLAN 20 are seen only by devices configured in VLAN 20 (and potentially other switches if they have VLAN 20 ports).", isCorrect: true },
      { text: "Only devices outside VLAN 20", feedback: "This is backwards. VLAN 20 broadcasts stay within VLAN 20." },
      { text: "Only the default gateway", feedback: "The default gateway receives the ARP request, but so do all other devices in the VLAN." }
    ],
    explanation: "VLANs restrict the scope of broadcast frames. An ARP broadcast in VLAN 20 is tagged with VLAN ID 20 and is delivered only to ports assigned to VLAN 20. This containment reduces unnecessary broadcast traffic and improves network efficiency.",
    resources: {
      videoTopic: "VLANs and Broadcast Isolation"
    }
  },
  {
    id: 7,
    topic: "VLANs & Trunks",
    question: "What is the main purpose of an 802.1Q trunk?",
    options: [
      { text: "Carry traffic for multiple VLANs over one link", feedback: "✓ Correct! A trunk port uses 802.1Q tagging to carry frames from multiple VLANs on a single physical link between switches. This is essential for VLAN propagation.", isCorrect: true },
      { text: "Encrypt traffic between switches", feedback: "Trunks do not encrypt. They simply tag frames with VLAN IDs so both switches know which VLAN each frame belongs to." },
      { text: "Assign IP addresses to VLANs", feedback: "IP assignment is a router or DHCP server function, not a trunk function." },
      { text: "Prevent routing between subnets", feedback: "Trunks carry VLAN traffic; preventing routing is a router or ACL function." }
    ],
    explanation: "A trunk link uses 802.1Q VLAN tagging to send frames from multiple VLANs over a single physical connection. Each frame is tagged with its VLAN ID (a 12-bit field in the Ethernet header). The receiving switch reads the tag and forwards the frame to the correct VLAN ports.",
    resources: {
      videoTopic: "802.1Q Trunking and VLAN Tagging"
    }
  },
  {
    id: 8,
    topic: "VLANs & Trunks",
    question: "What is an access port typically used for?",
    options: [
      { text: "Carrying multiple tagged VLANs to another switch", feedback: "That's a trunk port function, not an access port. Access ports handle a single VLAN only." },
      { text: "Connecting an endpoint to a single untagged VLAN", feedback: "✓ Correct! Access ports connect end devices (computers, phones) to a single VLAN. The port sends and receives untagged frames on that VLAN.", isCorrect: true },
      { text: "Routing traffic between VRFs", feedback: "Routing and VRFs are handled by routers, not access ports." },
      { text: "Running a dynamic routing protocol", feedback: "Routing protocols run on routers, not on access ports." }
    ],
    explanation: "An access port is the standard way end devices connect to a switch. Each access port is assigned to one VLAN. Frames received on an access port are assumed to belong to that VLAN (no tag needed), and frames sent to the port are stripped of any VLAN tag before transmission to the device.",
    resources: {
      videoTopic: "Access Ports vs. Trunk Ports"
    }
  },
  {
    id: 9,
    topic: "VLANs & Trunks",
    question: "A trunk port carries VLANs 10, 20, and 30. A frame arrives tagged for VLAN 40, but VLAN 40 is not allowed on that trunk. What should happen?",
    options: [
      { text: "The frame should be forwarded as VLAN 1", feedback: "Frames tagged for non-allowed VLANs are dropped, not converted to VLAN 1." },
      { text: "The frame should be dropped or not forwarded on that trunk", feedback: "✓ Correct! Switch trunk configurations specify which VLANs are allowed. Frames tagged for non-allowed VLANs are discarded as a security and design measure.", isCorrect: true },
      { text: "The switch should rewrite the tag to VLAN 10", feedback: "Switches don't rewrite VLAN tags to different values; they drop the frame or pass it through based on the allowed VLAN list." },
      { text: "The switch should route the frame", feedback: "Switches don't route; they forward or drop frames based on VLAN membership." }
    ],
    explanation: "Each trunk port has an 'allowed VLAN list' that specifies which VLANs can traverse that link. Frames tagged with a VLAN not on the allowed list are dropped. This prevents unintended VLAN propagation and provides a layer of traffic control between switches.",
    resources: {
      videoTopic: "VLAN Allowed Lists and Trunk Configuration"
    }
  },
  {
    id: 10,
    topic: "VLANs & Trunks",
    question: "Two hosts are connected to the same switch but placed in different VLANs. No routing is configured. What is the expected result?",
    options: [
      { text: "They can communicate directly because they share a switch", feedback: "VLANs isolate broadcast domains. Hosts in different VLANs are in different broadcast domains and cannot communicate directly at Layer 2, even on the same switch." },
      { text: "They cannot communicate directly because they are in different broadcast domains", feedback: "✓ Correct! Each VLAN is a separate broadcast domain. Without a router to perform inter-VLAN routing, Layer 2 communication between VLANs is impossible.", isCorrect: true },
      { text: "They can communicate if both use the same MAC address", feedback: "MAC addresses cannot be reused. Additionally, VLAN isolation prevents Layer 2 communication regardless of MAC addresses." },
      { text: "They can communicate only if STP is disabled", feedback: "STP status has nothing to do with inter-VLAN communication. A router is required, not STP changes." }
    ],
    explanation: "VLANs create isolated broadcast domains. Hosts in different VLANs, even on the same physical switch, cannot send broadcast frames to each other. Layer 3 routing is required to enable communication between VLANs. A router examines the destination IP address and forwards the packet between the VLANs.",
    resources: {
      videoTopic: "Inter-VLAN Routing and Communication"
    }
  },

  // ===== SUBNETTING & IP ADDRESSING (Questions 11-16) =====
  {
    id: 11,
    topic: "Subnetting & IP Addressing",
    question: "Which subnet mask matches a /24 prefix?",
    options: [
      { text: "255.255.255.0", feedback: "✓ Correct! A /24 means the first 24 bits are the network. 255.255.255.0 in decimal represents 24 '1' bits followed by 8 '0' bits, giving 256 addresses per subnet.", isCorrect: true },
      { text: "255.255.255.128", feedback: "/25 uses this mask (25 network bits). This provides 128 addresses per subnet, not 256." },
      { text: "255.255.255.192", feedback: "/26 uses this mask (26 network bits). This provides 64 addresses per subnet." },
      { text: "255.255.0.0", feedback: "/16 uses this mask (16 network bits). This provides 65,536 addresses per subnet." }
    ],
    explanation: "CIDR notation (/XX) indicates how many bits form the network portion. /24 means 24 network bits and 8 host bits. In binary, this is 24 ones followed by 8 zeros: 11111111.11111111.11111111.00000000, which equals 255.255.255.0 in decimal.",
    resources: {
      videoTopic: "Subnet Masks and CIDR Notation"
    }
  },
  {
    id: 12,
    topic: "Subnetting & IP Addressing",
    question: "Which subnet mask matches a /30 prefix?",
    options: [
      { text: "255.255.255.0", feedback: "That's /24 (254 usable hosts). /30 provides only 4 addresses total." },
      { text: "255.255.255.248", feedback: "That's /29 (8 addresses per subnet). /30 is more restrictive." },
      { text: "255.255.255.252", feedback: "✓ Correct! /30 means 30 network bits and 2 host bits. In binary: ...11111100. This provides exactly 4 addresses (2 usable + 2 reserved), commonly used for point-to-point router links.", isCorrect: true },
      { text: "255.255.255.254", feedback: "That's /31 (2 addresses, used for special cases). /30 provides 4 addresses." }
    ],
    explanation: "A /30 subnet has 4 IP addresses: one network address, one broadcast address, and two usable host addresses. This is ideal for point-to-point links like router-to-router connections, where only two devices need to communicate.",
    resources: {
      videoTopic: "Subnetting with Small Networks (/30, /31)"
    }
  },
  {
    id: 13,
    topic: "Subnetting & IP Addressing",
    question: "A host has IP address 10.1.20.50/24. What is the network address?",
    options: [
      { text: "10.1.20.0", feedback: "✓ Correct! With /24, the first 24 bits are network, so the last 8 bits are host. Setting host bits to 0 gives the network address: 10.1.20.0.", isCorrect: true },
      { text: "10.1.20.1", feedback: "10.1.20.1 is the first usable host address, not the network address." },
      { text: "10.1.20.50", feedback: "This is the specific host address, not the network address." },
      { text: "10.1.255.0", feedback: "This would be a different network. The /24 mask applies only to the last octet." }
    ],
    explanation: "The network address is found by setting all host bits to 0. With /24, the first 24 bits (10.1.20) form the network, and the last 8 bits are host bits. Setting the last octet to 0 gives 10.1.20.0.",
    resources: {
      videoTopic: "Finding Network Addresses and Broadcast Addresses"
    }
  },
  {
    id: 14,
    topic: "Subnetting & IP Addressing",
    question: "A host is configured as 192.168.10.25/24 with default gateway 192.168.20.1. What is the problem?",
    options: [
      { text: "The host address is invalid", feedback: "192.168.10.25 is a valid host address in the 192.168.10.0/24 network." },
      { text: "The default gateway appears to be in a different subnet", feedback: "✓ Correct! The host is in 192.168.10.0/24, but the gateway 192.168.20.1 is in a different subnet (192.168.20.0). The gateway should be in the same subnet for local communication.", isCorrect: true },
      { text: "The subnet mask is too long", feedback: "/24 is a standard, appropriate subnet mask for this scenario." },
      { text: "The host must use a public IP address", feedback: "192.168.x.x is a private IP range; public addresses are not required." }
    ],
    explanation: "A host's default gateway must be in the same subnet as the host. The host uses the default gateway to communicate with distant networks. If the gateway is in a different subnet, the host cannot reach it via Layer 2, causing routing failures.",
    resources: {
      videoTopic: "Default Gateway Configuration and Subnet Matching"
    }
  },
  {
    id: 15,
    topic: "Subnetting & IP Addressing",
    question: "What is the broadcast address for 172.16.5.0/24?",
    options: [
      { text: "172.16.5.0", feedback: "172.16.5.0 is the network address, not the broadcast address. The broadcast address has all host bits set to 1." },
      { text: "172.16.5.1", feedback: "172.16.5.1 is the first usable host address, not the broadcast address." },
      { text: "172.16.5.254", feedback: "172.16.5.254 is the last usable host address, not the broadcast address." },
      { text: "172.16.5.255", feedback: "✓ Correct! The broadcast address has all host bits set to 1. With /24, setting the last octet to 255 gives 172.16.5.255.", isCorrect: true }
    ],
    explanation: "The broadcast address is found by setting all host bits to 1. For 172.16.5.0/24, the host portion is the last 8 bits. Setting them all to 1 (255) gives the broadcast address: 172.16.5.255.",
    resources: {
      videoTopic: "Broadcast Addresses and Subnetting"
    }
  },
  {
    id: 16,
    topic: "Subnetting & IP Addressing",
    question: "Which address is a valid host address in 10.10.10.0/29?",
    options: [
      { text: "10.10.10.0", feedback: "10.10.10.0 is the network address (all host bits 0), not a valid host address." },
      { text: "10.10.10.3", feedback: "✓ Correct! /29 provides 8 addresses: .0 (network), .1–.6 (usable hosts), .7 (broadcast). 10.10.10.3 is a valid host address.", isCorrect: true },
      { text: "10.10.10.7", feedback: "10.10.10.7 is the broadcast address (all host bits 1), not a valid host address." },
      { text: "10.10.10.8", feedback: "10.10.10.8 is outside the /29 subnet. The subnet spans .0–.7 only." }
    ],
    explanation: "A /29 subnet has 3 host bits, providing 8 total addresses. The range is 0–7, with .0 as network, .1–.6 as usable hosts, and .7 as broadcast. Valid host addresses are .1, .2, .3, .4, .5, and .6.",
    resources: {
      videoTopic: "Small Subnets and Usable Host Addresses"
    }
  },

  // ===== ARP & DEFAULT GATEWAY (Questions 17-20) =====
  {
    id: 17,
    topic: "ARP & Default Gateway",
    question: "What is ARP used for in IPv4 networks?",
    options: [
      { text: "Resolving an IP address to a MAC address on the local network", feedback: "✓ Correct! ARP (Address Resolution Protocol) maps an IPv4 address to a MAC address. It's essential for local network communication because switches need MAC addresses to forward frames.", isCorrect: true },
      { text: "Resolving a MAC address to a DNS name", feedback: "DNS resolves domain names to IP addresses, not the other way around. ARP is specifically IP-to-MAC." },
      { text: "Encrypting IP packets", feedback: "ARP doesn't encrypt. Encryption is handled by other protocols (IPsec, TLS, etc.)." },
      { text: "Selecting the best route through the network", feedback: "Routing protocol selection is done by routing algorithms, not ARP." }
    ],
    explanation: "ARP is a Layer 2/3 protocol that broadcasts a request asking 'Who has IP address X?' The device with that IP responds with its MAC address. This allows the sender to build a mapping and deliver Ethernet frames to the correct MAC address on the local network segment.",
    resources: {
      videoTopic: "Address Resolution Protocol (ARP)"
    }
  },
  {
    id: 18,
    topic: "ARP & Default Gateway",
    question: "A host wants to communicate with another host in the same subnet. What destination MAC address does it need?",
    options: [
      { text: "The MAC address of the local default gateway", feedback: "The gateway is not needed for same-subnet communication. Direct peer-to-peer communication uses the destination host's MAC." },
      { text: "The MAC address of the destination host", feedback: "✓ Correct! For same-subnet communication, the host sends the frame directly to the destination host's MAC address. ARP is used to discover that MAC address.", isCorrect: true },
      { text: "The broadcast MAC address for every packet", feedback: "Broadcasts are used for ARP requests, but unicast frames (not broadcasts) are sent to the specific destination MAC." },
      { text: "The MAC address of the DNS server", feedback: "DNS is for name resolution, not for same-subnet communication." }
    ],
    explanation: "When a host needs to communicate with another host in the same subnet, it uses ARP to find the destination host's MAC address. It then sends frames directly to that MAC. No gateway is needed because both devices are on the same local network.",
    resources: {
      videoTopic: "Same-Subnet vs. Different-Subnet Communication"
    }
  },
  {
    id: 19,
    topic: "ARP & Default Gateway",
    question: "A host wants to communicate with a server in a different subnet. What destination MAC address is used for the first Ethernet frame?",
    options: [
      { text: "The remote server's MAC address", feedback: "The host cannot reach the remote server's MAC directly; they're not on the same network. The host must go through the gateway." },
      { text: "The default gateway's MAC address", feedback: "✓ Correct! For different-subnet communication, the host sends the frame to the gateway's MAC address (via ARP). The gateway then routes the packet to the destination.", isCorrect: true },
      { text: "The DNS server's MAC address", feedback: "DNS is for domain name resolution, not for determining frame destinations." },
      { text: "The broadcast MAC address", feedback: "Broadcasts are used for ARP, but the actual data frame is unicast to the gateway." }
    ],
    explanation: "When a host needs to reach a different subnet, it recognizes this via the subnet mask comparison. It then sends the frame to the default gateway's MAC address (which it finds via ARP). The gateway receives the frame, examines the destination IP, and forwards it toward the remote server.",
    resources: {
      videoTopic: "Inter-Subnet Routing and Default Gateway"
    }
  },
  {
    id: 20,
    topic: "ARP & Default Gateway",
    question: "A ping to the local default gateway fails. Which issue is most likely?",
    options: [
      { text: "A remote routing issue", feedback: "If the gateway itself is unreachable, it's a local problem, not a remote routing issue." },
      { text: "A local VLAN, IP, gateway, interface, or Layer 1/2 problem", feedback: "✓ Correct! A failed ping to the default gateway indicates a Layer 1/2 problem (cable, port), a VLAN misconfiguration, an IP/subnet mismatch, or a gateway IP/configuration error. Start by checking local configuration.", isCorrect: true },
      { text: "A DNS issue only", feedback: "If you're pinging the gateway IP address directly (not a hostname), DNS is not the issue." },
      { text: "An application-layer issue only", feedback: "Ping is a Layer 3 ICMP tool; application-layer issues don't affect ping." }
    ],
    explanation: "The default gateway is a device on your local network. If you cannot ping it, the problem is local: check physical connections, VLAN configuration, IP address/subnet match, and gateway IP settings. Remote routing issues would not prevent reaching a local gateway.",
    resources: {
      videoTopic: "Troubleshooting Network Connectivity"
    }
  },

  // ===== ROUTING & VRF (Questions 21-28) =====
  {
    id: 21,
    topic: "Routing & VRF",
    question: "What is the primary purpose of a routing table?",
    options: [
      { text: "Store MAC addresses learned on switch ports", feedback: "That's the MAC address table (a switch function), not a routing table. Routers maintain routing tables." },
      { text: "Determine the next hop or outgoing interface for IP traffic", feedback: "✓ Correct! A routing table contains routes (destination + next hop or outgoing interface) that routers use to forward IP packets toward their destinations.", isCorrect: true },
      { text: "Assign VLAN IDs to switch ports", feedback: "VLAN assignment is a switch function, not a routing table function." },
      { text: "Encrypt packets between routers", feedback: "Encryption is handled by IPsec or other security protocols, not by the routing table." }
    ],
    explanation: "A routing table is a data structure on a router that maps destination IP prefixes to outgoing interfaces or next-hop routers. When a router receives a packet, it looks up the destination IP in the routing table to decide where to forward it next.",
    resources: {
      videoTopic: "Routing Tables and Route Lookup"
    }
  },
  {
    id: 22,
    topic: "Routing & VRF",
    question: "Which route is used when no more specific route matches a destination?",
    options: [
      { text: "Connected route", feedback: "Connected routes are for directly attached networks, not a fallback for all unmatched traffic." },
      { text: "Host route", feedback: "Host routes (/32) are very specific, not a general fallback." },
      { text: "Default route", feedback: "✓ Correct! The default route (0.0.0.0/0) matches any destination not covered by more specific routes. It's the 'catch-all' route.", isCorrect: true },
      { text: "Loopback route", feedback: "Loopback addresses are for device management, not for handling unmatched traffic." }
    ],
    explanation: "The default route (0.0.0.0/0) has the least specific prefix and matches all possible IP addresses. Routers use longest prefix matching: the most specific matching route is used. If no other route matches, the default route is selected.",
    resources: {
      videoTopic: "Default Route and Route Matching"
    }
  },
  {
    id: 23,
    topic: "Routing & VRF",
    question: "A route to 10.20.30.0/24 and a route to 10.20.30.50/32 both exist. Which route is used for traffic to 10.20.30.50?",
    options: [
      { text: "10.20.30.0/24", feedback: "Both routes match, but /32 is more specific. Routers use longest prefix matching, so /32 wins." },
      { text: "10.20.30.50/32", feedback: "✓ Correct! The /32 route is more specific (matches only one IP) than the /24 route. Routers use longest prefix matching: the most specific route wins.", isCorrect: true },
      { text: "The default route", feedback: "The default route is only used if no other route matches. Both /24 and /32 match here." },
      { text: "The route with the lower VLAN ID", feedback: "VLAN IDs don't determine route selection; longest prefix match does." }
    ],
    explanation: "Routers use longest prefix matching to select routes. A /32 prefix is longer (more specific) than a /24 prefix. When multiple routes match a destination, the router selects the one with the longest matching prefix (most specific).",
    resources: {
      videoTopic: "Longest Prefix Matching and Route Selection"
    }
  },
  {
    id: 24,
    topic: "Routing & VRF",
    question: "Which command would commonly help verify IP reachability to another device?",
    options: [
      { text: "ping", feedback: "✓ Correct! The ping command sends ICMP echo requests to test Layer 3 reachability and round-trip time to a destination.", isCorrect: true },
      { text: "show vlan members", feedback: "This command shows VLAN membership information, not IP reachability." },
      { text: "configure terminal", feedback: "This enters configuration mode; it doesn't verify reachability." },
      { text: "save configuration", feedback: "This saves the running configuration; it doesn't test reachability." }
    ],
    explanation: "Ping is a basic troubleshooting tool that sends ICMP Echo Request packets to a destination and waits for Echo Reply. If a reply is received, the destination is reachable at Layer 3. Ping also measures round-trip time (latency).",
    resources: {
      videoTopic: "Ping and Basic Troubleshooting Tools"
    }
  },
  {
    id: 25,
    topic: "Routing & VRF",
    question: "What does a connected route usually represent?",
    options: [
      { text: "A route learned from DNS", feedback: "DNS doesn't create routing table entries. Connected routes are created by interface configuration." },
      { text: "A network directly attached to a local routed interface", feedback: "✓ Correct! A connected route is automatically created when you configure an IP address on an interface. It represents networks directly reachable on that interface (same subnet).", isCorrect: true },
      { text: "A route learned from a remote MAC table", feedback: "Routing tables don't learn from MAC tables. Connected routes are based on interface IP configuration." },
      { text: "A route created by a trunk port", feedback: "Trunk ports carry multiple VLANs but don't create routing table entries." }
    ],
    explanation: "When a router has an interface configured with an IP address (e.g., 192.168.1.1/24), it automatically learns that the 192.168.1.0/24 network is directly attached to that interface. This creates a connected route, which allows the router to forward packets destined for that subnet directly out that interface.",
    resources: {
      videoTopic: "Connected Routes and Interface Configuration"
    }
  },
  {
    id: 26,
    topic: "Routing & VRF",
    question: "What is the main purpose of a VRF?",
    options: [
      { text: "Separate routing tables on the same device", feedback: "✓ Correct! A VRF (Virtual Routing and Forwarding) creates logically separate routing tables and routing processes on a single physical router. This allows multiple 'virtual' routers on one device.", isCorrect: true },
      { text: "Combine all VLANs into one broadcast domain", feedback: "VRFs separate traffic, not combine it. That would defeat the purpose." },
      { text: "Replace MAC learning", feedback: "VRFs are a routing concept. MAC learning (at Layer 2) is unaffected." },
      { text: "Disable routing between interfaces", feedback: "VRFs enable selective routing, not disable it. Routers in different VRFs don't communicate by default." }
    ],
    explanation: "A VRF creates isolated routing contexts. Each VRF has its own routing table, routing protocols, and forwarding paths. This is useful for multi-tenant networks (e.g., a service provider offering MPLS VPNs to different customers) or internal network segmentation.",
    resources: {
      videoTopic: "Virtual Routing and Forwarding (VRF)"
    }
  },
  {
    id: 27,
    topic: "Routing & VRF",
    question: "Two interfaces are in different VRFs. What should you assume by default?",
    options: [
      { text: "They automatically share routes", feedback: "Different VRFs are isolated. Routes are not shared unless you explicitly configure route leaking." },
      { text: "They are isolated unless route leaking or another connection method is configured", feedback: "✓ Correct! VRFs are designed to isolate traffic. Interfaces in different VRFs cannot communicate unless you explicitly configure route redistribution or leaking.", isCorrect: true },
      { text: "They are in the same broadcast domain", feedback: "VRFs isolate both routing and broadcast domains." },
      { text: "They must use the same VLAN ID", feedback: "VRF and VLAN are separate concepts. Interfaces in different VRFs can be in the same VLAN (though unusual)." }
    ],
    explanation: "VRFs are separate routing domains. By default, a packet from one VRF cannot reach another VRF's network unless routes are explicitly shared via route leaking or redistribution. This isolation is the primary benefit of VRFs.",
    resources: {
      videoTopic: "VRF Isolation and Route Leaking"
    }
  },
  {
    id: 28,
    topic: "Routing & VRF",
    question: "Why can the same IP subnet sometimes exist in two different VRFs?",
    options: [
      { text: "Because VRFs maintain separate routing tables", feedback: "✓ Correct! Each VRF has its own routing table. The same IP subnet in different VRFs creates no conflict because each VRF's routing is independent. This is useful in multi-tenant networks.", isCorrect: true },
      { text: "Because VLANs disable routing", feedback: "VLANs don't disable routing. This is a VRF property, not VLAN-related." },
      { text: "Because ARP prevents overlap", feedback: "ARP operates at Layer 2 and doesn't prevent IP overlaps. VRF separation does." },
      { text: "Because default gateways are not required", feedback: "Default gateways are still used in VRFs. The separation is handled by the VRF mechanism." }
    ],
    explanation: "VRFs maintain separate routing tables. The same subnet (e.g., 10.1.0.0/16) can exist in VRF-A and VRF-B without conflict. Packets are forwarded based on both the destination IP and the VRF they're in. This is common in multi-tenant architectures.",
    resources: {
      videoTopic: "VRF IP Address Overlapping"
    }
  },

  // ===== CLI & TROUBLESHOOTING (Questions 29-32) =====
  {
    id: 29,
    topic: "CLI & Troubleshooting",
    question: "In many network CLIs, what does the question mark help feature typically show?",
    options: [
      { text: "MAC address age time", feedback: "MAC address age is shown by specific commands like 'show mac-address-table age-time', not by the help feature." },
      { text: "Available commands or valid command options", feedback: "✓ Correct! Typing '?' in a CLI context shows available commands at that prompt level or valid options for the current command. This is a universal help mechanism.", isCorrect: true },
      { text: "The default gateway", feedback: "The default gateway is shown by routing or interface configuration commands, not by '?'." },
      { text: "The routing table only", feedback: "'?' provides context-sensitive help, not just the routing table." }
    ],
    explanation: "The '?' character is a CLI help tool. Context-sensitive '?' shows available commands, command options, parameters, and syntax. For example, typing 'show ?' shows available show subcommands; 'show ip route ?' shows options for the route command.",
    resources: {
      videoTopic: "CLI Navigation and Help Features"
    }
  },
  {
    id: 30,
    topic: "CLI & Troubleshooting",
    question: "What is the safest first troubleshooting step when a link-based adjacency or neighbor relationship is down?",
    options: [
      { text: "Reconfigure the routing protocol immediately", feedback: "Before changing configuration, verify the underlying physical/interface status. Routing protocol issues are secondary." },
      { text: "Verify physical link state and interface status first", feedback: "✓ Correct! Always start with the physical layer (cables, plugs, port status). If the link itself is down, protocols built on top of it will fail. Check Layer 1 before moving to Layer 3.", isCorrect: true },
      { text: "Delete all VLANs and recreate them", feedback: "Don't make drastic changes without understanding the root cause first." },
      { text: "Change the device hostname", feedback: "The hostname is unrelated to link or adjacency issues." }
    ],
    explanation: "The OSI model recommends troubleshooting from the bottom up. A neighbor relationship failure is often caused by a physical link issue (bad cable, disabled port, SFP mismatch). Always verify Layer 1 (physical) and Layer 2 (interface status) before investigating higher-layer protocols.",
    resources: {
      videoTopic: "Systematic Troubleshooting Using the OSI Model"
    }
  },
  {
    id: 31,
    topic: "CLI & Troubleshooting",
    question: "Which troubleshooting order is generally most efficient for connectivity problems?",
    options: [
      { text: "Application, transport, routing, VLAN, physical", feedback: "This is backwards. Start from the physical layer and work up, not down." },
      { text: "Physical, interface, VLAN, IP addressing, routing", feedback: "✓ Correct! This follows the OSI model bottom-up: verify physical connectivity, interface status, VLAN membership, IP configuration, and finally routing. This is the most efficient order.", isCorrect: true },
      { text: "DNS, application, password, hostname", feedback: "These are too high-level. Start with the physical layer first." },
      { text: "Save config, reboot, replace hardware", feedback: "Don't make changes until you've diagnosed the problem." }
    ],
    explanation: "Systematic troubleshooting using the OSI model (bottom-up) is most efficient: (1) Physical layer – cables, ports, (2) Link layer – VLANs, MAC, (3) Network layer – IP, routing, (4) Transport+ – TCP/UDP, applications. This prevents wasted time chasing high-level issues when the foundation is broken.",
    resources: {
      videoTopic: "Systematic Troubleshooting and the OSI Model"
    }
  },
  {
    id: 32,
    topic: "CLI & Troubleshooting",
    question: "What does saving configuration typically accomplish on a network device?",
    options: [
      { text: "Verifies DNS resolution", feedback: "DNS verification is unrelated to configuration saving. DNS is a service, not a persistence mechanism." },
      { text: "Persists the current configuration so it can survive reload", feedback: "✓ Correct! Saving configuration (e.g., 'copy running-config startup-config' in Cisco) writes the active configuration to persistent storage. Without saving, changes are lost on reboot.", isCorrect: true },
      { text: "Clears the MAC address table", feedback: "Saving configuration doesn't clear learned MAC addresses." },
      { text: "Enables all ports by default", feedback: "Saving configuration doesn't change port states." }
    ],
    explanation: "Network devices have two types of configuration: running-config (in RAM, active now) and startup-config (in persistent storage, loaded on boot). Saving copies the running-config to startup-config. Without saving, configuration changes are lost when the device reboots.",
    resources: {
      videoTopic: "Configuration Persistence and Reloading"
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
