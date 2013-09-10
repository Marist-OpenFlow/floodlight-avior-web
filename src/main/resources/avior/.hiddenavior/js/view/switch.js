define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switch.html"
], function($, _, Backbone, ctrlTpl){
	var SwitchView = Backbone.View.extend({
		//... is a div tag.
		tagName:  "div",
		// Cache the template function for a single item.
		template: _.template(ctrlTpl),
		initialize: function(){
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		events: {
			"click button": "refresh",
		},
		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		refresh: function(){this.model.fetch();}
	});
	return SwitchView;
});

