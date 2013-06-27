define([
	"collection/flowcollection"
], function(FlowCollection, switchDPID){
	//get list of flow features connected to a switch
	FlowCollection.prototype.url = "/wm/core/switch/" + switchDPID + "/json"; 
	return FlowCollection;
});