define([
	"backbone",
	"util",
	"model/topology"
], function(Backbone,Util,Topology){
	/* Structure to hold topology models */
	var TopologyCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: Topology,
	});
	return TopologyCollection;
}); 