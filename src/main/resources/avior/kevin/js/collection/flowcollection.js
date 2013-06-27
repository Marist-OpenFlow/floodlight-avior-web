define([
	"backbone",
	"util",
	"model/flow"
], function(Backbone,Util,Flow){
	var FlowCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: Flow,
		toJSON: function() { return this.models; }
	});
	return FlowCollection;
});

