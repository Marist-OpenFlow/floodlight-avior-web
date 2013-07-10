define([
	"model/portStatistics"
], function(PortStatistics){
	//get list of port features connected to controller
	PortStatistics.prototype.urlRoot = function() {return "/wm/core/switch/" + this.dpid + "/port/json";};
	PortStatistics.prototype.initialize = function(dpid) {this.dpid = dpid; console.log(this.dpid);};
	return PortStatistics;
});