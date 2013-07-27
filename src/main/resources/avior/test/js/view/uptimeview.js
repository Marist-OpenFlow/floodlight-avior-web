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
			this.model.fetch();
			// this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "sync", this.render);
			this.setupInterval();
		},
		events: {
			"click #loadup": "refresh",
			"click #controllerAccordian": "clickable",
		},
		// Re-render the titles of the todo item.
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log("Uptime model ----------------->");
			console.log(JSON.stringify(this.model));
			return this;
	    },
		refresh: function(){this.model.fetch();},
		
		//not a viable solution (issues with multiple clicks of controller button)
		setupInterval: function() {
			var self = this;

			var interval1 = setInterval(function(){self.model.fetch()}, 3000);
			var buttonArray = ["switchesButton", "staticflowmanagerButton", "qosButton", "vfilterButton", "loadbalancerButton"];
									   
			for (var x in buttonArray)
				(document.getElementById(buttonArray[x])).onclick = function() {clearInterval(interval1);};
				
			var controllerButton = (document.getElementById("controllerButton"));
			controllerButton.onclick = function() {
											var actualSelf = self;
											var interval2 = setInterval(function(){actualSelf.model.fetch()}, 3000);
											for (var x in buttonArray)
												(document.getElementById(buttonArray[x])).onclick = function() {clearInterval(interval2);}; 										
									   };
		},
		
		clickable: function() {
			console.log("hi");
		},
	});
	return UptimeView;
});

