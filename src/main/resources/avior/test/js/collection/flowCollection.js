 define([
	"backbone",
	"util",
	"model/flow",
], function(Backbone,Util,Flow){
	var FlowCollection = Backbone.Collection.extend({
		model: Flow,
		url: Util.missingCtlrErr,
	});
	return FlowCollection;
});