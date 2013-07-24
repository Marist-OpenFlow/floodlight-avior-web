 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection){
		FlowCollection.prototype.url = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
		FlowCollection.prototype.initialize = function(dpid) { 
			this.dpid = dpid; 
		};
		
		FlowCollection.prototype.parse = function(response){
		    var innerArray = response[this.dpid];
			
   			return innerArray;
   			//alert(JSON.stringify(innerArray));
			//this.set(innerArray);
   			//alert(this.models.length);
		}; 
	return FlowCollection;
});