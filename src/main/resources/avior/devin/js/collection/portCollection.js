 define([
	"backbone",
	"util",
], function(Backbone,Util){
	var PortCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr
	});
	return PortCollection;
});