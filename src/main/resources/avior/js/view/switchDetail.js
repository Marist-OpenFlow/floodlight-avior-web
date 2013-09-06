define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"view/switchSummary", // should rename this, maybe SwitchSummary?
	"collection/switchCollection",
	"floodlight/descriptionFl",
	"collection/portCollection",
	"floodlight/portFl",
	"model/port",
	"model/portStatistics",
	"floodlight/flowModFl",
	"view/flowEditor",
	"floodlight/flowCollectionFl",
	"text!template/switchContainer.html",
	"text!template/switchHeading.html",
	"text!template/description.html",
	"text!template/portTable.html",
	"text!template/portRow.html",
	"text!template/flowTable.html",
	"text!template/flowEntry.html",
	"text!template/flowCount.html",
], function($, _, Backbone, Marionette, Features, SwitchStats, SwitchSummary, SwitchCollection, Description, PortCollection, PortFL, Port, PortStatistics, FlowMod, FlowEditor, FlowCollection, swtchContainer, header, descrip, portFrame, portRow, flowFrame, flowRow, flowCount){
	var SwitchesSumView = Backbone.View.extend({
		itemView: SwitchSummary,
		
		el: $('#content'),
			
		template1: _.template(swtchContainer),
		template2: _.template(header),
		template3: _.template(descrip),
		template4: _.template(portFrame),
		template5: _.template(portRow),
		template6: _.template(flowFrame),
		template7: _.template(flowRow),
		template8: _.template(flowCount),
		currentDPID: '',
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 	
		initialize: function(item){
			var self = this;
			this.collapsed = true;
			this.subnets = new Array;
			this.collection = new SwitchCollection();
			this.collection.fetch();
			description = new Description();
			description.fetch().complete(function () {
				//console.log(JSON.stringify(description.get("00:00:00:00:00:00:00:03")));
				}, this);
			features = new Features();
			features.fetch();
			this.switchStats = new SwitchStats();
			this.switchStats.fetch();	
			this.listenTo(this.switchStats, "sync", this.setCollection);
		},
		
		events: {
			"click #loadswtch": "refresh",
			//"click #flowMod": "modFlows",
			"click #removeFlo": "deleteFlow",
		},
		
		//render the heading and table template, 
		//then render each model in this.collection
		render: function() {
		    
		    // hack to turn template HTML into object without yet adding it to document
		    var switchList = $('<div/>').html(this.template1).contents();
			var self = this;

			_.forEach(self.collection.models, function(item) {
  				self.renderSwitch(item, switchList);
			}, this);
			
			switchCount = this.collection.length;
			
			this.$el.html(this.template2(switchCount)).trigger('create');
			switchList.appendTo(this.$el).trigger('create');
			
			//switch details appending...move to specific 
			//functions for description, ports, flows
			_.forEach(self.collection.models, function(item) {
				//console.log("ITEM");
				//console.log(item);
				var dp = item.get("dpid");	
				//this.displayDesc(dp, item);
				this.displayPorts(dp, item);
    	 		this.displayFlows(dp, item);		
			}, this);		
			return this;
		},
		
		//set the attribute of this.collection
		setCollection: function () {
			var self = this;
			_.forEach(this.collection.models, function(item) {
						
						var dp = item.get("dpid");
						item.set("description", features.get(dp));
						item.set("features", features.get(dp));
						item.set("switchStatistics", self.switchStats.get(dp));
						item.set("id", item.get("dpid"));
  						//self.renderSwitch(item, switchList);
  						console.log((item));
					}, this);
					
			//console.log(JSON.stringify(description.get("00:00:00:00:00:00:00:03")));
		},
		
		//display the dpid list
		renderSwitch: function(item,container){
			var switchSum = new SwitchSummary({
				model: item
			});
			container.append(switchSum.render().el);
		},
		
		
		//attach switch description info to page
		displayDesc: function(dpid, oneSwitch){
			var x = document.getElementById("my" + dpid);
			var desc = new Description(oneSwitch.get("description"));
			desc.set("dpid", dpid);
			desc.set("connectedSince", oneSwitch.get("connectedSince"));	
			$(x).append(this.template3(desc.toJSON())).trigger('create');
		},
		
		//attach port info to page
		displayPorts: function(dpid, oneSwitch){
			var self = this;
			var x = document.getElementById("my" + dpid);
			var y = document.getElementById("container" + dpid);
			$(y).append(this.template4(oneSwitch.toJSON())).trigger('create');
			var ports = new PortCollection();
			var portArray = oneSwitch.get("ports");
			//console.log("PORT ARRAY");
			//console.log(portArray);
			var portStatArray = new PortStatistics(dpid);
					
			
			//get port statistics, append as a submodel to port model
			//and append port model to port collection
			portStatArray.fetch().complete(function () {
				var numPorts = 0;
				_.forEach(portArray, function(item) {
					//console.log("PORT STAT ARRAY");
					//console.log(portStatArray);
					var p = new Port(item);
					p.set("portStatistics", portStatArray.get(dpid)[numPorts]);
        			ports.add(p);
        			numPorts += 1;
        		}, this);
     					
     					
        		_.forEach(ports.models, function(item) {
        			var z = document.getElementById("portTable" + dpid);
					$(z).append(self.template5(item.toJSON())).trigger('create');
        		}, this);
        		oneSwitch.set("portModel", ports);
        	});
		},
		
		//attach flow info to page
		displayFlows: function(dpid, oneSwitch){
			var self = this;
			var flows = new FlowCollection(dpid);
			flows.fetch().complete(function () {
				//console.log(flows.length);
				

        			var x = document.getElementById("my" + dpid);    	
					$(x).append(self.template8(oneSwitch.toJSON())).trigger('create');
        			var z = document.getElementById("flowCount" + dpid);
					
				_.forEach(flows.models, function(item) {
					if (item != null){
						$(z).remove();
						oneSwitch.set("flowLength", flows.length);
						
						if (document.getElementById("flowTable" + dpid) === null) {
							var x = document.getElementById("my" + dpid);    	
							$(x).append(self.template6(oneSwitch.toJSON())).trigger('create');
						}

						var y = document.getElementById("flowTable" + dpid);
						$(y).append(self.template7(item.toJSON())).trigger('create');
					}
				}, this);
			});
		},
		
		//updates this.collection, features and switchStats
		//with the latest switch info from server
		refresh: function(){
			features.fetch();
			this.collection.fetch();
			this.switchStats.fetch();
		},
		
		modFlows: function () {
			//$('#content').empty();
			new FlowEditor(this.collection, true);
		},
		
		deleteFlow: function(e) {
			var v = e;
			//console.log(v);
			//console.log("delete a flow!");
			//$('#container').remove();
			this.flowEditor = new FlowEditor(this.collection, false);
			this.flowEditor.deleteFlow("red");
		},
		
	});
	return SwitchesSumView;
});
