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
		switch:'',
		ingressport:'',
		name:'',
		actions:'',
		
		template1: _.template(flowEd),

		initialize: function(collec){
			this.collection = collec;
			this.render();
		},
		
		events: {
			"click #getFlows": "pushFlow",
			"change input": "validate",
		},
		
		render: function() {
			var i = 0;
			_.forEach(this.collection.models, function(item) {
						console.log(JSON.stringify(item));
        		}, this);
			this.$el.append(this.template1({coll: this.collection.toJSON()}));
		},
		
		validate: function(e){
			var val = e.currentTarget.id;
			
			switch (e.currentTarget.id)
			{
				case "ingressPort": 
					this.ingressport = $(e.currentTarget).val();
					break;
				case "name": 
					this.name = $(e.currentTarget).val();
					break;
				case "actions": 
					this.actions = $(e.currentTarget).val();
					break;
				default:
					break;
			}
		},
		
		pushFlow: function() {
			var addFlow = new FlowMod();
			addFlow.save({
				'switch':$('#dpid').val(),
				'ingress-port':this.ingressport,
				'name':this.name,
				'actions':'output=' + this.actions,
			});
		}
	});
	return FlowEdView;
});