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
			this.render();
		},
		
		events: {
			"click #getFlows": "pushFlow",
			"change input": "validate",
		},
		
		render: function() {
			this.$el.append(this.template1);
		},
		
		validate: function(e){
			var val = $(e.currentTarget).val();
			console.log(val);
		},
		
		pushFlow: function() {
			var addFlow = new FlowMod();
			addFlow.save({
				'switch':this.currentDPID,
				'ingress-port':'1',
				'name':'flowMod1',
				'actions':'output=3',
			});
		}
	});
	return FlowEdView;
});