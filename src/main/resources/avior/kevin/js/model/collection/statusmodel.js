define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var Status = Backbone.Model.extend({
		url: Util.missingCtlrErr,
		defaults: {
			healthy: 'unknown'
		},
	});
	return Status;
});

