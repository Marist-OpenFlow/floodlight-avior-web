define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	var FlowEdModel = Backbone.Model.extend({
		defaults:{
			dpid:'',
			name:'',
			ingressPort:'',
			actions:''
		}
	});
	return FlowEdModel;
});