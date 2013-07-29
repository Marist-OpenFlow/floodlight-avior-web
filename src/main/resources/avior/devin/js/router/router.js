define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
], function($, _, Backbone, Marionette){
	var Router = Marionette.AppRouter.extend({
		routes: {
			"switches": "switchRoute",
		},	
		
		switchRoute: function() {
			console.log("router routing routes");
		},
	});
	return Router;
}); 