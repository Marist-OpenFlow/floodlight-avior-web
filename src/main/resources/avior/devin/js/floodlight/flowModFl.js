define([
	"model/flowMod"
], function(FlowMod){
	//push flows!
	FlowMod.prototype.url = "/wm/staticflowentrypusher/json"; 
	return FlowMod;
});