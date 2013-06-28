define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/flow",
	"view/flowview",
	"collection/flowcollection"
], function($, _, Backbone, Flow, FlowView, FlowCollection){
	return {
		Flow: Flow,
		FlowView: FlowView,
		initialize: function(){
			$(document).ready(function(){
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
			});
		}
	};
});


