define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/controller/memorytpl.html"
], function($, _, Backbone, memTpl){
	var MemoryView = Backbone.View.extend({
	    tagName: "mem",
	    
		template: _.template(memTpl),
		
		initialize: function(){
			this.model.fetch()
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

