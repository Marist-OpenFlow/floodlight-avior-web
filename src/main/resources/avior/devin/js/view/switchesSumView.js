define([
	"jquery",
	"underscore",
	"backbone",
	"view/switchSumView",
	"collection/switchSumCollection",
	"view/switches",
	"text!template/switchesSumTemplate.html",
	"text!template/switchSummary.html",
], function($, _, Backbone, SwitchSumView, SwitchSumCollection, SwitchesView, swtchsSumTpl, header){
	var SwitchesSumView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsSumTpl),
		template2: _.template(header),
			
		// construct a new collection with switch info from server
		// and render this collection upon sync with server 	
		initialize: function(item){
			var self = this;
			this.collection = new SwitchSumCollection();
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
			var switchSumView = new SwitchSumView({
				model: item
			});
			$('dt').append(switchSumView.render().el);
		},
		
		//call switchesView and then append it to the document
		clickSwitch: function(e) {
			var x = this.collection.get(e.currentTarget.id);
			console.log(JSON.stringify(x));
			var switchesView = new SwitchesView({
				model: x
			});
			this.$el.append(switchesView.render().el);
		},
		
		//updates this.collection with the latest switch info from server
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesSumView;
});