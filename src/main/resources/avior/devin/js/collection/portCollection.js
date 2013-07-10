 define([
	"backbone",
	"util",
	"model/port"
], function(Backbone,Util,Port){
	var PortCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		model: Port,
	});
	return PortCollection;
});