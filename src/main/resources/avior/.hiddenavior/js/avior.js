define([
	"jquery",
	"underscore",
	"backbone",
	"view/memory",
	"view/switches",
	"floodlight/memory",
	"floodlight/switch",
	"floodlight/switches",
], function($, _, Backbone, MemoryView, SwitchesView, Memory, Switch, SwitchCollection){
	return {
		Memory: Memory,
		MemoryView: MemoryView,
		Switch: Switch,
		SwitchCollection: SwitchCollection,
		SwitchesView: SwitchesView,
		initialize: function(){
			$(document).ready(function(){
				var memview = new MemoryView({model: new Memory});
				$(document.body).append(memview.render().el);
				memview.delegateEvents(memview.events);
				memview.refresh();

				var swtchsview = new SwitchesView({collection:new SwitchCollection});
				$(document.body).append(swtchsview.el);
				swtchsview.render();
				swtchsview.refresh();
				//swtchsview.setSelectedModel(swtchsview.collection.first());
			});
		}
	};
});
