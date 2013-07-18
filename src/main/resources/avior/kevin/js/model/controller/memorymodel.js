define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var MemoryModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		defaults: {
			total: 0,
			free: 0
		},
	});
	return MemoryModel;
});

