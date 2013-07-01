define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switch",
	"view/switches"
], function($, _, Backbone, Switch, SwitchesView){
	return {
		Switch: Switch,
		SwitchesView: SwitchesView,
		initialize: function(){
			$(document).ready(function(){
				var switchesview = new SwitchesView({model: new Switch});
				//$(document.body).append(switchesview.render().el);
				switchesview.delegateEvents(switchesview.events);
				
				/*var switchesSumView = new SwitchesSumView({model: new SwitchSumFL});
				//$(document.body).append(switchesSumView.render().el);
				switchesSumView.delegateEvents(switchesSumView.events);*/
			});
		}
	};
});


