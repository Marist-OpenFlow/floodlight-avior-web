define([
	"jquery",
	"underscore",
	"backbone",
	"view/switch",
	"collection/switchcollection"
], function($, _, Backbone, Switch, SwitchCollection){
	var SwitchesView = Backbone.View.extend({
		tagName: "div",
			
		initialize: function(item){
			this.collection = new SwitchCollection();
			this.render();
		},
		
		events: {
			"click button": "refresh",
		},
		
		render: function() {
			var self = this;
			_.each(this.collection.models, function(item){
				self.renderSwitch(item);
			}, this);
			return this;
		},
		
		renderSwitch: function(item){
			var switchView = new SwitchView({
				model: item
			});
			alert("renderSwitch");
			this.$el.append(switchView.render().el);
		},
		
		refresh: function(){this.model.fetch();}
	});
	return SwitchesView;
});