define([
	"jquery",
	"underscore",
	"backbone",
	"view/switch",
	"collection/switchcollection"
], function($, _, Backbone, SwitchView, SwitchCollection){
	var SwitchesView = Backbone.View.extend({
		tagName: "body",
			
		initialize: function(item){
			var self = this;
			this.collection = new SwitchCollection();
			this.collection.fetch({
                success:function () {
                    console.log(arguments);
                    self.render();
                }
            });	
			this.listenTo(this.collection, "change", this.render);
			this.listenTo(this.collection, "destroy", this.remove);
		},
		
		events: {
			"click button": "refresh",
		},
		
		render: function() {
			console.log("in render");
			var self = this;

			_.forEach(this.collection.models, function(item) {
  				self.renderSwitch(item);
			}, this);
			
			console.log("render complete");
			
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