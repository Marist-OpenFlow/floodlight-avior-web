define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var StatusModel = Backbone.Model.extend({
		url: "/wm/core/health/json",
		defaults: {
			healthy: 'unknown'
		},
	});
	
	return StatusModel;
});

