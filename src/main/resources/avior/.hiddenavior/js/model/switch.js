define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util,OFP){
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
		initialize: function(obj){
			if (obj) { this.parse(obj); }
			else this.set(new OFP.SwitchFeatures);
		},
		parse: Util.missingCtlrErr,
		toJSON: Util.missingCtlrErr,
	});
	return Switch;
});

