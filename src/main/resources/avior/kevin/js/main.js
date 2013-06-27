/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery",
		underscore: "lib/lodash",
		backbone: "lib/backbone",
		template: "../tpl",
		openflow: "openflow/ofp"
	},
    shim: {
        "backbone" : {
            deps: ["jquery","underscore"],
            exports: "Backbone"
        }
    }
});

require([
	"avior2",
], function(Avior){
	Avior.initialize();
});

