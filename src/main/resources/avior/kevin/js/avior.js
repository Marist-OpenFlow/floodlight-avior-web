define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/memory",
	"view/memory",
	"floodlight/switch",
	"view/switch"
], function($, _, Backbone, Memory, MemoryView, Switch, SwitchView){
	return {
		Memory: Memory,
		MemoryView: MemoryView,
		Switch: Switch,
		SwitchView: SwitchView,
		initialize: function(){
			$(document).ready(function(){
				var memview = new MemoryView({model: new Memory});
				$(document.body).append(memview.render().el);
				memview.delegateEvents(memview.events);
				memview.refresh();
				
				var swtchview = new SwitchView({model: new Switch});
				$(document.body).append(swtchview.render().el);
				swtchview.delegateEvents(swtchview.events);
				swtchview.refresh();
			});
		}
	};
});


