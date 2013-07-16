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
		initialization: function() {
			console.log(this.healthy);
			console.log("poop");
		}
	});
	
	return StatusModel;
});

