 define([
	"backbone",
	"util",
], function(Backbone,Util){
	var PortCollection = Backbone.Collection.extend({
		url: Util.missingCtlrErr,
		
		comparator: function(collection){
    		return(collection.get("portNumber"));
  		}
	});
	return PortCollection;
});