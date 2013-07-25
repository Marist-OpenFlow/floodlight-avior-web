define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/memory",
	"floodlight/modules",
	"floodlight/status",
	"floodlight/uptime",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview"
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
				var uptimeview = new UptimeView({model: new Uptime});
				var memoryview = new MemoryView({model: new Memory});
				var modulesview = new ModulesView({model: new Modules});
				
				statusview.delegateEvents(statusview.events);
				uptimeview.delegateEvents(uptimeview.events);
				memoryview.delegateEvents(memoryview.events);
				modulesview.delegateEvents(modulesview.events);
				
				$('#uptimeview').append(uptimeview.render().el);
				$('#statusview').append(statusview.render().el);
				$('#memoryview').append(memoryview.render().el);
				$('#modulesview').append(modulesview.render().el);

				/*
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
				*/
			});
		}
	};
});


