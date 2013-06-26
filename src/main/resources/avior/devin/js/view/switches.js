define([
	"jquery",
	"underscore",
	"backbone",
	"view/switch",
	"collection/switchcollection",
	"text!template/switches.html"
], function($, _, Backbone, SwitchView, SwitchCollection, swtchsTpl){
	var SwitchesView = Backbone.View.extend({
		el: $("#table"),
			
		template: _.template(swtchsTpl),
			
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
			this.$el.html(this.template(this.model.toJSON()));
			
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
			this.$el.append(switchView.render().el);
		},
		
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesView;
});