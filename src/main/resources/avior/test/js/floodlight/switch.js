define([
	"collection/switchCollection"
], function(SwitchCollection){
	//get list of switch features connected to controller
	SwitchCollection.prototype.url = function(){return "/wm/core/controller/switches/json";}; 
	return SwitchCollection;
});