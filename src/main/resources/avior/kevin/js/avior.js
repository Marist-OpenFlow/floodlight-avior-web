	// "floodlight/flow",
	// "view/flowview",
	// "collection/flowcollection"
// ], function($, _, Backbone, Flow, FlowView, FlowCollection){
//		Flow: Flow,
//		FlowView: FlowView,



define([
	"jquery",
	"underscore",
	"backbone",
	"model/controller/memory",
	"model/controller/modules",
	"model/controller/status",
	"model/controller/uptime",
	"view/controllerview"
], function($, _, Backbone, Memory, Modules, Status, Uptime, ControllerView){
	return {
		Memory: Memory,
		Modules: Modules,
		Status: Status,
		Uptime: Uptime,
		ControllerView = ControllerView,
		initialize: function(){
			$(document).ready(function(){
				var controller = new Backbone.Model.extend();
				controller.set({memory: new Memory, modules: new Modules, status: new Status, uptime: new Uptime});
				var controllerview = new ControllerView({model: controller});
				
				/*
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
				*/
			});
		}
	};
});


