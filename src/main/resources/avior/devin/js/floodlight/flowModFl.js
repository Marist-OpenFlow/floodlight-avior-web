define([
	"model/flowMod"
], function(FlowMod){
	//push flows!
	FlowMod.prototype.urlRoot = function () {
		if (this.dpid === "null"){
			this.unset(this.dpid);
			return "/wm/staticflowentrypusher/json";
		}
		else
			return "/wm/staticflowentrypusher/clear/" + this.dpid + "/json";
	}; 
	FlowMod.prototype.initialize = function(dpid) {this.dpid = dpid;}; 
	return FlowMod;
});