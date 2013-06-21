define(function(){

return {
	VERSION: "1.0.0",

	/* === Appendix A 2.1 Port Structures === */

	/* Structure to hold switch information */
	Port: function() {
		this.name = " ";
		this.hw_addr = [];
		this.port_no = 0x0000;
		this.config = 0x0000;
		this.state = 0x0000;
		this.curr = 0x00000000;
		this.advertised = 0x00000000;
		this.supported = 0x00000000;
		this.peer = 0x00000000;
		Object.seal(this);
	},

	/* Port numbering. Physical ports are numbered starting from 1. */
	OFPP: {
		/* Maximum number of physical switch ports. */
		MAX:        0xffffff00,
		/* Reserved OpenFlow Port (fake output "ports"). */
		IN_PORT:    0xfffffff8, /* Send the packet out the input port. This
								virtual port must be explicitly used in
								order to send back out of the input port */
		TABLE:      0xfffffff9, /* Perform actions in flow table.
								NB: This can only be the destination
								port for packet-out messages */
		NORMAL:     0xfffffffa, // Process with normal L2/L3 switching
		FLOOD:      0xfffffffb, // All physical ports except input and those disabled by STP
		ALL:        0xfffffffc, // All physical ports except input port
		CONTROLLER: 0xfffffffd, // Send to controller
		LOCAL:      0xfffffffe, // Local openflow "port"
		NONE:       0xffffffff	// Not associated with a physical port
	},

	/* Features of physical ports available in datapath. */
	OFPPF: {
		RATE_10MB_HD:  1 <<  0, // 10 Mb half-duplex rate support
		RATE_10MB_FD:  1 <<  1, // 10 Mb full-duplex rate support
		RATE_100MB_HD: 1 <<  2, // 100 Mb half-duplex rate support
		RATE_100MB_FD: 1 <<  3, // 100 Mb full-duplex rate support
		RATE_1GB_HD:   1 <<  4, // 1 Gb half-duplex rate support
		RATE_1GB_FD:   1 <<  5, // 1 Gb full-duplex rate support.
		RATE_10GB_FD:  1 <<  6, // 10 Gb full-duplex rate support
		COPPER:        1 <<  7, // Copper medium
		FIBER:         1 <<  8, // Fiber medium
		AUTONEG:       1 <<  9, // Auto-negotiation
		PAUSE:         1 << 10, // Pause
		PAUSE_ASYM:    1 << 11  // Asymmetric pause
	},

	/* Flags to indicate behavior of the physical port. These flags are
	 * used in ofp_phy_port to describe the current configuration. They are
	 * used in the ofp_port_mod message to configure the port’s behavior.
	 */
	OFPPC: {
		PORT_DOWN:    1 << 0, // Port is administratively down
		NO_STP:       1 << 1, // Disable 802.1D spanning tree on port
		NO_RECV:      1 << 2, // Drop all packets except 802.1D spanning tree packets
		NO_RECV_STP:  1 << 3, // Drop received 802.1D STP packets
		NO_FLOOD:     1 << 4, // Do not include this port when flooding
		NO_FWD:       1 << 5, // Drop packets forwarded to port
		NO_PACKET_IN: 1 << 6  // Do not send packet-in msgs for port
	},

	/* Current state of the physical port. These are not configurable from
	 * the controller.
	 */
	OFPPS: {
		LINK_DOWN:   1 << 0, // No physical link present
		STP_LISTEN:  0 << 8, // Not learning or relaying frames
		STP_LEARN:   1 << 8, // Learning but not relaying frames
		STP_FORWARD: 2 << 8, // Learning and relaying frames
		STP_BLOCK:   3 << 8, // Not part of spanning tree
		STP_MASK:    3 << 8  // Bit mask for OFPPS_STP_* values
	},

	/* === Appendix A 2.3 Flow Match Structures === */

	/* === Appendix A 2.4 Flow Action Structures === */

	/* === Appendix A 3.1 Handshake === */

	/* Structure to hold switch information */
	SwitchFeatures: function() {
		this.datapath_id = 0x00000000;
		this.n_buffers = 0x0000;
		this.n_tables = 0x0000;
		this.capabilities = 0x0000;
		this.actions = 0x0000;
		this.ports = [];
	},

	/* Capabilities supported by the datapath. */
	OFPC: {
		FLOW_STATS:   1 << 0, // Flow statistics
		TABLE_STATS:  1 << 1, // Table statistics
		PORT_STATS:   1 << 2, // Port statistics
		STP:          1 << 3, // 802.1d spanning tree
		RESERVED:     1 << 4, // Reserved, must be zero
		IP_REASM:     1 << 5, // Can reassemble IP fragments
		QUEUE_STATS:  1 << 6, // Queue statistics
		ARP_MATCH_IP: 1 << 7, // Match IP addresses in ARP pkts
	},

	/* === Appendix A 3.2 Switch Configuration === */

	/* === Appendix A 3.3 Modify State Messages === */

	FlowMod: function() {
		this.command = 0;
	},

	OFPFC: {
		ADD:           0, // New flow
		MODIFY:        1, // Modify all matching flows
		MODIFY_STRICT: 2, // Modify entry strictly matching wildcards and priority
		DELETE:        3, // Delete all matching flows
		DELETE_STRICT: 4, // Delete entry strictly matching wildcards and priority
	},
	OFPFF: {
		SEND_FLOW_REM: 1 << 0, // Send flow removed message when flow expires or is deleted
		CHECK_OVERLAP: 1 << 1, // Check for overlapping entries first
		EMERG:         1 << 2, // Remark this is for emergency
	},

	PortMod: function() {
		this.command = 0;
	},

	/* Structure to hold hardware description information */
	DescStats: function() {
		this.mfr_desc = "";
		this.hw_desc = "";
		this.sw_desc = "";
		this.serial_num = "";
		this.dp_desc = "";
	},
}

});

