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
	"floodlight/testFL",
	"view/memoryview",
	"view/modulesview",
	"view/statusview",
	"view/uptimeview",
	"view/flowEditor",
	"view/firewallEditor",
	"view/hostview",
	"view/topologyView",
	"view/testView",
	"text!template/login.html",
	"text!template/controller.html",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Memory, Modules, Status, Uptime, Host, Test, MemoryView, ModulesView, StatusView, UptimeView, FlowEditor, FirewallEditor, HostView, TopologyView, TestView, loginTpl, controllerTpl){
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
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
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
			$('#content').append('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			// Create view for hosts
			this.hostview = new HostView({collection: new Host});
			
			// Delegate events for host view
			this.hostview.delegateEvents(this.hostview.events);
			
			this.hostCollection = this.hostview.collection;
			
			// Link host to id tag
			$('#content').empty();
			$('#content').append(this.hostview.render().el).trigger('create');
        },
		
		switchRoute: function() {
			$('#content').empty();
			$('#content').append('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
			
			// Clears out any previous intervals
			var syncCount = 0;
			clearInterval(this.interval);
			
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
			this.switchCollection = switchDetail.collection;
			switchDetail.listenTo(switchDetail.features, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.switchStats, "sync", syncComplete);
			switchDetail.listenTo(switchDetail.description, "sync", syncComplete);
			
			function syncComplete() {
  				syncCount += 1;
  				
  				if (syncCount == 3)
					switchDetail.render();
			}
		},
		
		staticFlowRoute: function() {
			$('#content').empty();
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');

			// Clears out any previous intervals
			clearInterval(this.interval);

			if (this.switchCollection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FlowEditor(switchDetail.collection, true);});
			}
			else
				new FlowEditor(this.switchCollection, true);
        },
        
        firewallRoute: function() {
        	$('#content').empty();
			$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');

			// Clears out any previous intervals
			clearInterval(this.interval);

			if (this.switchCollection === undefined){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				switchDetail.listenTo(switchDetail.switchStats, "sync", function () {new FirewallEditor(switchDetail.collection, true);});
			}
			else
				new FirewallEditor(this.switchCollection, true);
        },
        
        topologyRoute: function () {
        	$("#content").empty();
        	$('#content').prepend('<img class="innerPageLoader" src="img/ajax-loader.gif" />');
        	
        	var syncCount = 0;
        	
        	// Clears out any previous intervals
			clearInterval(this.interval);
			
			var self = this;
			if (this.hostCollection === undefined){
				//console.log("no host collection");
				this.hostview = new HostView({collection: new Host});
				this.hostview.delegateEvents(this.hostview.events);
				this.hostCollection = this.hostview.collection;
			}
			
			if (this.switchCollection === undefined){
				//console.log("no switch collection");
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
																		
				switchDetail.listenTo(switchDetail.features, "sync", syncComplete);
				switchDetail.listenTo(switchDetail.switchStats, "sync", syncComplete);
				switchDetail.listenTo(switchDetail.description, "sync", syncComplete);
			}
			
			else if(this.switchCollection.models.length > 0 && this.hostCollection.models.length > 0 && this.topology === undefined){
				this.topology = new TopologyView(self.switchCollection, self.hostCollection);
				this.topology.render();
			}
			 
			else if (this.topology != undefined)
				this.topology.render();
			
			else{
				//create graph nodes based on switch and host data
				this.hostview.listenTo(this.hostview.collection, "sync", function () {
					this.topology = new TopologyView(self.switchCollection, self.hostCollection);
					this.topology.render();
				});
			}
			
			function syncComplete() {
				//console.log("sync complete");
  					syncCount += 1;
  				
  					if (syncCount == 3)
  						renderSwitches();
			}
			
			function renderSwitches() {
					//console.log("renderSwitches");
  					self.switchCollection = switchDetail.collection;
					//create graph nodes based on switch and host data
					self.topology = new TopologyView(self.switchCollection, self.hostCollection);											
					self.topology.render();
			}
        },
        
        ADVAlancheRoute: function () {
        	//$('#content').empty();
        	// Clears out any previous intervals
			//clearInterval(this.interval);
			//console.log("advalanche.cs.marist.edu");
			//$('#content').append("ADVAlanche Coming Soon!");
        },

         qosRoute: function() {
			$('#content').empty();
			// Clears out any previous intervals
			clearInterval(this.interval);
			
			//this.testView = new TestView({model: new Test});
			
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