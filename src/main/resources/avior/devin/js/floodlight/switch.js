define([
	"collection/switchCollection"
], function(SwitchCollection){
	//get list of switch features connected to controller
	SwitchCollection.prototype.url = function(){return "/wm/core/controller/switches/json";};
	
	SwitchCollection.prototype.parse = function(resp) {
		for (var key in resp){
			var sortResp = resp[key].ports;
			delete resp[key].ports;			
			sortResp.sort(function(a, b){
 				return a.portNumber-b.portNumber
			});
			resp[key].ports = sortResp;
		}
		return resp;
	};
	 
	return SwitchCollection;
});