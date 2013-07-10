 define([
	"backbone",
	"util",
	"model/port"
], function(Backbone,Util,Port){
	var PortCollection = Backbone.Collection.extend({
		model: Port,
	});
	return PortCollection;
});