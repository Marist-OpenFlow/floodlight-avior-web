define([
	"model/flow"
], function(Flow){
	//get list of flows connected to controller
	Flow.prototype.urlRoot = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
	return Flow;
});