define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	var PortStatistics = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
	});
	return PortStatistics;
}); 