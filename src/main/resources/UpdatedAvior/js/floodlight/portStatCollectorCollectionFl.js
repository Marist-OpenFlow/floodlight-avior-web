 define([
	"collection/portStatCollectorCollection",
], function(PortStatCollectorCollection){
		/* Floodlight specific URL for portStats of a switch */
		PortStatCollectorCollection.prototype.url = function() {return "/wm/statisticscollector/ports/json";};
		return PortStatCollectorCollection;
});