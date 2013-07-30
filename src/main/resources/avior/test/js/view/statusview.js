define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/statustpl.html"
], function($, _, Backbone, statTpl){
	var StatusView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(statTpl),
		
		initialize: function(){
			this.collapsed = true;
			this.model.fetch();
			var self = this;
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
			$('.controllerHeading').click(function() {self.clickable();});
		},
		events: {
			"click #loadstat": "refresh",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			//console.log("Status model ----------------->");
			//console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();},
		
		//only call fetch when the view is visible
		clickable: function() {
			if (this.collapsed){
				this.collapsed = false;
				var self = this;
				this.interval = setInterval(function(){self.model.fetch()}, 4000);
			}
			else{
				this.collapsed = true;
				clearInterval(this.interval);
			}
		},
	});
	return StatusView;
});
