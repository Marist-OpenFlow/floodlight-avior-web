define([
	"collection/flowcollection"
], function(FlowCollection, switchDPID){
	//get list of flow features connected to a switch
	FlowCollection.prototype.urlRoot = "/wm/core/switch/all/json"; 
	return FlowCollection;
});