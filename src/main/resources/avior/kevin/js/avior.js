	// "floodlight/flow",
	// "view/flowview",
	// "collection/flowcollection"
// ], function($, _, Backbone, Flow, FlowView, FlowCollection){
//		Flow: Flow,
//		FlowView: FlowView,



define([
	"jquery",
	"underscore",
	"backbone",
	"model/controller/controllermodel",
	"view/controllerview"
], function($, _, Backbone, ControllerModel, ControllerView){
	return {
		ControllerModel: ControllerModel,
		ControllerView: ControllerView,
		initialize: function(){
			$(document).ready(function(){
				var controllerview = new ControllerView({model: new ControllerModel});
				
				
				/*
				var flowview = new FlowView({model: new Flow});
				$(document.body).append(flowview.render().el);
				flowview.delegateEvents(flowview.events);
				*/
			});
		}
	};
});


