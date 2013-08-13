/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery",
		jquerymob: "lib/jquery.mobile",
		responsiveTables: "lib/responsive-tables",
		underscore: "lib/lodash",
		backbone: "lib/backbone",
		marionette: "lib/backbone.marionette",
		template: "../tpl",
		openflow: "openflow/ofp"
	},
    shim: {
        "backbone" : {
            deps: ["jquery", "jquerymob", "responsiveTables", "underscore"],
            exports: "Backbone"
        },
        "marionette": {
        	deps: ["jquery", "jquerymob", "responsiveTables", "underscore", "backbone"],
        	exports: "Marionette"
        }
    },
});

require([
	"avior",
], function(Avior){
	Avior.initialize();
});

