 define([
	"backbone",
	"util",
	"model/host",
], function(Backbone,Util,Host){
	/* Structure to hold flow models */
	var HostCollection = Backbone.Collection.extend({
		model: Host,
		url: Util.missingCtlrErr,
	});
	return HostCollection;
});