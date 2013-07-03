define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var Uptime = Backbone.Model.extend({
		url: Util.missingCtlrErr,
		defaults: {
			systemUptimeMsec: 'unknown'
		},
	});
	return Uptime;
});

