 define([
	"collection/flowStatCollectorCollection",
], function(FlowStatCollectorCollection){
		/* Floodlight specific URL for flowStats of a switch */
		FlowStatCollectorCollection.prototype.url = function() {return "/wm/statisticscollector/flows/json";};
		return FlowStatCollectorCollection;
});