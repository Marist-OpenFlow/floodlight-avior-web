define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	var FlowEdModel = Backbone.Model.extend({
		urlRoot: "/wm/staticflowentrypusher/json"
	});
	return FlowEdModel;
});