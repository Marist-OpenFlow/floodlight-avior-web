define([
	"model/controller/uptimemodel"
], function(Uptime){
	Uptime.prototype.urlRoot = "/wm/core/system/uptime/json";
	return Uptime;
});

