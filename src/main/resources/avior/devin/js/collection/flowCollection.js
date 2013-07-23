 define([
	"backbone",
	"util",
	"floodlight/flowFl",
], function(Backbone,Util,Flow,dpid){
	var FlowCollection = Backbone.Collection.extend({
		model: Flow,
		url: Util.missingCtlrErr,
	});
	return FlowCollection;
});