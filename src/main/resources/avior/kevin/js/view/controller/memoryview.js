define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/controller/memorytpl.html"
], function($, _, Backbone, memTpl){
	var MemoryView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(memTpl),
		
		initialize: function(){
			this.model.fetch();
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
		},
		events: {
			"click #loadmem": "refresh",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Memory model ----------------->");
			console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();}
	});
	return MemoryView;
});

