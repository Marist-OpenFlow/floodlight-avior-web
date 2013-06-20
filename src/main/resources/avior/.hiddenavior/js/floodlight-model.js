/* Compatible Floodlight version number */
var FL_VERSION = "0.90";

/* Structure to hold switch information */
var FLPort = Backbone.Model.extend({
	defaults: function() {
		var prt = new OFPPhyPort;
		return prt;
	},

	parse: function(resp, options){
		this.set('port_no', resp.portNumber);
		this.set('hw_addr', resp.hardwareAddress);
		this.set('name', resp.name);
		this.set('config', resp.config);
		this.set('state', resp.state);
		this.set('curr', resp.currentFeatures);
		this.set('advertised', resp.advertisedFeatures);
		this.set('supported', resp.supportedFeatures);
		this.set('peer', resp.peerFeatures);
	},

	toJSON: function(){
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
	}
});

/* Structure to hold switch information */
var FLSwitchDescrip = Backbone.Model.extend({
	defaults: function() {
		return new OFPDescStats;
	},

	parse: function(resp, options){
		this.set('mfr', resp.manufacturer);
		this.set('hw', resp.hardware);
		this.set('sw', resp.software);
		this.set('serial_num', resp.serialNum);
		this.set('dp_desc', resp.datapath);
	},

	toJSON: function(){
		var rep = {
			manufacturer: this.get('mfr'),
			hardware: this.get('hw'),
			software: this.get('sw'),
			serialNum: this.get('serial_num'),
			datapath: this.get('dp_desc')
		};
		return rep;
	}
});

/* Structure to hold switch information */
var FLSwitchResponse = Backbone.Model.extend({

	defaults: function() {
		var sw = new OFPSwitchFeatures;
		sw.inetAddress = "";
		sw.connectedSince = 0;
		sw.desc = new FLSwitchDescrip;
		return sw;
	},

	parse: function(resp, options){
		var desc = new FLSwitchDescrip;
		desc.parse(resp.description);

		this.set('actions', resp.actions);
		this.set('ports', _.map(resp.ports, function(i){var prt = new FLPort; prt.parse(i); return prt;}));
		this.set('n_buffers', resp.buffers);
		this.set('desc', desc);
		this.set('capabilities', resp.capabilities);
		this.set('inetAddress', resp.inetAddress);
		this.set('connectedSince', resp.connectedSince);
		this.set('datapath_id', resp.dpid);
	},

	toJSON: function(){
		var rep = {
			actions: this.get('actions'),
			ports: _.map(this.get('ports'),function(i){return i.toJSON();}),
			buffers: new String(this.get('n_buffers')),
			description: this.get('desc').toJSON(),
			capabilities: this.get('capabilities'),
			inetAddress: this.get('inetAddress'),
			connectedSince: this.get('connectedSince'),
			dpid: new String(this.get('datapath_id'))
		};
		return rep;
	}
});

var FLController = Backbone.Model.extend({

	url: '/wm/core/controller/switches/json',

	defaults: { switches: [] },

	parse: function(resp, options){
		var models = _.map(resp, function(i){var sw = new FLSwitchResponse; sw.parse(i); return sw;});
		this.set('switches', models);
	}

});

