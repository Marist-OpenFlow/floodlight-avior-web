define([
	"model/portStatistics"
], function(PortStatistics){
	//get list of port features connected to controller
	PortStatistics.prototype.urlRoot = function() {return "/wm/core/switch/all/port/json";};
	PortStatistics.prototype.initialize = function(dpid) {this.dpid = dpid;};
	
	/*PortStatistics.prototype.parse = function(resp) {
		var newResp = new Object;
		for (var key in resp){
			//console.log(JSON.stringify(resp[key].xid));	
			object = new Object;
			object.length = resp[key].length;
			object.tables = resp[key].tables;
			object.type = resp[key].type;
			object.version = resp[key].version;
			object.xid = resp[key].xid;
			
			//this.set(key, object);
			newResp[key] = object;
			//console.log(JSON.stringify(newResp));
		}
		return newResp;
	};*/
	
	return PortStatistics;
});