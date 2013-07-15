define([
	"model/flowMod"
], function(FlowMod){
	//push flows!
	FlowMod.prototype.urlRoot = "/wm/staticflowentrypusher/json"; 
	return FlowMod;
});