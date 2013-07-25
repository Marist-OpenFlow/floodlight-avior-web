define([
	"underscore",
	"backbone",
	"util"
], function(_,Backbone,Util){
	/* Structure to hold controller metadata */
	var ModulesModel = Backbone.Model.extend({
		urlRoot: Util.missingCtlrErr,
		
		/*
		defaults: {
			modules: [],
			moduleText: ''
		},
		*/
		initialize: function(obj) {
			if (obj) { 
				var temp = this.parse(obj); 
				this.model.modules = temp;
				console.log("testing testing ============");
				console.log(this.model.modules);
				console.log("============================");
			}
			else console.log('failure');
		},
		
		parse: Util.missingCtlrErr,
		
	});
	return ModulesModel;
});

