define([
	"model/modulesmodel"
], function(Modules){
	Modules.prototype.urlRoot = "/wm/core/module/loaded/json";
	
	Modules.prototype.parse = function(resp){
		var newResp = new Array;
		for (x in resp){
			//console.log(JSON.stringify(x));
			newResp.push(x);
		}
		//console.log(newResp);
		return newResp;
	};
	
	return Modules;
});

