define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var UptimeModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		defaults: {
			systemUptimeMsec: 'unknown'
		},
	});
	return UptimeModel;
});

