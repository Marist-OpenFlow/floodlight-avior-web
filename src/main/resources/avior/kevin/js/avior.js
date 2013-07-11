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
	"model/controller/memorymodel",
	"model/controller/modulesmodel",
	"model/controller/statusmodel",
	"model/controller/uptimemodel",
	"view/controllerview"
], function($, _, Backbone, Memory, Modules, Status, Uptime, ControllerView){
	return {
		Memory: Memory,
		Modules: Modules,
		Status: Status,
		Uptime: Uptime,
		ControllerView: ControllerView,
		initialize: function(){
			$(document).ready(function(){
				var controller = new Backbone.Model.extend();
				controller.set({memory: new Memory, modules: new Modules, status: new Status, uptime: new Uptime});
				var controllerview = new ControllerView({model: controller});
				//$(document.body).append(controllerview.render().el);
				//controllerview.delegateEvents(controllerview.events);
				
				
				/*
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
				*/
			});
		}
	};
});


