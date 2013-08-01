define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/switch",
	"view/switchDetail",
	"floodlight/memory",
	"floodlight/modules",
	"floodlight/status",
	"floodlight/uptime",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview",
	"view/flowEditor",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Memory, Modules, Status, Uptime, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor){
	/* Structure used to navigate through views */
	var Router = Marionette.AppRouter.extend({
		routes: {
			"": "home",
			"index": "home2",
			"controllers": "controllerRoute",
			"switches": "switchRoute",
			"staticflowmanager": "staticFlowRoute",
			"qos": "qosRoute",
			"vfilter": "vfilterRoute",
			"loadbalancer": "loadbalancerRoute",
		},
		
		 home: function() {
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
				
			//Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
				
			//Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el).trigger('create');
			$('#statusview').append(this.statusview.render().el).trigger('create');
			$('#memoryview').append(this.memoryview.render().el).trigger('create');
			$('#modulesview').append(this.modulesview.render().el).trigger('create');
        },
        
        home2: function() {				
			//Link controller aspects to id tags
			var self = this;
			$('#content').append(this.uptimeview.render().el).trigger('create');
			$('#content').append(self.statusview.render().el).trigger('create');
			$('#content').append(self.memoryview.render().el).trigger('create');
			$('#content').append(self.modulesview.render().el).trigger('create');
        },
        
        controllerRoute: function() {
        	//$('#container').remove();
			//new FlowEditor(this.collection, true);
			$('#content').empty();
			$('#content').append("");
        },
        
		
		switchRoute: function() {
			console.log("router routing routers");
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			this.collection = switchDetail.collection;
		},

	});
	return Router;
}); 