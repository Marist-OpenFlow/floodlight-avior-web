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
	"text!template/login.html",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Memory, Modules, Status, Uptime, Host, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, HostView, loginTpl, controllerTpl){
	/* Structure used to navigate through views */
	var Router = Marionette.AppRouter.extend({
		template: _.template(controllerTpl),
		template2: _.template(loginTpl),
		
		routes: {
			"": "home",
			"controllers": "controllerRoute",
			"hosts": "hostRoute",
			"switches": "switchRoute",
			"staticflowmanager": "staticFlowRoute",
			"qos": "qosRoute",
			"vfilter": "vfilterRoute",
			"loadbalancer": "loadbalancerRoute",
		},
		
		/*initialize: function() {
			var self = this;
			this.loggedIn = false;
			$('#content').append(this.template2).trigger('create');
			$('#userLogin').click(function() {self.loggedIn = true; self.home();});
		},*/
		
		 home: function() {
		 	$('#content').empty();
		 	$('#content').append(this.template).trigger('create');
		 	// Create views for controller aspects
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});

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
			$('#displayhosts').append(this.hostview.render().el);
        },
        
        controllerRoute: function() {
			$('#content').empty();
			$('#content').append("Controller Details Coming Soon!");
        },
        
        hostRoute: function() {
			$('#content').empty();
			$('#content').append("Host Details Coming Soon!");
        },
		
		switchRoute: function() {
			$('#content').empty();
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			this.collection = switchDetail.collection;
			switchDetail.listenTo(switchDetail.switchStats, "sync", switchDetail.render);
		},
		
		staticFlowRoute: function() {
			$('#content').empty();
			if (this.collection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FlowEditor(switchDetail.collection, true);});
			}
			else
				new FlowEditor(this.collection, true);
        },

         qosRoute: function() {
			$('#content').empty();
			$('#content').append("QoS Coming Soon!");
			//$('#content').append(this.template2).trigger('create');
        },
        
         vfilterRoute: function() {
			$('#content').empty();
			$('#content').append(" ");
			$('#content').append(" ");
			$('#content').append("Virtual Network Filter Coming Soon!");
        },
        
         loadbalancerRoute: function() {
			$('#content').empty();
			$('#content').append("Load Balancer Coming Soon!");
        },

	});
	return Router;
}); 