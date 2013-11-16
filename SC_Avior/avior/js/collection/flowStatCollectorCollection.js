 define([
	"backbone",
	"util",
	"model/flowStatCollectorModel",
], function(Backbone,Util,FlowStatCollectorModel){
	/* Structure to hold flow models */
	var FlowStatCollectorCollection = Backbone.Collection.extend({
		model: FlowStatCollectorModel,
		url: Util.missingCtlrErr,
	});
	return FlowStatCollectorCollection;
}); 