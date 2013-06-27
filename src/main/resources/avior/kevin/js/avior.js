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
				
				var switchesview = new SwitchesView({model: new Switch});
				$(document.body).append(switchesview.render().el);
				switchesview.delegateEvents(switchesview.events);
				
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
			});
		}
	};
});


