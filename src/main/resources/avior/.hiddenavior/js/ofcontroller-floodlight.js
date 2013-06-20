define(["./ofp10", "./ofpmodels"],
	function(OFP, Avior){
		/*
			Assumes that the following Backbone models are already defined:
			- Port
		*/
		Avior.Port.prototype.parse = function(resp){
			var p = new OFP.Port;
			p.port_no = resp.portNumber;
			p.hw_addr = resp.hardwareAddress;
			p.name = resp.name;
			p.config = resp.config;
			p.state = resp.state;
			p.curr = resp.currentFeatures;
			p.advertised = resp.advertisedFeatures;
			p.supported = resp.supportedFeatures;
			this.set(p);
			//return p;
		};
		Avior.Port.prototype.toJSON = function(){
			var rep = { 
				portNumber: this.get('port_no'),
				hardwareAddress: this.get('hw_addr'),
				name: this.get('name'),
				config: this.get('config'),
				state: this.get('state'),
				currentFeatures: this.get('curr'),
				advertisedFeatures: this.get('advertised'),
				supportedFeatures: this.get('supported'),
				peerFeatures: this.get('peer')
			};
			return rep;
		};
		Avior.Switch.prototype.parse = function(resp){
			var sw = new OFP.SwitchFeatures;
			sw.n_buffers = resp.buffers;
			sw.capabilities = resp.capabilities;
			sw.actions = resp.actions;
			sw.ports = new Avior.PortCollection;
			sw.ports.parse(resp.ports);
			sw.desc = resp.description;
			sw.inetAddress = resp.inetAddress;
			sw.connectedSince = resp.connectedSince;
			sw.datapath_id = resp.dpid;
			this.set(sw);
			//return sw;
		};
		Avior.Switch.prototype.toJSON = function(){
			var rep = {
				dpid: this.get('datapath_id'),
				actions: this.get('actions'),
				ports: this.get('ports'),
				buffers: new String(this.get('n_buffers')),
				description: this.get('desc'),
				capabilities: this.get('capabilities'),
				inetAddress: this.get('inetAddress'),
				connectedSince: this.get('connectedSince'),
				dpid: new String(this.get('datapath_id'))
			};
			return rep;
		};
		Avior.SwitchCollection.prototype.url = "/wm/core/controller/switches/json";
		Avior.Memory.prototype.url = "/wm/core/memory/json";

		return Avior;
	}
);

