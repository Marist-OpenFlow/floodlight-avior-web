define([
	"jquery",
	"underscore",
	"backbone",
	"view/switch",
	"view/SwitchHeading",
	"collection/switchcollection",
	"text!template/switches.html",
	"text!template/switchHeading.html",
], function($, _, Backbone, SwitchView, SwitchHeading, SwitchCollection, swtchsTpl, header){
	var SwitchesView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(swtchsTpl),
		template2: _.template(header),
			
		initialize: function(item){
			var self = this;
			this.collection = new SwitchCollection();
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

			
			return this;
		},
		
		renderSwitch: function(item){
			var switchView = new SwitchView({
				model: item
			});
			$('table').append(switchView.render().el);
		},
		
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesView;
});