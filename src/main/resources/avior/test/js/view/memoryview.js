define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/memorytpl.html"
], function($, _, Backbone, memTpl){
	var MemoryView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(memTpl),
		
		initialize: function(){
			var self = this;
			this.model.fetch();
			this.collapsed = true;
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
			$('#controllerHeading').click(function() {self.clickable();});
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
		refresh: function(){this.model.fetch();},
		
		//only call fetch when the view is visible
		clickable: function() {
			if (this.collapsed){
				this.collapsed = false;
				var self = this;
				this.interval = setInterval(function(){self.model.fetch()}, 2000);
			}
			else{
				this.collapsed = true;
				clearInterval(this.interval);
			}
		},
	});
	return MemoryView;
});

