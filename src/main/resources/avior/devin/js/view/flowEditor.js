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
			this.$el.append(this.template3);
		},
		
		validate: function(e){
			//var val = e.currentTarget.id;
			
			switch (e.currentTarget.id)
			{
				case "ingressPort": 
					this.ingressport = $(e.currentTarget).val();
					break;
				case "name": 
					this.name = $(e.currentTarget).val();
					break;
				case "egressport": 
					this.actions = 'output=' + $(e.currentTarget).val();
					break;
					
				case "src-mac": 
					this.srcmac = $(e.currentTarget).val();
					break;
				case "dst-mac": 
					this.dstmac = $(e.currentTarget).val();
					break;
				case "ether-type": 
					this.ethertype = $(e.currentTarget).val();
					break;
				case "vlan-id": 
					this.vlanid = $(e.currentTarget).val();
					break;
				case "vlan-priority": 
					this.vlanpriority = $(e.currentTarget).val();
					break;
				case "dst-ip": 
					this.dstip = $(e.currentTarget).val();
					break;
				case "src-ip": 
					this.srcip = $(e.currentTarget).val();
					break;
				case "protocol": 
					this.protocol = $(e.currentTarget).val();
					break;
				case "tos-bits": 
					this.tosbits = $(e.currentTarget).val();
					break;
				case "dst-port": 
					this.dstport = $(e.currentTarget).val();
					break;
				case "dst-src": 
					this.dstsrc = $(e.currentTarget).val();
					break;
				case "wildcards": 
					this.wildcards = $(e.currentTarget).val();
					break;
				case "priority": 
					this.priority = $(e.currentTarget).val();
					break;
				case "moreOutput": 
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
				'actions':this.actions,
				
				'src-port':this.srcport,
				'dst-port':this.dstport,
				'ether-type':this.ethertype,
				'dst-mac':this.dstmac,
				'src-mac':this.srcmac,
				'src-ip':this.srcip,
				'dst-ip':this.dstip,
				'protocol':this.protocol,
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
	});
	return FlowEdView;
});