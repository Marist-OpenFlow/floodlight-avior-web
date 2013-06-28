define([
	"collection/switchSumCollection"
], function(SwitchSumCollection){
	//get list of switches connected to controller
	SwitchSumCollection.prototype.url = "/wm/core/controller/switches/json"; 
	return SwitchSumCollection;
});