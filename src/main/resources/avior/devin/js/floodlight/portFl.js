define([
	"model/portStatistics"
], function(PortStatistics){
	//get list of port features connected to controller
	PortStatistics.prototype.urlRoot = "/wm/core/switch/all/port/json";
	
	PortStatistics.prototype.parse = function(resp) {
		for (var key in resp){
			var sortResp = resp[key]
			delete resp[key];
			sortResp.sort(function(a, b){
 				return a.portNumber-b.portNumber
			});
			resp[key] = sortResp;
			console.log(JSON.stringify(resp[key]));
		}
		return resp;
	};
	
	return PortStatistics;
});