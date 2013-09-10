define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switchsummary.html"
], function($, _, Backbone, sumTpl){
	var SwitchView = Backbone.View.extend({
		//... is a div tag.
		tagName:  "div",
		// Cache the template function for a single item.
		template: _.template(sumTpl),
		initialize: function(){
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		events: {
			"click button": "refresh"
		},
		// Re-render the titles of the todo item.
		render: function() {
			alert(JSON.stringify(this.model.toJSON()));
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		refresh: function(){this.model.fetch();}
	});
	return SwitchView;
});
