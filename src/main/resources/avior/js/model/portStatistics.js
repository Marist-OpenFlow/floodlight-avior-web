define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	/* Structure to hold port statistics */
	var PortStatistics = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
	});
	return PortStatistics;
}); 