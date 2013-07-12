define([
	"jquery",
	"underscore",
	"backbone",
	"model/flowMod",
	"text!template/flowEd.html",
], function($, _, Backbone, FlowMod, flowEd){
	var FlowEdView = Backbone.View.extend({
		el: $('body'),
			
		currentDPID: '',
		template1: _.template(flowEd),

		initialize: function(dpid){
			this.currentDPID = dpid;
			console.log(this.currentDPID);
			this.$el.append(this.template1);
		},
		
		events: {
			//"click button": "pushFlow",
			"click input": "pushFlow",
		},
		
		render: function() {
		},
		
		pushFlow: function(e){
			var val = $(e.currentTarget).val();
			console.log(val);
		}
	});
	return FlowEdView;
});