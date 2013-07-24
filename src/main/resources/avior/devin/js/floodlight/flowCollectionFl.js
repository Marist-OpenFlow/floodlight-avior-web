 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection,dpid){
		FlowCollection.prototype.url = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
		FlowCollection.prototype.initialize = function(dpid) { 
			this.dpid = dpid; 
		};
		
		FlowCollection.prototype.parse = function(response){
			var parsed = [];
			// response = _.pluck(response, this.dpid);
			console.log("response ============= \n " + JSON.stringify(response));
   			for(var key in response){
      			parsed.push(response[key]);
   			}
   			console.log("Parsed stringify ============ \n" + JSON.stringify(parsed));
   			console.log("Parsed flattened ============ \n" + JSON.stringify(_.flatten(parsed)));
   			return parsed;
		};
	return FlowCollection;
});