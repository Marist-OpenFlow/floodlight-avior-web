define([
	"jquery",
	"underscore",
	"backbone",
	"view/flowview",
	"collection/flowcollection",
	"text!template/flow.html",
], function($, _, Backbone, FlowView, FlowCollection, flowTpl){
	var FlowsView = Backbone.View.extend({
		tagName: "tbody",
		
		template: _.template(flowTpl),
		
		render: function() {
			var self = this;
			this.collection = new FlowCollection();
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
  				self.renderFlow(item);
			}, this);

			
			return this;
		},
		
		renderFlow: function(item){
			var flowView = new FlowView({
				model: item
			});
			this.$el.append(flowView.render().el);
		},
		
		refresh: function(){this.collection.fetch();}
	});
	return FlowsView;
});