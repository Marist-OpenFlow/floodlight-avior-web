define([
	"model/switch",
	"collection/port"
], function(Switch,PortCollection){
	//get list of switch features connected to controller
	Switch.prototype.url = function(){"/wm/core/switch/"+this.datapath_id+"/json"};
	Switch.prototype.parse = function(resp){
		resp.datapath_id = resp.dpid;
		//delete resp.dpid;
		resp.n_buffers = resp.buffers;
		//delete resp.buffers;

		resp.desc = resp.description;
		//resp.desc = new Switch.Description;
		//resp.desc.parse(resp.description);
		//delete resp.description;
	    
		var ports = new PortCollection;
		ports.parse(resp.ports);
		resp.ports = ports;

		this.set(resp);
	};
	Switch.prototype.toJSON = function(){
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
	return Switch;
});
