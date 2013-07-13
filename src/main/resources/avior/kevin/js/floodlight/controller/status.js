define([
	"model/controller/statusmodel"
], function(Status){
	Status.prototype.urlRoot = "/wm/core/health/json";
	return Status;
});
