define([
	"jquery",
	"underscore",
	"backbone",
	"view/switchList",
	"collection/switchCollection",
	"view/switches",
	"model/description",
	"collection/portCollection",
	"floodlight/portFl",
	"model/port",
	"model/portStatistics",
	"text!template/switchesSumTemplate.html",
	"text!template/switchSummary.html",
	"text!template/description.html",
	"text!template/ports.html",
], function($, _, Backbone, SwitchList, SwitchCollection, SwitchesView, Description, PortCollection, PortFL, Port, PortStatistics, swtchsSumTpl, header, descrip, portFrame){
	var SwitchesSumView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsSumTpl),
		template2: _.template(header),
		template3: _.template(descrip),
		template4: _.template(portFrame),
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 	
		initialize: function(item){
			var self = this;
			this.collection = new SwitchCollection();
			this.collection.fetch();	
			this.listenTo(this.collection, "sync", this.render);
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

			//sets the id attribute of each model to its dpid
			//so that we can get models in the collection by dpid
			_.forEach(this.collection.models, function(item) {
				item.set("id", item.get("dpid"));
  				self.renderSwitch(item);
			}, this);
			
			return this;
		},
		
		renderSwitch: function(item){
			var switchList = new SwitchList({
				model: item
			});
			$('dt').append(switchList.render().el);
		},
		
		//create description model for specific dpid and place in view
		clickSwitch: function(e) {
			var oneSwitch = this.collection.get(e.currentTarget.id);
			var dpid = oneSwitch.get("dpid");
			var desc = new Description(oneSwitch.get("description"));
			
			desc.set("dpid", dpid);
			desc.set("connectedSince", oneSwitch.get("connectedSince"));	
			this.$el.append(this.template3(desc.toJSON()));	
			
			var ports = new PortCollection();
			var portArray = oneSwitch.get("ports");
			console.log(JSON.stringify(portArray));
			var portStatArray = new PortStatistics(dpid);
			portStatArray.fetch().complete(function () {
				console.log(JSON.stringify(portStatArray.get(dpid)[0]));
    	 	});
    	 	
			//var ports = new PortCollection(oneSwitch.get("dpid"));
			//var port = new Port(oneSwitch.get("dpid"))
			//var ports = new PortCollection();
			//var portStats = new PortStatistics(oneSwitch.get("dpid"));
			this.$el.append(this.template4());
				
		},
		
		//updates this.collection with the latest switch info from server
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesSumView;
});