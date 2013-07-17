define([
	"jquery",
	"underscore",
	"backbone",
	"model/flowMod",
	"text!template/flowEd.html",
	"text!template/flowEd2.html",
	"text!template/advancedFlow.html",
], function($, _, Backbone, FlowMod, flowEd, flowEd2, advanced){
	var FlowEdView = Backbone.View.extend({
		el: $('body'),
			
		currentDPID: '',
		switch:'',
		ingressport:'',
		name:'',
		actions:'',
		
		template1: _.template(flowEd),
		template2: _.template(flowEd2),
		template3: _.template(advanced),

		initialize: function(collec){
			this.collection = collec;
			this.render();
		},
		
		events: {
			"click #getFlows": "pushFlow",
			"click #advanced": "advanced",
			"change input": "validate",
			"change select": "validate",
			"change #dpid": "showPorts",
		},
		
		render: function() {
			var i = 0;
			_.forEach(this.collection.models, function(item) {
						//console.log(JSON.stringify(item));
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
				
				'src-port':'50010',
				'dst-port':'50011',
				'ether-type':'0x0800',
				'dst-mac':'12:34:56:78:90:ab',
				'src-mac':'12:34:56:78:90:ab',
				'src-ip':'192.168.2.17',
				'dst-ip':'192.168.2.33',
				"protocol":"0x06",
			});
		},
		
		showPorts: function (e) {
			var v = $(e.currentTarget).val();
			var c = this.collection.get(v);
			var d = c.get("ports");
			console.log(JSON.stringify(c));
			$('#portBody').remove();
			$('#flowEdTable').append(this.template2(c.toJSON()));
		},
		
		advanced: function() {
			console.log("advanced");
			this.$el.append(this.template3);
		}
	});
	return FlowEdView;
});