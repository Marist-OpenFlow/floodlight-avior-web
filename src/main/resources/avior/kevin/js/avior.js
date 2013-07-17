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
	"view/controller/memoryview",
	"view/controller/modulesview",
	"view/controller/statusview",
	"view/controller/uptimeview"
], function($, _, Backbone, Memory, Modules, Status, Uptime, MemoryView, ModulesView, StatusView, UptimeView){
	return {
		Memory: Memory,
		Modules: Modules,
		Status: Status, 
		Uptime: Uptime,
		MemoryView: MemoryView, 
		ModulesView: ModulesView,
		StatusView: StatusView,
		UptimeView: UptimeView,
		
		initialize: function(){
			$(document).ready(function(){
				var statusview = new StatusView({model: new Status});
				// var uptimeview = new UptimeView({model: new Uptime});
				// var memoryview = new MemoryView({model: new Memory});
				// var modulesview = new ModulesView({model: new Modules});
				
				// statusview.delegateEvents(statusview.events);
				// memoryview.delegateEvents(memoryview.events);
				
				
				/*
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
				*/
			});
		}
	};
});


