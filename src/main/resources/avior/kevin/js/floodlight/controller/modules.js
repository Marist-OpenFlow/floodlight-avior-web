define([
	"model/controller/modulesmodel"
], function(Modules){
	Modules.prototype.urlRoot = "/wm/core/module/loaded/json";
	
	Modules.prototype.parse = function(resp){
		this.modules = [];
		
		for (x in resp) {
			this.modules.push(x);
		}
	};
	
	return Modules;
});

