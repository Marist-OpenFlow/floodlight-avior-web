define([
	"model/features"
], function(Features){
	//get list of switch features connected to controller
	Features.prototype.url = "/wm/core/switch/all/features/json"; 
	return Features;
});