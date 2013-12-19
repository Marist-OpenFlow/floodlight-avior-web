 define([
	"backbone",
	"util",
	"model/portStatCollectorModel",
], function(Backbone,Util,PortStatCollectorModel){
	/* Structure to hold flow models */
	var PortStatCollectorCollection = Backbone.Collection.extend({
		model: PortStatCollectorModel,
		url: Util.missingCtlrErr,
	});
	return PortStatCollectorCollection;
}); 