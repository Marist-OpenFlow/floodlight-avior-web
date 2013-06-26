define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switch",
	"view/switches",
	"collection/switchcollection"
], function($, _, Backbone, Switch, SwitchesView, SwitchCollection){
	return {
		Switch: Switch,
		SwitchesView: SwitchesView,
		initialize: function(){
			$(document).ready(function(){
				var switchesview = new SwitchesView({model: new Switch});
				$(document.body).append(switchesview.render().el);
				switchesview.delegateEvents(switchesview.events);
				switchesview.refresh();
			});
		}
	};
});


