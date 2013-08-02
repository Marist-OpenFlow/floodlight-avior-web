define([
	"jquery",
	"underscore",
	"backbone",
	"router/router",
], function($, _, Backbone, Router){
	return { 
		Router: Router,

		initialize: function(){
			//$(document).ready(function(){
				$(document).bind('pageinit');
				$(function() { $("#some-div").show(); });
				$.mobile.linkBindingEnabled = false;
    			$.mobile.hashListeningEnabled = false;
				
				var router = new Router();
				Backbone.history.start();
			//});
		}
	};
});
