define([
	"collection/switchCollection"
], function(SwitchCollection){
	//get list of switch features connected to controller
	SwitchCollection.prototype.url = function(){return "/wm/core/controller/switches/json";};
	
	SwitchCollection.prototype.parse = function(resp) {
		var newResp = new Object;

		//console.log(JSON.stringify(resp));
		var i = 0;
		for (var key in resp){
			//console.log(JSON.stringify(resp[0].ports));
			var sortResp = resp[key].ports;
			delete resp[key].ports;
			
			sortResp.sort(function(a, b){
 				return a.portNumber-b.portNumber
			});
			
			//sortResp.sort();
			console.log(JSON.stringify(sortResp));
			//console.log(JSON.stringify(resp));
			i += 1;
		}
		//console.log(JSON.stringify(newResp));
		return resp;
	};
	 
	return SwitchCollection;
});