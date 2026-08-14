// Switch Engine In-Class Quiz Data
// Questions organized by presentation section

const quizData = [
  // ===== INSTALLATION SECTION =====
  {
    id: 1,
    topic: "OS Selection",
    section: "Installation",
    question: "On Universal Switches (e.g., 5320, 5720, 7520, 7720, select 4000 Series), how is Switch Engine selected as the operating system?",
    options: [
      { text: "It is selectable at initial boot or switched later, since the hardware ships with more than one OS option", feedback: "Correct! Universal Switches ship with a selectable OS, and Switch Engine can be chosen at first boot or switched to later.", isCorrect: true },
      { text: "It must be ordered as a separate, non-upgradable hardware SKU", feedback: "Universal Switch hardware is common across OS choices — Switch Engine isn't a separate SKU.", isCorrect: false },
      { text: "It installs automatically only after a factory RMA", feedback: "OS selection happens at deployment, not only after an RMA.", isCorrect: false },
      { text: "It can only be set through a support ticket with Extreme TAC", feedback: "OS selection is a customer-driven step at boot or via management tools, not a TAC-only action.", isCorrect: false }
    ],
    explanation: "Universal Switch hardware (5320/5720/7520/7720/select 4000 Series) supports selecting Switch Engine as the OS at startup, with the option to change it later; this can also be automated through Extreme Platform ONE or ExtremeCloud IQ on supported models.",
    resources: {
      videoTopic: "Universal Switch OS Selection"
    }
  },
  {
    id: 2,
    topic: "Zero-Touch Provisioning",
    section: "Installation",
    question: "What is the zero-touch cloud onboarding flow for a new Switch Engine deployment?",
    options: [
      { text: "ZTP only works if the switch is first configured locally with a static management IP", feedback: "ZTP is designed to avoid the need for local IP configuration before onboarding.", isCorrect: false },
      { text: "Unpack the switch, connect it to the network, and it automatically locates its cloud connection for provisioning", feedback: "Correct! ZTP onboarding requires no local CLI work — the switch finds its cloud connection once it's powered and networked.", isCorrect: true },
      { text: "An administrator must manually push a config file over console before the switch can reach the network", feedback: "That describes manual staging, which is the opposite of zero-touch provisioning.", isCorrect: false },
      { text: "The switch requires a factory technician to preload cloud credentials before shipping", feedback: "No pre-staging by a technician is required — onboarding happens automatically once deployed.", isCorrect: false }
    ],
    explanation: "Zero-touch provisioning lets you unpack and connect a supported switch directly to the network; it automatically finds its cloud connection and becomes ready for provisioning without manual local configuration.",
    resources: {
      videoTopic: "Zero-Touch Provisioning"
    }
  },
  {
    id: 3,
    topic: "Management Access",
    section: "Installation",
    question: "On the 4000 Series running Switch Engine, what is true about CLI access?",
    options: [
      { text: "CLI access is disabled by default and cannot be enabled", feedback: "CLI access is available; it isn't a disabled or unavailable feature.", isCorrect: false },
      { text: "CLI access is only available through ExtremeCloud IQ, never locally", feedback: "Local CLI access is supported directly on the switch, not only through the cloud.", isCorrect: false },
      { text: "CLI access requires no additional licensing", feedback: "Correct! CLI management is available on the 4000 Series without an extra license requirement.", isCorrect: true },
      { text: "CLI access requires a separate advanced feature license", feedback: "CLI access on the 4000 Series does not require an additional license.", isCorrect: false }
    ],
    explanation: "Supported Switch Engine platforms, including the 4000 Series, can be managed through a web-based GUI or the CLI, and CLI access on the 4000 Series requires no additional licensing.",
    resources: {
      videoTopic: "Management Interfaces"
    }
  },
  {
    id: 4,
    topic: "Image Management",
    section: "Installation",
    question: "Which sequence correctly describes upgrading the Switch Engine (EXOS) software image via CLI?",
    options: [
      { text: "save configuration, then the image upgrades itself on the next power cycle", feedback: "Saving the configuration does not trigger or perform an image upgrade.", isCorrect: false },
      { text: "configure vlan, then apply the image using the GUI only", feedback: "VLAN configuration is unrelated to image installation, and CLI-based installs are fully supported.", isCorrect: false },
      { text: "The image is upgraded automatically whenever show tech-support is run", feedback: "show tech-support is a diagnostic collection command; it has no role in image upgrades.", isCorrect: false },
      { text: "download image, install image, then reboot to activate the new partition", feedback: "Correct! You download the image to the switch, install it to a partition, then reboot to run it.", isCorrect: true }
    ],
    explanation: "A typical EXOS/Switch Engine image upgrade downloads the new image file to the switch, installs it to a partition with install image, and then reboots into that partition to complete the activation.",
    resources: {
      videoTopic: "Software Image Upgrades"
    }
  },
  {
    id: 5,
    topic: "Configuration Persistence",
    section: "Installation",
    question: "After making configuration changes during initial setup, why is the save configuration command important?",
    options: [
      { text: "It writes the running configuration to non-volatile storage so changes survive a reboot", feedback: "Correct! Without saving, running-config changes are lost on the next reboot.", isCorrect: true },
      { text: "It uploads the configuration to Extreme TAC for backup", feedback: "save configuration stores locally on the switch; it doesn't transmit anything to TAC.", isCorrect: false },
      { text: "It restarts all switch processes to apply pending changes", feedback: "Saving configuration doesn't restart processes — most EXOS changes apply immediately.", isCorrect: false },
      { text: "It is only required when configuring VLANs, not other features", feedback: "save configuration applies to the entire running configuration, not just VLAN settings.", isCorrect: false }
    ],
    explanation: "EXOS/Switch Engine applies most configuration changes immediately to the running configuration, but save configuration is required to persist those changes to non-volatile storage so they survive a reboot.",
    resources: {
      videoTopic: "Configuration Persistence"
    }
  },
  {
    id: 6,
    topic: "Console and Management IP",
    section: "Installation",
    question: "What is the recommended first step when performing local (non-ZTP) initial setup of a Switch Engine device?",
    options: [
      { text: "Install third-party monitoring agents before assigning an IP address", feedback: "Third-party agents aren't part of Switch Engine initial setup and require network reachability first.", isCorrect: false },
      { text: "Connect via the console port, log in, and configure a management IP address", feedback: "Correct! Console access is the standard starting point before the switch is reachable over the network.", isCorrect: true },
      { text: "Configure VLANs and routing before assigning any management access", feedback: "Without management access, you have no reliable way to configure or verify further settings.", isCorrect: false },
      { text: "Enable SNMP traps as the first configuration action", feedback: "SNMP is a monitoring feature configured after basic reachability is established, not the first step.", isCorrect: false }
    ],
    explanation: "For local initial configuration, you typically connect to the console port, log in, and configure a management IP address so the switch becomes reachable for further CLI, GUI, or automation-based configuration.",
    resources: {
      videoTopic: "Initial Console Setup"
    }
  },

  // ===== CONFIGURATION SECTION =====
  {
    id: 7,
    topic: "VLAN Verification",
    section: "Configuration",
    question: "Which command verifies current VLAN configuration on a Switch Engine device?",
    options: [
      { text: "show tech-support", feedback: "show tech-support is a broad diagnostic bundle, not the dedicated VLAN verification command.", isCorrect: false },
      { text: "show mlag peer", feedback: "show mlag peer checks MLAG peer status, unrelated to VLAN verification.", isCorrect: false },
      { text: "show vlan", feedback: "Correct! show vlan displays VLAN configuration, including tag, ports, and untagged/tagged status.", isCorrect: true },
      { text: "show fdb", feedback: "show fdb displays the forwarding database (MAC address table), not VLAN configuration.", isCorrect: false }
    ],
    explanation: "show vlan is the command used to verify VLAN configuration on a Switch Engine (EXOS) device.",
    resources: {
      videoTopic: "VLAN Verification"
    }
  },
  {
    id: 8,
    topic: "Untagged VLAN Rule",
    section: "Configuration",
    question: "How many VLANs can carry untagged traffic on a single physical port at the same time?",
    options: [
      { text: "Up to four, matching common QoS queue counts", feedback: "QoS queue counts are unrelated to how many untagged VLANs a port can carry.", isCorrect: false },
      { text: "As many as are added to the port, as long as LACP is enabled", feedback: "LACP affects link aggregation, not how many VLANs can be untagged on a port.", isCorrect: false },
      { text: "Unlimited, since untagged frames don't carry VLAN identification", feedback: "Because untagged frames carry no VLAN ID, the switch can only assign them to one VLAN per port — not unlimited VLANs.", isCorrect: false },
      { text: "Only one", feedback: "Correct! A given port can carry untagged traffic for only a single VLAN at a time.", isCorrect: true }
    ],
    explanation: "Because untagged frames carry no VLAN identification in the frame itself, a switch port can only be configured with a single untagged VLAN at a time; additional VLANs on that port must be tagged.",
    resources: {
      videoTopic: "VLAN Tagging Rules"
    }
  },
  {
    id: 9,
    topic: "Link Flap Detection",
    section: "Configuration",
    question: "What does the configure ports link-flap-detection feature do?",
    options: [
      { text: "Monitors ports for repeated up/down transitions and can trigger actions like disabling the port or sending a trap", feedback: "Correct! Link-flap detection watches for flapping links and can log, trap, or disable the port based on configured thresholds.", isCorrect: true },
      { text: "Automatically renegotiates duplex settings when a link flaps", feedback: "Link-flap detection responds to flapping behavior; it doesn't renegotiate duplex settings.", isCorrect: false },
      { text: "Encrypts traffic on ports that experience frequent link state changes", feedback: "This feature is about detecting instability, not encryption.", isCorrect: false },
      { text: "Prevents a port from ever being disabled regardless of link state", feedback: "It can do the opposite — disable a flapping port based on a configured action.", isCorrect: false }
    ],
    explanation: "configure ports link-flap-detection lets you set an interval, threshold, and disable-time, along with actions such as disable-port, log, or trap, to respond automatically to unstable links.",
    resources: {
      videoTopic: "Link Flap Detection"
    }
  },
  {
    id: 10,
    topic: "SMLT and LACP",
    section: "Configuration",
    question: "When configuring LACP for use with SMLT (Switch Multi-Link Trunking) on Switch Engine, what must match between the two SMLT peer switches?",
    options: [
      { text: "Nothing; each SMLT peer can use independent LACP settings", feedback: "Independent settings would prevent the far-end device from seeing the two peers as a single LACP partner.", isCorrect: false },
      { text: "The LACP smlt-sys-id, and the LACP key must match for a given SMLT ID", feedback: "Correct! Both the smlt-sys-id and matching LACP key per SMLT ID are required for the peer switches to appear as one LACP partner.", isCorrect: true },
      { text: "Only the port speed needs to match; LACP parameters are negotiated automatically", feedback: "Speed alone isn't sufficient — the smlt-sys-id and LACP key must be explicitly aligned.", isCorrect: false },
      { text: "The VLAN tag number used on the SMLT ports", feedback: "VLAN tag alignment matters for trunking generally, but it isn't the specific LACP/SMLT peer requirement.", isCorrect: false }
    ],
    explanation: "For LACP to work correctly across SMLT peer switches, the LACP smlt-sys-id must be configured to match on both switches, and the LACP key must match for a given SMLT ID so the far-end device sees a single logical LACP partner.",
    resources: {
      videoTopic: "SMLT and LACP Configuration"
    }
  },
  {
    id: 11,
    topic: "Fabric Attach and LACP",
    section: "Configuration",
    question: "Why would you use static MLT instead of LACP when implementing Fabric Attach dynamic port sharing on an EXOS/Switch Engine device?",
    options: [
      { text: "LACP is deprecated on all Switch Engine platforms", feedback: "LACP is still fully supported on Switch Engine in general; the constraint is specific to Fabric Attach dynamic LAG scenarios.", isCorrect: false },
      { text: "Static MLT is required because VLANs cannot be tagged over LACP links", feedback: "VLAN tagging works fine over LACP links; that isn't the reason for this restriction.", isCorrect: false },
      { text: "LACP cannot be used with Fabric Attach links to a Switch Engine device when dynamic LAG is needed", feedback: "Correct! Static MLT is the supported approach because LACP is not compatible with Fabric Attach dynamic LAG in this scenario.", isCorrect: true },
      { text: "Static MLT provides higher throughput than LACP on all hardware", feedback: "Throughput isn't the driver here — the limitation is LACP's incompatibility with Fabric Attach dynamic LAG.", isCorrect: false }
    ],
    explanation: "Best practice guidance notes that when implementing Fabric Attach dynamic port sharing (LAG) on an EXOS/Switch Engine switch, static MLT should be used because LACP cannot be paired with Fabric Attach links requiring dynamic LAG; where possible, LACP should still be used on the Fabric node and the far end for other links.",
    resources: {
      videoTopic: "Fabric Attach Best Practices"
    }
  },
  {
    id: 12,
    topic: "MLAG Configuration",
    section: "Configuration",
    question: "Which command displays the MLAG (multi-switch LAG) port configuration in detail?",
    options: [
      { text: "show vlan detail", feedback: "show vlan detail focuses on VLAN attributes, not MLAG port configuration.", isCorrect: false },
      { text: "show port rxerror", feedback: "show port rxerror reports receive errors per port, unrelated to MLAG configuration.", isCorrect: false },
      { text: "show power budget", feedback: "show power budget reports PoE power allocation, not MLAG settings.", isCorrect: false },
      { text: "show configuration vsm detail", feedback: "Correct! Using vsm as the module name with show configuration reveals MLAG-related port configuration.", isCorrect: true }
    ],
    explanation: "show configuration {module-name} detail, using vsm as the module name, shows the MLAG port configuration on the switch.",
    resources: {
      videoTopic: "MLAG Configuration Verification"
    }
  },
  {
    id: 13,
    topic: "PoE Configuration",
    section: "Configuration",
    question: "Which statement best describes PoE (Power over Ethernet) configuration on a Switch Engine port?",
    options: [
      { text: "PoE delivers electrical power to connected devices over the same cable as data, and can be tuned with settings like power limits per port", feedback: "Correct! PoE combines power delivery with data transmission and supports per-port tuning such as power limits.", isCorrect: true },
      { text: "PoE increases the maximum data rate a port can negotiate", feedback: "PoE affects power delivery, not the negotiated data rate of the port.", isCorrect: false },
      { text: "PoE must be disabled before VLANs can be assigned to a port", feedback: "PoE and VLAN assignment are independent configuration settings with no such dependency.", isCorrect: false },
      { text: "PoE requires a dedicated power cable run alongside the Ethernet cable", feedback: "PoE's purpose is to avoid a separate power cable by delivering power over the existing Ethernet cable.", isCorrect: false }
    ],
    explanation: "PoE allows a switch port to supply power to devices such as IP phones, cameras, and access points over the same cable used for data, with per-port controls such as power limits and priority available in configuration.",
    resources: {
      videoTopic: "Power over Ethernet Configuration"
    }
  },

  // ===== TROUBLESHOOTING SECTION =====
  {
    id: 14,
    topic: "show tech-support",
    section: "Troubleshooting",
    question: "What is the purpose of the show tech-support command, and what was it previously called?",
    options: [
      { text: "It has always been named show tech-support since the switch's first release", feedback: "The command was renamed — it was called show tech before ExtremeXOS release 15.4.", isCorrect: false },
      { text: "It bundles output from many diagnostic commands for TAC use, and was called show tech before ExtremeXOS 15.4", feedback: "Correct! show tech-support consolidates diagnostics such as show diagnostics, show log, and show version, and replaced the older show tech command name in release 15.4.", isCorrect: true },
      { text: "It is a configuration command used to enable technical support remote access", feedback: "show tech-support is a diagnostic collection command, not a remote-access enablement feature.", isCorrect: false },
      { text: "It only displays the switch's current software version", feedback: "Version information is one small part of the output; show tech-support covers far more, including logs and diagnostics.", isCorrect: false }
    ],
    explanation: "show tech-support displays output from numerous show commands (such as show diagnostics, show log, show version, and port error counters) to assist Extreme TAC in troubleshooting; the command was renamed from show tech to show tech-support in ExtremeXOS release 15.4.",
    resources: {
      videoTopic: "show tech-support Command"
    }
  },
  {
    id: 15,
    topic: "Detailed Diagnostics",
    section: "Troubleshooting",
    question: "What additional information does show tech-support include when the detail keyword is used?",
    options: [
      { text: "A list of all connected end-user devices by hostname", feedback: "End-user device inventories aren't part of show tech-support output.", isCorrect: false },
      { text: "The switch's original factory configuration file", feedback: "show tech-support reflects current diagnostic state, not a stored factory-default configuration.", isCorrect: false },
      { text: "show log, show log configuration, show log counters all, and show process detail", feedback: "Correct! The detail keyword expands the bundle to include these additional log and process outputs.", isCorrect: true },
      { text: "A full packet capture of all switch interfaces", feedback: "show tech-support does not perform packet captures; it aggregates existing show command output.", isCorrect: false }
    ],
    explanation: "Adding the detail keyword to show tech-support pulls in extra outputs, including show log, show log configuration, show log counters all, and show process detail.",
    resources: {
      videoTopic: "Advanced Diagnostic Collection"
    }
  },
  {
    id: 16,
    topic: "Diagnostic Collection Best Practice",
    section: "Troubleshooting",
    question: "What is the recommended best practice for collecting diagnostics when a Switch Engine device experiences an intermittent issue?",
    options: [
      { text: "Reboot the switch immediately, then run show tech-support afterward only", feedback: "Rebooting first can clear the very state needed to diagnose the root cause.", isCorrect: false },
      { text: "Wait 24 hours after the issue clears before collecting any diagnostics", feedback: "Waiting risks losing transient state; diagnostics should be collected while the issue is active.", isCorrect: false },
      { text: "Diagnostics should only be collected by power-cycling the switch multiple times", feedback: "Repeated power cycling doesn't aid diagnosis and can destroy the evidence needed to find the root cause.", isCorrect: false },
      { text: "Gather show tech-support while the error is occurring, before rebooting, then again after rebooting if further analysis is needed", feedback: "Correct! Capturing state during the active issue preserves data that a reboot would otherwise clear.", isCorrect: true }
    ],
    explanation: "Best practice is to collect show tech-support output while the error condition is present and before rebooting, since a reboot can clear transient state; a second capture after rebooting supports root cause analysis if needed.",
    resources: {
      videoTopic: "Diagnostic Collection Best Practices"
    }
  },
  {
    id: 17,
    topic: "FDB Troubleshooting",
    section: "Troubleshooting",
    question: "When troubleshooting a Layer 2 connectivity issue, what does show fdb help you verify?",
    options: [
      { text: "Which MAC addresses have been learned on which ports and VLANs", feedback: "Correct! The forwarding database (FDB) maps learned MAC addresses to ports and VLANs, useful for tracing where a device is seen.", isCorrect: true },
      { text: "The routing table used for Layer 3 forwarding decisions", feedback: "That's the function of a routing table, not the FDB, which is a Layer 2 structure.", isCorrect: false },
      { text: "The current firmware version running on the switch", feedback: "Firmware version is reported by show version, not show fdb.", isCorrect: false },
      { text: "PoE power allocation for each port", feedback: "PoE power allocation is shown by power-related commands, not the forwarding database.", isCorrect: false }
    ],
    explanation: "show fdb displays the forwarding database, showing which MAC addresses have been learned on which switch ports and VLANs — a key tool for tracing Layer 2 connectivity issues.",
    resources: {
      videoTopic: "FDB and MAC Learning"
    }
  },
  {
    id: 18,
    topic: "MLAG Peer Verification",
    section: "Troubleshooting",
    question: "How would you check whether an MLAG peer is currently up from the CLI?",
    options: [
      { text: "show vlan detail", feedback: "show vlan detail covers VLAN attributes, not the state of an MLAG peer relationship.", isCorrect: false },
      { text: "show mlag peer {peer_name}", feedback: "Correct! This command reports whether the specified MLAG peer relationship is up.", isCorrect: true },
      { text: "show isis adjacency", feedback: "show isis adjacency is used for IS-IS/SPBM environments, not MLAG peer status on Switch Engine.", isCorrect: false },
      { text: "show port rxerror", feedback: "show port rxerror reports receive error counters, not MLAG peer state.", isCorrect: false }
    ],
    explanation: "show mlag peer {peer_name} is used to verify whether an MLAG peer is up, as part of MLAG troubleshooting.",
    resources: {
      videoTopic: "MLAG Peer Troubleshooting"
    }
  },
  {
    id: 19,
    topic: "MLAG Peer Down Scenario",
    section: "Troubleshooting",
    question: "If MLAG peer configuration exists but the peer is currently down, what happens to auto-configuration, and what is a common workaround?",
    options: [
      { text: "The switch automatically deletes the MLAG configuration after a timeout", feedback: "The configuration isn't automatically removed; a workaround requires manual action.", isCorrect: false },
      { text: "The only fix is a full factory reset of the switch", feedback: "A factory reset is far more drastic than the documented workarounds of removing MLAG peer config or restoring the peer.", isCorrect: false },
      { text: "Auto-configuration cannot be enabled while the peer config exists and is down; removing the MLAG peer config (making it a single CB setup) or bringing the peer back up resolves it", feedback: "Correct! This matches the documented limitation and its two workarounds.", isCorrect: true },
      { text: "Auto-configuration proceeds normally regardless of peer state", feedback: "The documented behavior is the opposite — a down peer with existing config blocks auto-configuration.", isCorrect: false }
    ],
    explanation: "When MLAG peer configuration is present but the peer is down, auto-configuration cannot be enabled; documented workarounds are to remove the MLAG peer configuration (reverting to a single CB setup) or to restore connectivity so the MLAG peer comes back up.",
    resources: {
      videoTopic: "MLAG Failure Scenarios"
    }
  },
  {
    id: 20,
    topic: "Port Error Counters",
    section: "Troubleshooting",
    question: "Which pair of commands would you use to check for receive and transmit errors on a suspect port?",
    options: [
      { text: "show vlan and show fdb", feedback: "Those commands address VLAN configuration and MAC learning, not physical-layer error counters.", isCorrect: false },
      { text: "show mlag peer and show configuration vsm", feedback: "Those are MLAG-specific commands, not port error counters.", isCorrect: false },
      { text: "show power and show power budget", feedback: "Those relate to PoE power delivery, not port error statistics.", isCorrect: false },
      { text: "show port rxerror and show port txerror", feedback: "Correct! These commands report receive and transmit error counters per port, useful for isolating cabling or physical-layer issues.", isCorrect: true }
    ],
    explanation: "show port rxerror and show port txerror report per-port receive and transmit error counts, which are included in show tech-support output and are useful when isolating physical-layer problems like bad cabling or SFP issues.",
    resources: {
      videoTopic: "Port-Level Error Diagnostics"
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
