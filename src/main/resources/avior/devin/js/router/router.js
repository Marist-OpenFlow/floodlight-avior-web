define([
	"jquery",
	"underscore",
	"backbone",
], function($, _, Backbone){
	var Router = Backbone.Router.extend({
		routes: {
			"switches": "defaultRoute",
		},	
		
		defaultRoute: function() {
			console.log("router routing routes");
		},
	});
	return Router;
}); 