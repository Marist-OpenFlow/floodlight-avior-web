define([
	"model/portStatistics"
], function(PortStatistics){
	//get list of port features connected to controller
	PortStatistics.prototype.url = function() {return "/wm/core/switch/this.dpid/port/json";}; 
	return PortStatistics;
});