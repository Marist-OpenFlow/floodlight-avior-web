/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery",
		jquerymob: "lib/jquery.mobile",
		underscore: "lib/lodash",
		backbone: "lib/backbone",
		marionette: "lib/backbone.marionette",
		template: "../tpl",
		openflow: "openflow/ofp"
	},
    shim: {
        "backbone" : {
            deps: ["jquery", "jquerymob", "underscore"],
            exports: "Backbone"
        },
        "marionette": {
        	deps: ["jquery", "jquerymob", "underscore", "backbone"],
        	exports: "Marionette"
        }
    },
});

require([
	"avior",
], function(Avior){
	Avior.initialize();
});

