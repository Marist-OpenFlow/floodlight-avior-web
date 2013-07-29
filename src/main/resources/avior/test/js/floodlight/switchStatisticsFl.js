define([
	"model/switchStatistics"
], function(SwitchStatistics){
	//get list of switch features connected to controller
	SwitchStatistics.prototype.url = "/wm/core/switch/all/aggregate/json"; 
	return SwitchStatistics;
});