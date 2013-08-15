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
	"view/topologyView",
	"text!template/login.html",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Memory, Modules, Status, Uptime, Host, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, HostView, TopologyView, loginTpl, controllerTpl){
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
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
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
			
			var self = this;
			
			//only call fetch when the view is visible
			this.interval = setInterval(function(){
					self.uptimeview.model.fetch();
					self.statusview.model.fetch();
					self.memoryview.model.fetch();
				}, 2000);
        },
        
        controllerRoute: function() {
			$('#content').empty();
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
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
			
			var self = this;
			
			//only call fetch when the view is visible
			this.interval = setInterval(function(){
					self.uptimeview.model.fetch();
					self.statusview.model.fetch();
					self.memoryview.model.fetch();
				}, 2000);
        },
        
        hostRoute: function() {
			$('#content').empty();
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);
			
			// Link host to id tag
			$('#content').append(this.hostview.render().el);
        },
		
		switchRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			this.collection = switchDetail.collection;
			switchDetail.listenTo(switchDetail.switchStats, "sync", switchDetail.render);
	
		},
		
		staticFlowRoute: function() {
			$('#content').empty();
<<<<<<< HEAD

			// Clears out any previous intervals
			clearInterval(this.interval);
			
			//clearInterval(this.interval);
=======
			// Clears out any previous intervals
			clearInterval(this.interval);

>>>>>>> cc3d17426882e2aad078af3eef4b56ac7b48ec38
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
        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').append("Firewall Coming Soon!");
        },
        
        topologyRoute: function () {
        	$('#content').empty();
<<<<<<< HEAD

        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').append("Topology Coming Soon!");

			//$('#content').append("Topology Coming Soon!");
			var topology = new TopologyView();
=======
        	
        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			//switch and host array placeHolders for testing 
			var s = [1,2,3,4,5,6,7,8,9,10];
			var h = [1,2,3,4,5];
			
			var topology = new TopologyView(s, h);
>>>>>>> cc3d17426882e2aad078af3eef4b56ac7b48ec38
			topology.render();
        },
        
        ADVAlancheRoute: function () {
        	$('#content').empty();
        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').append("ADVAlanche Coming Soon!");
        },

         qosRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').append("QoS Coming Soon!");
        },
        
         vfilterRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			$('#content').append("Virtual Network Filter Coming Soon!");
        },
        
         loadbalancerRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
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