define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"view/switchList",
	"collection/switchCollection",
	"model/description",
	"collection/portCollection",
	"floodlight/portFl",
	"model/port",
	"model/portStatistics",
	"text!template/switchesSumTemplate.html",
	"text!template/switchSummary.html",
	"text!template/description.html",
	"text!template/ports.html",
	"text!template/port.html",
	"text!template/getFlows.html",
], function($, _, Backbone, Features, SwitchStats, SwitchList, SwitchCollection, Description, PortCollection, PortFL, Port, PortStatistics, swtchsSumTpl, header, descrip, portFrame, portRow, flow){
	var SwitchesSumView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsSumTpl),
		template2: _.template(header),
		template3: _.template(descrip),
		template4: _.template(portFrame),
		template5: _.template(portRow),
		template6: _.template(flow),
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 	
		initialize: function(item){
			var self = this;
			this.collection = new SwitchCollection();
			this.collection.fetch();
			features = new Features();
			features.fetch();
			switchStats = new SwitchStats();
			switchStats.fetch();	
			this.listenTo(switchStats, "sync", this.render);
		},
		
		events: {
			"click button": "refresh",
			"click a": "clickSwitch",
		},
		
		// render the heading and table template, 
		// then render each model in this.collection
		render: function() {
			this.$el.html(this.template2(this.model.toJSON()));
			this.$el.append(this.template1);
			var self = this;
			
			_.forEach(self.collection.models, function(item) {
						item.set("features", features);
						item.set("switchStatistics", switchStats);
						item.set("id", item.get("dpid"));
  						self.renderSwitch(item);
  						console.log(JSON.stringify(item));
					}, this);
			
			
			//call these items before rendering switch to complete model attributes first
			//var features = new Features();
			//var switchStats = new SwitchStats();
			/*features.fetch().complete(function () {
				
				switchStats.fetch().complete(function () {
					
					//sets the id attribute of each model to its dpid
					//so that we can get models in the collection by dpid
					_.forEach(self.collection.models, function(item) {
						item.set("features", features);
						item.set("switchStatistics", switchStats);
						item.set("id", item.get("dpid"));
  						self.renderSwitch(item);
  						//console.log(JSON.stringify(item));
					}, this);
				});
			});*/
			
			return this;
		},
		
		renderSwitch: function(item){
			var switchList = new SwitchList({
				model: item
			});
			$('dt').append(switchList.render().el);
		},
		
		//create description model and port model
		//for specific dpid and place in view
		clickSwitch: function(e) {
			$('#container').remove();
			
			var oneSwitch = this.collection.get(e.currentTarget.id);
			var dpid = oneSwitch.get("dpid");
			
			this.displayDesc(dpid, oneSwitch);
			
			this.displayPorts(dpid, oneSwitch);
			
			this.displayFlows();
		},
		
		//attach switch description info to page
		displayDesc: function(dpid, oneSwitch){
			var desc = new Description(oneSwitch.get("description"));
			desc.set("dpid", dpid);
			desc.set("connectedSince", oneSwitch.get("connectedSince"));	
			this.$el.append(this.template3(desc.toJSON()));	
		},
		
		//attach port info to page
		displayPorts: function(dpid, oneSwitch){
			$('#container').append(this.template4());
			var ports = new PortCollection();
			var portArray = oneSwitch.get("ports");
			var portStatArray = new PortStatistics(dpid);
			var self = this;
			
			portStatArray.fetch().complete(function () {
				var numPorts = 0;
				_.forEach(portArray, function(item) {
					var p = new Port(item);
					p.set("portStatistics", portStatArray.get(dpid)[numPorts]);
        			ports.add(p);
        			numPorts += 1;
        			$('#portTable').append(self.template5(p.toJSON()));
        		}, this);
    	 	});
		},
		
		//attach flow info to page
		displayFlows: function(){
			$('#container').append(this.template6());
		},
		
		//updates this.collection with the latest switch info from server
		refresh: function(){
			features.fetch();
			this.collection.fetch();
			switchStats.fetch();
		}
	});
	return SwitchesSumView;
});