define([
	"jquery",
	"underscore",
	"backbone",
	"router/router",
], function($, _, Backbone, Router){
	return { 
		Router: Router,

		initialize: function(){
			$(document).ready(function(){
				$.mobile.linkBindingEnabled = false;
    			$.mobile.hashListeningEnabled = false;
				
				var router = new Router();
				Backbone.history.start();
			});
		}
	};
});
