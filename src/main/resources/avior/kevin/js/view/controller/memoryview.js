define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/controller.html"
], function($, _, Backbone, ctrlTpl){
	var MemoryView = Backbone.View.extend({
		//... is a div tag.
	    tagName:  "poop",
	    // Cache the template function for a single item.
		//template: _.template($('#controller-template').html()),
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
	return MemoryView;
});

