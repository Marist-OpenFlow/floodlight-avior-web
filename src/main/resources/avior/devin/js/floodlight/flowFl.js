define([
	"model/flow"
], function(Flow){
	//get list of flows connected to controller
	//Flow.prototype.urlRoot = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
	//Flow.prototype.initialize = function(dpid) {this.dpid = dpid;};
	return Flow;
});