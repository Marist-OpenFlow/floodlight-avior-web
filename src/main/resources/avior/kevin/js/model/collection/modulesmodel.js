define([
	"backbone",
	"util"
], function(Backbone,Util){
	/* Structure to hold controller metadata */
	var Modules = Backbone.Model.extend({
		url: Util.missingCtlrErr,
		defaults: {
			modules: [],
			moduleText: ''
		},
	});
	return Modules;
});

