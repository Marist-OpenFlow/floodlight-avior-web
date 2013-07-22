define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/controller/modulestpl.html"
], function($, _, Backbone, modTpl){
	var ModulesView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(modTpl),
		
		initialize: function(){
			var self = this;
			this.model.fetch({
				success: function(data){
					console.log(JSON.stringify(data));
				}
			});
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
		},
		events: {
			"click #loadmod": "refresh",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Modules model ----------------->");
			console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();}
	});
	return ModulesView;
});

