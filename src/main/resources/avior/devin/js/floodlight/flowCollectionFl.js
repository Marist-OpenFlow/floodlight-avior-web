 define([
	"backbone",
	"util",
	"collection/flowCollection",
], function(Backbone,Util,FlowCollection,dpid){
	var FlowCollection = Backbone.Collection.extend({
		url: "/wm/core/switch/" + dpid + "/flow/json",
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