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
			$('#dpid').val(this.currentDPID);
		},
		
		validate: function(e){
			//var val = $(e.currentTarget).val();
			var val = $(e.currentTarget);
			console.log(val === $('input#name'));
		},
		
		pushFlow: function() {
			var addFlow = new FlowMod();
			addFlow.save({
				'switch':$('#dpid').val(),
				'ingress-port':'1',
				'name':'flowMod1',
				'actions':'output=3',
			});
		}
	});
	return FlowEdView;
});