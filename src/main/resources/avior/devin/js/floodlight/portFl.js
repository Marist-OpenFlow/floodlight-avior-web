define([
	"collection/portCollection"
], function(PortCollection){
	//get list of port features connected to controller
	PortCollection.prototype.url = function() {return "/wm/core/switch/this.dpid/port/json";}; 
	return PortCollection;
});