define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var MemoryModel = Backbone.Model.extend({
		urlRoot: "/wm/core/memory/json",
		defaults: {
			total: 0,
			free: 0
		},
	});
	return MemoryModel;
});

