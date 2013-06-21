define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/memory",
	"view/memory"
], function($, _, Backbone, Memory, MemoryView){
	return {
		Memory: Memory,
		MemoryView: MemoryView,
		initialize: function(){
			$(document).ready(function(){
				var memview = new MemoryView({model: new Memory});
				$(document.body).append(memview.render().el);
				memview.delegateEvents(memview.events);
				memview.refresh();
			});
		}
	};
});


