define([
	"backbone",
	"util",
	"model/flowEdModel"
], function(Backbone,Util,FlowEdModel){
	var FlowEdCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: FlowEdModel,
	});
	return FlowEdCollection;
}); 