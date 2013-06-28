define([
	"jquery",
	"underscore",
	"backbone",
	"view/switchSumView",
	"collection/switchSumCollection",
	"text!template/switchesSumTemplate.html",
	"text!template/switchSummary.html",
], function($, _, Backbone, SwitchSumView, SwitchSumCollection, swtchsSumTpl, header){
	var SwitchesSumView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsSumTpl),
		template2: _.template(header),
			
		initialize: function(item){
			var self = this;
			this.collection = new SwitchSumCollection();
			this.collection.fetch();	
			this.listenTo(this.collection, "sync", this.render);
		},
		
		events: {
			"click button": "refresh",
		},
		
		render: function() {
			this.$el.html(this.template2(this.model.toJSON()));
			this.$el.append(this.template1);
			
			var self = this;

			_.forEach(this.collection.models, function(item) {
  				self.renderSwitch(item);
			}, this);


			_.forEach(this.collection.models, function(item) {
  				console.log(JSON.stringify(item));
			}, this);
			
			
			return this;
		},
		
		renderSwitch: function(item){
			var switchSumView = new SwitchSumView({
				model: item
			});
			$('table').append(switchSumView.render().el);
		},
		
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesSumView;
});