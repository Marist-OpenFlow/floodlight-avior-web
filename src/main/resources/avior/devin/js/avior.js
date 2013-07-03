define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/flowEdFL",
	"view/flowEdView",
	"floodlight/switch",
	"view/switches",
	"floodlight/switchSumFL",
	"view/switchesSumView"
], function($, _, Backbone, FlowEd, FlowEdView, Switch, SwitchesView, SwitchSumFL, SwitchesSumView){
	return {
		FlowEd: FlowEd,
		FlowEdView: FlowEdView,
		Switch: Switch,
		SwitchesView: SwitchesView,
		SwitchSumFL: SwitchSumFL,
		SwitchesSumView: SwitchesSumView,
		initialize: function(){
			$(document).ready(function(){
				var switchesview = new SwitchesView({model: new Switch});
				//$(document.body).append(switchesview.render().el);
				switchesview.delegateEvents(switchesview.events);
				
				/*var switchesSumView = new SwitchesSumView({model: new SwitchSumFL});
				//$(document.body).append(switchesSumView.render().el);
				switchesSumView.delegateEvents(switchesSumView.events);*/
				
				/*var flowEdview = new FlowEdView({model: new FlowEd});
				//$(document.body).append(flowEdview.render().el);
				flowEdview.delegateEvents(flowEdview.events);*/
			});
		}
	};
});


