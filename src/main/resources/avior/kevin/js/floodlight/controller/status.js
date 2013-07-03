define([
	"model/controller/statusmodel"
], function(Status){
	Status.prototype.url = "/wm/core/health/json";
	return Status;
});
