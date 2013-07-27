define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/uptimetpl.html",
], function($, _, Backbone, uptimeTpl){
	var UptimeView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(uptimeTpl),
		
		initialize: function(){
			var self = this;
			setInterval(function(){self.model.fetch()}, 3000);
			this.model.fetch();
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
			//document.write("Hello");
			var blue = (document.getElementById("switchesButton"));
			blue.onclick = function() {alert("clicked");};
		},
		events: {
			"click #loadup": "refresh",
			"click #switchesButton": "clicked",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Uptime model ----------------->");
			console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();},
		
		clicked: function() {console.log("HELLO");},
	});
	return UptimeView;
});
