define([
	"model/controller/modulesmodel"
], function(Modules){
	Modules.prototype.urlRoot = "/wm/core/module/loaded/json";
	
	Modules.prototype.parse = function(resp){
		//var modules = new Array;
		var t = new Array;
		
		for (x in resp)
			t.push(x);
			
		console.log(t);
		this.set("mods", t);
		//return modules;
	};
	
	return Modules;
});

