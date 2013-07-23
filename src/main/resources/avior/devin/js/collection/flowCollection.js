 define([
	"backbone",
	"util",
], function(Backbone,Util){
	var FlowCollection = Backbone.Collection.extend({
		parse: function(response){
			var parsed = [];
   			for(var key in response){
      		parsed.push(response[key]);
   			}
   		return parsed;
		}
	});
	return FlowCollection;
});