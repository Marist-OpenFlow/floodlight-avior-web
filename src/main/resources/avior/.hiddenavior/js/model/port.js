define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util,OFP){
	/* Structure to hold port information */
	var Port = Backbone.Model.extend({
		initialize: function(obj){
			if (obj) { this.parse(obj); }
			else this.set(new OFP.Port);
		},
		parse: Util.missingCtlrErr,
		toJSON: Util.missingCtlrErr,
	});
	return Port;
});

