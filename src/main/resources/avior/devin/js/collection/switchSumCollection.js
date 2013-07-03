define([
	"backbone",
	"util",
	"model/switchSumModel"
], function(Backbone,Util,SwitchSumModel){
	var SwitchSumCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: SwitchSumModel,
	});
	return SwitchSumCollection;
});

