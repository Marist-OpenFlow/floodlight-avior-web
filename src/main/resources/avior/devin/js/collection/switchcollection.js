define([
	"backbone",
	"util",
	"model/switch"
], function(Backbone,Util,Switch){
	var SwitchCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: Switch,
	});
	return SwitchCollection;
});

