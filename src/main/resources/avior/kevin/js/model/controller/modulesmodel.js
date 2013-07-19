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
		
		initialize: function(data){
			var self = this;
			self.set({modules:_.keys(data)});
            self.set({moduleText:_.reduce(_.keys(data), function(s, m) {return s+m.replace("net.floodlightcontroller", "n.f")+", "}, '')});
		},
	});
	return ModulesModel;
});

