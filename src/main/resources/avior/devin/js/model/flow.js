define([
	"backbone",
	"util",
], function(Backbone, Util){
	
	/* Structure to hold flow information */
	var Flow = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
	});
	return Flow;
});