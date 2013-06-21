define([
	"backbone",
	"util",
	"model/port"
], function(Backbone,Util,Port){
	var PortCollection = Backbone.Collection.extend({
		model: Port,
		toJSON: function() { return this.models; }
	});
	return PortCollection;
});

