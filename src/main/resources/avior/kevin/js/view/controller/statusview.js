define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/controller/statustpl.html"
], function($, _, Backbone, statTpl){
	var StatusView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(statTpl),
		
		initialize: function(){
			this.model.fetch();
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
		},
		events: {
			"click #loadstat": "refresh",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Status model ----------------->");
			console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();}
	});
	return StatusView;
});
