define([
	"collection/switchCollection"
], function(SwitchCollection){
	// create the SUPER CONTROLLER MODEL
	SwitchCollection.prototype.urlRoot = function(){return "/wm/core/controller/switches/json";}; 
	return SwitchCollection;
});