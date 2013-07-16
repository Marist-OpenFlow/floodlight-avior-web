define([
	"jquery",
	"underscore",
	"backbone",
	"model/flowMod",
	"text!template/flowEd.html",
	"text!template/flowEd2.html",
], function($, _, Backbone, FlowMod, flowEd, flowEd2){
	var FlowEdView = Backbone.View.extend({
		el: $('body'),
			
		currentDPID: '',
		switch:'',
		ingressport:'',
		name:'',
		actions:'',
		
		template1: _.template(flowEd),
		template2: _.template(flowEd2),

		initialize: function(collec){
			this.collection = collec;
			this.render();
		},
		
		events: {
			"click #getFlows": "pushFlow",
			"change input": "validate",
			"change #dpid": "showPorts",
		},
		
		render: function() {
			var i = 0;
			_.forEach(this.collection.models, function(item) {
						console.log(JSON.stringify(item));
        		}, this);
			this.$el.append(this.template1({coll: this.collection.toJSON()}));
			//$('#flowEdTable').append(this.template2);
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
		},
		
		showPorts: function (e) {
			var v = $(e.currentTarget).val();
			console.log(JSON.stringify(this.collection.get($(e.currentTarget).val())));
			
		}
	});
	return FlowEdView;
});