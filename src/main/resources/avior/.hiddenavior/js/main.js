/*
 * loader.js - Configures dynamic module loader and starts Avior
 */
require.config({
	paths: {
		jquery: "lib/jquery",
		underscore: "lib/lodash",
		backbone: "lib/backbone.collectionView",
		template: "../tpl",
		openflow: "openflow/ofp"
	},
    shim: {
        "backbone" : {
            deps: ["jquery","underscore","lib/backbone"],
            exports: "Backbone"
        }
    }
});

require([
	"avior",
], function(Avior){
	Avior.initialize();
});

