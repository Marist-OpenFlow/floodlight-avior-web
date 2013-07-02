define([
	"model/controller/uptimemodel"
], function(Uptime){
	Uptime.prototype.url = "/wm/core/system/uptime/json";
	return Uptime;
});

