define([
	"underscore",
	"backbone",
	"util"
], function(_,Backbone,Util){
	/* Structure to hold controller metadata */
	var ModulesModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		
		defaults: {
			modules: [],
			moduleText: ''
		},
		parse: Util.missingCtlrErr,
	});
	return ModulesModel;
});

