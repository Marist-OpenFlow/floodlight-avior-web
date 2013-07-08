define([
	"collection/flowEdCollection"
], function(FlowEdCollection){
	//get list of switch features connected to controller
	FlowEdCollection.prototype.url = "/wm/core/switch/all/flow/json"; 
	return FlowEdCollection;
});