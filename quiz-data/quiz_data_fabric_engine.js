// Fabric Engine In-Class Quiz Data
// Questions organized by presentation section

const quizData = [
  // ===== INSTALLATION SECTION =====
  {
    id: 1,
    topic: "OS Naming",
    section: "Installation",
    question: "Starting with which release did VOSS get renamed to Fabric Engine, and on what hardware does that apply?",
    options: [
      { text: "Release 8.6, and only on universal hardware — non-universal hardware continues to run VOSS", feedback: "Correct! Beginning with 8.6, universal hardware runs Fabric Engine, while non-universal hardware keeps the VOSS name.", isCorrect: true },
      { text: "Release 8.6, applied to every VOSS-capable platform without exception", feedback: "The rename was hardware-specific — non-universal hardware continues to use the VOSS name.", isCorrect: false },
      { text: "Release 9.3, applied only to VSP8600 hardware", feedback: "The rename took effect starting with release 8.6, and VSP8600 is tracked separately in release recommendations.", isCorrect: false },
      { text: "There was never a rename; VOSS and Fabric Engine are two unrelated products", feedback: "Fabric Engine is the renamed continuation of VOSS on universal hardware, not a separate product line.", isCorrect: false }
    ],
    explanation: "Beginning with version 8.6, the network operating system name changed from VOSS to Fabric Engine on universal hardware; non-universal hardware continues to run VOSS.",
    resources: {
      videoTopic: "Fabric Engine and VOSS Naming"
    }
  },
  {
    id: 2,
    topic: "Zero-Touch Onboarding",
    section: "Installation",
    question: "What deployment capability does Fabric Connect provide that reduces manual onboarding effort?",
    options: [
      { text: "A cloud-only management model with no local fabric formation capability", feedback: "The fabric itself forms and provisions on its own; this isn't solely a cloud management feature.", isCorrect: false },
      { text: "Self-forming, self-provisioning fabric with zero-touch onboarding and auto-sensing", feedback: "Correct! Fabric Connect is designed to form and provision itself automatically, minimizing manual per-device setup.", isCorrect: true },
      { text: "A requirement to manually configure IS-IS on every node before it can join the fabric", feedback: "That would defeat the purpose — Fabric Connect is designed to reduce this kind of manual per-node work.", isCorrect: false },
      { text: "Mandatory factory pre-staging of every switch before shipment", feedback: "No factory pre-staging step is required; onboarding happens automatically once deployed.", isCorrect: false }
    ],
    explanation: "Fabric Connect is positioned as a self-forming, self-provisioning solution with zero-touch onboarding and auto-sensing, accelerating deployment across campus, branch, SD-WAN, and data center use cases.",
    resources: {
      videoTopic: "Fabric Connect Deployment Model"
    }
  },
  {
    id: 3,
    topic: "Quick SPBM Setup",
    section: "Installation",
    question: "What does the run spbm CLI script accomplish during initial Fabric Connect setup?",
    options: [
      { text: "It permanently disables IS-IS on the switch", feedback: "run spbm enables IS-IS as part of its setup — it doesn't disable it.", isCorrect: false },
      { text: "It removes all existing VLANs from the switch", feedback: "run spbm creates the backbone VLANs needed for SPBM; it doesn't strip out existing VLANs.", isCorrect: false },
      { text: "It configures the SPB Ethertype, creates an SPB instance and backbone VLANs, adds a nickname, creates a manual area, and enables IS-IS globally and on an interface", feedback: "Correct! run spbm automates this whole sequence of SPB and IS-IS setup steps in one script.", isCorrect: true },
      { text: "It only changes the switch's hostname", feedback: "Hostname changes are unrelated to what run spbm configures — it sets up the SPB and IS-IS infrastructure.", isCorrect: false }
    ],
    explanation: "The run spbm command quickly configures the SPB Ethertype, creates an SPB instance, creates primary and secondary SPBM backbone VLANs and associates them with the instance, adds an SPB nickname, creates a manual area, enables IS-IS on an interface and globally, and configures the IS-IS system name and system ID.",
    resources: {
      videoTopic: "Quick SPBM Configuration"
    }
  },
  {
    id: 4,
    topic: "EDM SPBM Configuration",
    section: "Installation",
    question: "In Enterprise Device Manager (EDM), what is the correct navigation path to configure SPBM on an interface?",
    options: [
      { text: "Configuration > VLAN > Basic > Insert", feedback: "That path is for basic VLAN creation, not SPBM interface configuration.", isCorrect: false },
      { text: "Configuration > Security > Access Policies > Insert", feedback: "That's the security/access policy area, unrelated to SPBM interface setup.", isCorrect: false },
      { text: "Configuration > QoS > Policy > Insert", feedback: "QoS policy configuration is a separate section from SPBM/IS-IS interface setup.", isCorrect: false },
      { text: "Configuration > Fabric > IS-IS > Interfaces tab > select interface > SPBM > Interfaces SPBM tab > Insert > enter SPBM ID > Insert", feedback: "Correct! This matches the documented EDM procedure for enabling SPBM on an interface.", isCorrect: true }
    ],
    explanation: "To configure SPBM on an interface in EDM, navigate to Configuration > Fabric > IS-IS > Interfaces tab, select the interface, go to SPBM > Interfaces SPBM tab, click Insert, enter the SPBM ID, and click Insert again.",
    resources: {
      videoTopic: "EDM SPBM Interface Setup"
    }
  },
  {
    id: 5,
    topic: "spbm-config-mode Caveat",
    section: "Installation",
    question: "What must you verify before enabling spbm-config-mode on a Fabric Engine switch?",
    options: [
      { text: "The configuration must not include reserved ports, or the switch may stop loading its configuration after restart", feedback: "Correct! Reserved ports left in the configuration before enabling this mode can prevent the config from loading on the next restart.", isCorrect: true },
      { text: "All VLANs must first be deleted from the switch", feedback: "Deleting VLANs isn't the documented prerequisite — the concern is specifically about reserved ports.", isCorrect: false },
      { text: "The switch must already have at least one IS-IS adjacency formed", feedback: "An existing adjacency isn't a prerequisite; the caveat concerns reserved ports in the configuration.", isCorrect: false },
      { text: "PoE must be disabled on all ports", feedback: "PoE state has no documented relationship to enabling spbm-config-mode.", isCorrect: false }
    ],
    explanation: "Before enabling spbm-config-mode, you must ensure the configuration does not include reserved ports; otherwise, after a restart, the switch may stop loading the configuration.",
    resources: {
      videoTopic: "SPBM Config Mode Prerequisites"
    }
  },
  {
    id: 6,
    topic: "CLI Configuration Basics",
    section: "Installation",
    question: "What is the correct starting command sequence to enter global configuration mode on a Fabric Engine CLI?",
    options: [
      { text: "show isis, then configure terminal", feedback: "show isis is a diagnostic command and isn't part of entering configuration mode.", isCorrect: false },
      { text: "enable, then configure terminal", feedback: "Correct! You first enter privileged mode with enable, then enter global configuration mode with configure terminal.", isCorrect: true },
      { text: "configure terminal, then enable", feedback: "The order is reversed — you must reach privileged mode with enable before configure terminal is available.", isCorrect: false },
      { text: "run spbm, then enable", feedback: "run spbm is a setup script that runs after you're already in the appropriate configuration context, not the entry point to config mode.", isCorrect: false }
    ],
    explanation: "As with the broader CLI configuration model, you begin with enable to reach privileged exec mode, then use configure terminal to enter global configuration mode before configuring SPBM and IS-IS settings.",
    resources: {
      videoTopic: "Fabric Engine CLI Basics"
    }
  },

  // ===== CONFIGURATION SECTION =====
  {
    id: 7,
    topic: "Backbone VLAN Consistency",
    section: "Configuration",
    question: "Why must the primary and secondary backbone VLANs (B-VLANs) match across all nodes in an SPBM fabric?",
    options: [
      { text: "Matching B-VLANs is only a cosmetic naming convention with no functional effect", feedback: "It has real functional impact — inconsistent B-VLANs disrupt IS-IS adjacency formation and the SPBM topology.", isCorrect: false },
      { text: "B-VLANs only need to match between directly cabled neighbor switches, not the whole fabric", feedback: "Consistency is required across the entire SPBM domain, not just between direct neighbors.", isCorrect: false },
      { text: "Because IS-IS adjacencies and the SPBM topology depend on consistent B-VLAN membership across the fabric", feedback: "Correct! Mismatched B-VLANs between nodes are a documented cause of adjacency and topology problems.", isCorrect: true },
      { text: "They don't need to match; each node can use different B-VLANs independently", feedback: "Mismatched B-VLANs across nodes are explicitly called out as a cause of adjacency failures.", isCorrect: false }
    ],
    explanation: "Primary and secondary backbone VLANs must be configured identically across all SPBM nodes; NNI ports automatically become members of the backbone VLANs, and mismatches are a documented cause of adjacency and topology issues.",
    resources: {
      videoTopic: "SPBM Backbone VLAN Design"
    }
  },
  {
    id: 8,
    topic: "NNI Port Behavior",
    section: "Configuration",
    question: "What happens to NNI (network-to-network interface) ports with respect to backbone VLANs in an SPBM fabric?",
    options: [
      { text: "They must be manually added to backbone VLANs one at a time, with no automation available", feedback: "This is actually automatic — NNI ports join the backbone VLANs without manual per-port VLAN assignment.", isCorrect: false },
      { text: "They are excluded from all VLANs by design", feedback: "NNI ports aren't excluded from VLANs — they're automatically added to the backbone VLANs.", isCorrect: false },
      { text: "They only join backbone VLANs after a full switch reboot", feedback: "No reboot is required — NNI ports join backbone VLANs automatically as part of normal SPBM operation.", isCorrect: false },
      { text: "They automatically become members of the backbone VLANs", feedback: "Correct! NNI ports are automatically added to the configured backbone VLANs as part of SPBM operation.", isCorrect: true }
    ],
    explanation: "As part of SPBM configuration, NNI ports automatically become members of the configured backbone VLANs, which is why consistent B-VLAN configuration across nodes matters for adjacency formation.",
    resources: {
      videoTopic: "NNI Port and Backbone VLAN Behavior"
    }
  },
  {
    id: 9,
    topic: "VRF Platform Limitations",
    section: "Configuration",
    question: "Which statement correctly describes a documented VRF limitation on Fabric Engine hardware?",
    options: [
      { text: "The 4220 Series supports only a single active VRF with IP configuration", feedback: "Correct! This is a documented platform-specific VRF limitation for the 4220 Series.", isCorrect: true },
      { text: "Every Fabric Engine platform supports unlimited VRFs with IP configuration", feedback: "VRF support with IP configuration varies by platform — some models have explicit limits.", isCorrect: false },
      { text: "VRFs are not supported at all on any Fabric Engine platform", feedback: "VRFs are supported; the nuance is that IP-configured VRF support varies and is limited on certain platforms.", isCorrect: false },
      { text: "The 5320 Series supports multiple VRFs with IP configuration on every model in the family", feedback: "Multiple VRFs with IP configuration on the 5320 Series are supported only on specific models, not the entire family.", isCorrect: false }
    ],
    explanation: "VRF support with IP configuration is platform- and release-dependent: the 4220 Series supports only a single active VRF with IP configuration, while the 5320 Series supports multiple VRFs with IP configuration only on specific models (such as the 5320-16P-2MXT-2X, 5320-24T-4X-XT, 5320-24T-24S-4XE-XT, 5320-48P-8XE, and 5320-48T-8XE).",
    resources: {
      videoTopic: "VRF Platform Support"
    }
  },
  {
    id: 10,
    topic: "IP Shortcuts",
    section: "Configuration",
    question: "What is the relationship between IPv4 and IPv6 Shortcuts in Fabric Connect?",
    options: [
      { text: "Only one of the two can ever be enabled on a given fabric", feedback: "Both can be used together — IPv6 Shortcuts simply require IPv4 Shortcuts as a foundation, not exclusivity.", isCorrect: false },
      { text: "IPv6 Shortcuts depend on IPv4 Shortcuts being configured", feedback: "Correct! IPv6 Shortcuts require IPv4 Shortcuts as a prerequisite in Fabric Connect.", isCorrect: true },
      { text: "IPv4 Shortcuts depend on IPv6 Shortcuts being configured first", feedback: "The dependency runs the other direction — IPv6 Shortcuts depend on IPv4 Shortcuts, not vice versa.", isCorrect: false },
      { text: "They are fully independent features with no configuration dependency", feedback: "There is a documented dependency: IPv6 Shortcuts rely on IPv4 Shortcuts being enabled.", isCorrect: false }
    ],
    explanation: "Fabric Connect supports both IPv4 and IPv6 Shortcuts, but IPv6 Shortcut routing depends on IPv4 Shortcuts being configured; support for both varies by platform and software release.",
    resources: {
      videoTopic: "IP Shortcuts Configuration"
    }
  },
  {
    id: 11,
    topic: "Layer 3 Services Location",
    section: "Configuration",
    question: "Where is IP Shortcuts configuration documented within the Fabric Engine User Guide's feature structure?",
    options: [
      { text: "Under wireless access point provisioning", feedback: "IP Shortcuts is a wired fabric routing feature, unrelated to wireless AP provisioning.", isCorrect: false },
      { text: "Under system logging and SNMP configuration", feedback: "Logging and SNMP are management/monitoring topics, not where IP Shortcuts is documented.", isCorrect: false },
      { text: "Under the Fabric Layer 3 Services section", feedback: "Correct! IP Shortcuts configuration is covered as part of Fabric Layer 3 Services.", isCorrect: true },
      { text: "Under basic port configuration alongside speed and duplex", feedback: "Speed and duplex are Layer 1 physical settings — IP Shortcuts is a Layer 3 fabric feature.", isCorrect: false }
    ],
    explanation: "The Fabric Engine User Guide documents IP Shortcuts configuration within the Fabric Layer 3 Services section, reflecting its role in providing IP routing shortcuts across the SPBM fabric.",
    resources: {
      videoTopic: "Fabric Layer 3 Services"
    }
  },
  {
    id: 12,
    topic: "SPBM Instance Attributes",
    section: "Configuration",
    question: "Which set of attributes does show isis spbm display about a configured SPBM instance?",
    options: [
      { text: "Only the switch's uptime and CPU utilization", feedback: "Uptime and CPU utilization are system health metrics, not what show isis spbm reports.", isCorrect: false },
      { text: "PoE power budget and power class per port", feedback: "PoE power details are unrelated to SPBM instance information.", isCorrect: false },
      { text: "The switch's local user account list", feedback: "User accounts are an administrative detail, not part of SPBM instance status.", isCorrect: false },
      { text: "SPBM instance, B-VID, primary VLAN, nickname, LSDB trap status, and IP/IPv6 shortcut status", feedback: "Correct! show isis spbm summarizes these key SPBM instance attributes in one place.", isCorrect: true }
    ],
    explanation: "show isis spbm displays IS-IS SPBM-related information for a configured instance, including the SPBM instance number, B-VID, primary VLAN, nickname, LSDB trap status, and IP/IPv6 shortcut status.",
    resources: {
      videoTopic: "SPBM Instance Verification"
    }
  },

  // ===== TROUBLESHOOTING SECTION =====
  {
    id: 13,
    topic: "Adjacency Not Forming",
    section: "Troubleshooting",
    question: "An IS-IS adjacency is not forming between two SPBM nodes. Which set of checks reflects the documented first steps?",
    options: [
      { text: "Confirm SPBM and IS-IS are enabled, verify B-VLAN configuration and port assignment, and ensure primary/secondary backbone VLANs match on all nodes", feedback: "Correct! These are the documented first checks for a failed IS-IS adjacency in an SPBM fabric.", isCorrect: true },
      { text: "Immediately replace the switch hardware", feedback: "Hardware replacement is not a documented first step — configuration and enablement checks come first.", isCorrect: false },
      { text: "Reformat the switch's flash storage", feedback: "This is a drastic, undocumented action for an adjacency issue and risks data loss with no diagnostic benefit.", isCorrect: false },
      { text: "Disable IS-IS permanently on both switches", feedback: "Disabling IS-IS would prevent the adjacency from ever forming — the documented approach is to verify enablement and configuration, not disable it.", isCorrect: false }
    ],
    explanation: "When an IS-IS adjacency fails to form on an SPBM fabric, documented guidance is to verify that SPBM and IS-IS are enabled, check the B-VLAN configuration and port assignments, and confirm the primary and secondary backbone VLANs match across nodes.",
    resources: {
      videoTopic: "IS-IS Adjacency Troubleshooting"
    }
  },
  {
    id: 14,
    topic: "MTU Mismatch",
    section: "Troubleshooting",
    question: "What system MTU value should match across fabric switches to avoid IS-IS adjacency problems, and why does a mismatch matter?",
    options: [
      { text: "MTU only matters for management traffic, not IS-IS control traffic", feedback: "MTU mismatches are documented as directly impacting IS-IS control-plane adjacency, not just management traffic.", isCorrect: false },
      { text: "1950 — a mismatched system MTU across fabric switches is a documented cause of adjacency failure", feedback: "Correct! The system MTU should be 1950 across fabric nodes; a mismatch is called out as a specific root cause for adjacency issues.", isCorrect: true },
      { text: "1500 — MTU has no effect on IS-IS adjacency formation", feedback: "MTU does affect adjacency formation, and the documented value for fabric switches is 1950, not the standard Ethernet 1500.", isCorrect: false },
      { text: "9000 — jumbo frames are mandatory for any IS-IS adjacency", feedback: "9000 is not the documented value; the specific system MTU called out for SPBM fabric switches is 1950.", isCorrect: false }
    ],
    explanation: "A common cause of IS-IS adjacency failure when SPBM and IS-IS are already enabled correctly is a system MTU mismatch across fabric switches; the system MTU should be set to 1950.",
    resources: {
      videoTopic: "System MTU and IS-IS"
    }
  },
  {
    id: 15,
    topic: "IS-IS Authentication",
    section: "Troubleshooting",
    question: "Besides MTU mismatch, what other configuration issue is documented as a cause of IS-IS adjacencies failing to form?",
    options: [
      { text: "Using a non-default hostname on the switch", feedback: "Hostname choice doesn't affect IS-IS adjacency formation.", isCorrect: false },
      { text: "Running the switch with PoE enabled", feedback: "PoE state on a switch has no documented relationship to IS-IS adjacency formation.", isCorrect: false },
      { text: "IS-IS authentication that is misconfigured or prohibiting the adjacency", feedback: "Correct! Authentication mismatches between neighbors are a documented cause of failed adjacencies.", isCorrect: true },
      { text: "Having more than 10 VLANs configured on the switch", feedback: "VLAN count on the switch isn't a documented cause of IS-IS adjacency failure.", isCorrect: false }
    ],
    explanation: "In addition to system MTU mismatches, IS-IS authentication that is misconfigured or actively prohibiting the adjacency is documented as another cause of adjacency failures between SPBM nodes.",
    resources: {
      videoTopic: "IS-IS Authentication Issues"
    }
  },
  {
    id: 16,
    topic: "Link State Database",
    section: "Troubleshooting",
    question: "Which command would you use to inspect the IS-IS link state database when troubleshooting SPBM topology issues?",
    options: [
      { text: "show isis spbm nick-name", feedback: "That command focuses on nickname assignment, not the full link state database.", isCorrect: false },
      { text: "show sys mtu", feedback: "show sys mtu reports the system MTU setting, not link state database contents.", isCorrect: false },
      { text: "show vlan", feedback: "show vlan is a Layer 2 VLAN command and doesn't show the IS-IS link state database.", isCorrect: false },
      { text: "show isis lsdb", feedback: "Correct! show isis lsdb displays the link state database used to build the SPBM topology.", isCorrect: true }
    ],
    explanation: "show isis lsdb displays the IS-IS link state database, which is useful for verifying topology information distributed across the SPBM fabric; show isis lsdb tlv 184 detail can drill further into specific SPBM TLV data.",
    resources: {
      videoTopic: "IS-IS Link State Database"
    }
  },
  {
    id: 17,
    topic: "Nickname Verification",
    section: "Troubleshooting",
    question: "What would you check with show isis spbm nick-name, and why does it matter?",
    options: [
      { text: "It verifies SPBM nickname assignments; duplicate nicknames across nodes can cause fabric conflicts", feedback: "Correct! Each SPBM node needs a unique nickname, and this command helps confirm that assignment.", isCorrect: true },
      { text: "It shows the switch's DNS hostname resolution", feedback: "DNS hostname resolution is unrelated — SPBM nicknames are a separate fabric identifier used in IS-IS.", isCorrect: false },
      { text: "It configures a new VLAN nickname for VLAN naming purposes", feedback: "This is a show (verification) command, and SPBM nicknames identify fabric nodes, not VLANs.", isCorrect: false },
      { text: "It reports PoE port nicknames used for cable labeling", feedback: "PoE and cable labeling have no relationship to SPBM nicknames, which are fabric node identifiers.", isCorrect: false }
    ],
    explanation: "show isis spbm nick-name lets you verify the SPBM nickname assigned to a node; since each node in the fabric needs a unique nickname, checking this helps rule out conflicts as a cause of fabric issues.",
    resources: {
      videoTopic: "SPBM Nickname Troubleshooting"
    }
  },
  {
    id: 18,
    topic: "Debugging Adjacency Formation",
    section: "Troubleshooting",
    question: "Which command provides debug-level detail specifically for SPBM IS-IS adjacency troubleshooting?",
    options: [
      { text: "show tech-support", feedback: "show tech-support is a broad diagnostic bundle on Switch Engine devices; it isn't the targeted SPBM adjacency debug command.", isCorrect: false },
      { text: "show debug spbm isis adj", feedback: "Correct! This command surfaces debug information focused specifically on SPBM IS-IS adjacency formation.", isCorrect: true },
      { text: "show isis spbm unicast-fib vlan 4052", feedback: "That command inspects the unicast FIB for a specific VLAN, not adjacency debug detail.", isCorrect: false },
      { text: "show power controller", feedback: "That's a PoE hardware command, unrelated to IS-IS adjacency debugging.", isCorrect: false }
    ],
    explanation: "show debug spbm isis adj displays debug information specific to SPBM IS-IS adjacency configuration, helping isolate why an adjacency between two nodes is not forming.",
    resources: {
      videoTopic: "SPBM Adjacency Debugging"
    }
  },
  {
    id: 19,
    topic: "Unicast FIB Verification",
    section: "Troubleshooting",
    question: "What would show isis spbm unicast-fib vlan <vlan-id> help you verify?",
    options: [
      { text: "The list of administrative users allowed to manage that VLAN", feedback: "User administration is a separate topic from SPBM unicast forwarding data.", isCorrect: false },
      { text: "The physical cable type connected to VLAN member ports", feedback: "Cable type is a Layer 1 physical detail, not something reported by a unicast FIB command.", isCorrect: false },
      { text: "The unicast forwarding information for a specific VLAN as computed by the SPBM topology", feedback: "Correct! This command lets you confirm how traffic for a given VLAN is being forwarded across the fabric.", isCorrect: true },
      { text: "The number of PoE watts allocated to ports in that VLAN", feedback: "PoE allocation is unrelated to unicast FIB information for an SPBM VLAN.", isCorrect: false }
    ],
    explanation: "show isis spbm unicast-fib vlan <vlan-id> displays the unicast forwarding information base entries for a specific VLAN, useful for confirming that SPBM has correctly computed forwarding paths across the fabric.",
    resources: {
      videoTopic: "SPBM Unicast FIB Verification"
    }
  },
  {
    id: 20,
    topic: "Interface-Level IS-IS Checks",
    section: "Troubleshooting",
    question: "When narrowing down an adjacency problem to a specific link, which command shows IS-IS interface-level configuration and counters?",
    options: [
      { text: "show vlan and show fdb", feedback: "Those are Layer 2 VLAN and MAC learning commands, not IS-IS interface-level diagnostics.", isCorrect: false },
      { text: "show power and show power budget", feedback: "Those report PoE power delivery, unrelated to IS-IS interface diagnostics.", isCorrect: false },
      { text: "show mlag peer", feedback: "show mlag peer is used on Switch Engine MLAG deployments, not for IS-IS interface-level troubleshooting on Fabric Engine.", isCorrect: false },
      { text: "show isis interface and show isis int-l1-cntl-pkts", feedback: "Correct! These commands show interface-level IS-IS configuration and Level 1 control packet counters, useful for isolating a link-specific issue.", isCorrect: true }
    ],
    explanation: "show isis interface and show isis int-l1-cntl-pkts provide interface-specific IS-IS configuration and Level 1 control packet counters, which help isolate whether an adjacency problem is specific to one link versus a broader fabric-wide issue.",
    resources: {
      videoTopic: "Interface-Level IS-IS Diagnostics"
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
