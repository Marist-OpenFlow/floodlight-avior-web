define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var StatusModel = Backbone.Model.extend({
		url: Util.missingCtlrErr,
		defaults: {
			healthy: 'unknown'
		},
	});
	return StatusModel;
});

