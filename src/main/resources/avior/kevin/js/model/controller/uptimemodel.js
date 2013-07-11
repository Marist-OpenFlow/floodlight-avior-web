define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var UptimeModel = Backbone.Model.extend({
		url: Util.missingCtlrErr,
		defaults: {
			systemUptimeMsec: 'unknown'
		},
	});
	return UptimeModel;
});

