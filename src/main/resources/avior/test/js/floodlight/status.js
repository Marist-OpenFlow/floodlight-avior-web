define([
	"model/statusmodel"
], function(Status){
	Status.prototype.urlRoot = "/wm/core/health/json";
	return Status;
});
