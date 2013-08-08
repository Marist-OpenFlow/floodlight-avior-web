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
			"home": "home",
			"controllers": "controllerRoute",
			"hosts": "hostRoute",
			"switches": "switchRoute",
			"staticflowmanager": "staticFlowRoute",
			"firewall": "firewallRoute",
			"topology": "topologyRoute",
			"ADVAlanche": "ADVAlancheRoute",
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

			// Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);

				
			// Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
        },
        
        controllerRoute: function() {
			$('#content').empty();
			$('#content').append(this.template).trigger('create');
		 	// Create views for controller aspects
			this.statusview = new StatusView({model: new Status});
			this.uptimeview = new UptimeView({model: new Uptime});
			this.memoryview = new MemoryView({model: new Memory});
			this.modulesview = new ModulesView({model: new Modules});
		
			// Delegate events for controller views
			this.statusview.delegateEvents(this.statusview.events);
			this.uptimeview.delegateEvents(this.uptimeview.events);
			this.memoryview.delegateEvents(this.memoryview.events);
			this.modulesview.delegateEvents(this.modulesview.events);
				
			// Link controller aspects to id tags
			$('#uptimeview').append(this.uptimeview.render().el);
			$('#statusview').append(this.statusview.render().el);
			$('#memoryview').append(this.memoryview.render().el);
			$('#modulesview').append(this.modulesview.render().el);
        },
        
        hostRoute: function() {
			$('#content').empty();
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);
			
			// Link host to id tag
			$('#content').append(this.hostview.render().el);
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
			//clearInterval(this.interval);
			if (this.collection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FlowEditor(switchDetail.collection, true);});
			}
			else
				new FlowEditor(this.collection, true);
        },
        
        firewallRoute: function() {
        	$('#content').empty();
			$('#content').append("Firewall Coming Soon!");
        },
        
        topologyRoute: function () {
        	$('#content').empty();
			$('#content').append("Topology Coming Soon!");
        },
        
        ADVAlancheRoute: function () {
        	$('#content').empty();
			$('#content').append("ADVAlanche Coming Soon!");
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
        
        liveUpdate: function(switchDetail) {
        	console.log(switchDetail.collection);
        	//live update when view is visible
			var self = this;
			_.forEach(switchDetail.collection.models, function(item) {
				console.log("hello");
				var dp = item.get("dpid");
				this.interval = setInterval(function(){switchDetail.displayFlow(dp, item);}, 2000);
			}, this);
        },

	});
	return Router;
}); 