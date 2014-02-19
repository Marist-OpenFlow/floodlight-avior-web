define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/firewallModFl",
	"text!template/controller.html",
], function($, _, Backbone, FirewallMod, controllerTpl){
	var ControllerView = Backbone.View.extend({
		el: $('#content'),
		tagName:  "option",
		
		template1: _.template(controllerTpl),

		events: {
			// listen for change event (not click) on the #flip-2 element
			// then check the value property of #flip-2 element
			// and if "on" then call enableRules, otherwise call disableRules
			// $('#flip-2').value
			"change select": "decideRules",
		},
		//decides which firewall function to call
		decideRules: function(){
			if($('#flip-2').value === "on"){"disableRules";}
			else{"enableRules";}	
		}
		// move to toggle on/off buttons in the upper right hand corner
		enableRules: function () {
			var op = "enable";
			var enableRules = new FirewallMod(op);
			enableRules.fetch();
		},
		
		// move to toggle on/off buttons in the upper right hand corner
		disableRules: function () {
			var op = "disable";
			var disableRules = new FirewallMod(op);
			disableRules.fetch();
		},
		
		render: function() {
			//$('#container2').remove();
			$('#content').empty();
			this.$el.html(this.template1({coll: this.collection.toJSON()})).trigger('create');
		},

	});
	return ControllerView;
});