 define([
	"model/deleteFlows"
], function(DeleteFlows){
	//push flows!
	DeleteFlows.prototype.urlRoot = function() {return "/wm/staticflowentrypusher/clear/all/";};
	DeleteFlows.prototype.id = "json";
	//DeleteFlows.prototype.initialize = function(dpid) {this.dpid = dpid;}; 
	return DeleteFlows;
});