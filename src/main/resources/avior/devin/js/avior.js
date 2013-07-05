define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switchSumFL",
	"view/switchesSumView"
], function($, _, Backbone, SwitchSumFL, SwitchesSumView){
	return {
		SwitchSumFL: SwitchSumFL,
		SwitchesSumView: SwitchesSumView,
		initialize: function(){
			$(document).ready(function(){
				/*var switchesview = new SwitchesView({model: new Switch});
				//$(document.body).append(switchesview.render().el);
				switchesview.delegateEvents(switchesview.events);*/
				
				var switchesSumView = new SwitchesSumView({model: new SwitchSumFL});
				//$(document.body).append(switchesSumView.render().el);
				switchesSumView.delegateEvents(switchesSumView.events);
				
				/*var flowEdview = new FlowEdView({model: new FlowEd});
				//$(document.body).append(flowEdview.render().el);
				flowEdview.delegateEvents(flowEdview.events);*/
			});
		}
	};
});


