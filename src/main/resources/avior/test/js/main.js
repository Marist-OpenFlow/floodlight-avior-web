/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery",
		underscore: "lib/lodash",
		backbone: "lib/backbone",
		marionette: "lib/backbone.marionette",
		template: "../tpl",
		openflow: "openflow/ofp"
	},
    shim: {
        "backbone" : {
            deps: ["jquery","underscore"],
            exports: "Backbone"
        },
        "marionette": {
        	deps: ["jquery", "underscore", "backbone"],
        	exports: "Marionette"
        }
    },
});

require([
	"avior",
], function(Avior){
	Avior.initialize();
});

