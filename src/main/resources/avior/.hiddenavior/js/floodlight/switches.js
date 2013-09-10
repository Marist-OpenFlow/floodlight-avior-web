define([
	"collection/switch"
], function(SwitchCollection){
	//get list of switch features connected to controller
	SwitchCollection.prototype.url = "/wm/core/controller/switches/json";
	return SwitchCollection;
});
