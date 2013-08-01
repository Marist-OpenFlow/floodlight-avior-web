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
	"floodlight/hostCollectionFl",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview",
	"view/flowEditor",
	"view/hostview",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Memory, Modules, Status, Uptime, Host, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, HostView, controllerTpl){
	/* Structure used to navigate through views */
	var Router = Marionette.AppRouter.extend({
		template: _.template(controllerTpl),
		
		routes: {
			"": "home",
			"controllers": "controllerRoute",
			"switches": "switchRoute",
			"staticflowmanager": "staticFlowRoute",
			"qos": "qosRoute",
			"vfilter": "vfilterRoute",
			"loadbalancer": "loadbalancerRoute",
		},
		
		 home: function() {
		 	$('#content').empty();
		 	$('#content').append(this.template).trigger('create');
		 	// Create views for controller aspects
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
			
			// Create view for hosts
			this.hostview = new HostView();

			// Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);

				
			// Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
			
			// Link host to id tag
			$('#hostview').append(this.hostview.render().el);
        },
        
        controllerRoute: function() {
			$('#content').empty();
			$('#content').append("Controller Details Coming Soon!");
        },
        
		
		switchRoute: function() {
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			//this.collection = switchDetail.collection;
		},
		
		staticFlowRoute: function() {
        	//$('#container').remove();
			//new FlowEditor(this.collection, true);
			$('#content').empty();
			$('#content').append("Static Flow Entry Pusher Coming Soon!");
        },
        
         qosRoute: function() {
			$('#content').empty();
			$('#content').append("QoS Coming Soon!");
        },
        
         vfilterRoute: function() {
			$('#content').empty();
			$('#content').append("Virtual Network Filter Coming Soon!");
        },
        
         loadbalancerRoute: function() {
			$('#content').empty();
			$('#content').append("Load Balancer Coming Soon!");
        },

	});
	return Router;
}); 