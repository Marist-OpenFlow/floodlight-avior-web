define([
	"jquery",
	"underscore",
	"backbone",
	"model/flowMod",
	"text!template/flowEditor.html",
	"text!template/portSelect.html",
], function($, _, Backbone, FlowMod, flowEditor, portSelect){
	var FlowEdView = Backbone.View.extend({
		el: $('#content'),
		
		template1: _.template(flowEditor),
		template2: _.template(portSelect),

		initialize: function(collec, display){
			this.nameList = new Object;
			this.collection = collec;
			//console.log(this.collection);
			if (display)
				this.render();
		},
		
		events: {
			"click #getFlows": "pushFlow",
			"click #removeFlow": "deleteFlow",
			"click #removeFlows": "deleteFlows",
			"click #removeSwFlows": "deleteSwFlows",
			"click #advanced": "advanced",
			"change input": "validate",
			"change select": "validate",
			"change #dpid": "showPorts",
		},
		
		render: function() {
			//$('#container2').remove();
			this.$el.html(this.template1({coll: this.collection.toJSON()})).trigger('create');
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
				case "src-port": 
					this.srcport = $(e.currentTarget).val();
					break;
				case "wildcards": 
					this.wildcards = $(e.currentTarget).val();
					break;
				case "priority": 
					this.priority = $(e.currentTarget).val();
					break;
				case "active": 
					this.active = $(e.currentTarget).val();
					break;
				case "moreOutput": 
					this.actions = 'output=' + $(e.currentTarget).val();
					break;
				case "enqueue": 
					this.actions = 'enqueue=' + $(e.currentTarget).val();
					break;
				case "strip-vlan": 
					this.actions = 'strip-vlan=' + $(e.currentTarget).val();
					break;
				case "set-vlan": 
					this.actions = 'set-vlan-id=' + $(e.currentTarget).val();
					break;
				case "set-vlan-priority": 
					this.actions = 'set-vlan-priority=' + $(e.currentTarget).val();
					break;
				case "set-src-mac": 
					this.actions = 'set-src-mac=' + $(e.currentTarget).val();
					console.log(this.actions);
					break;
				case "set-dst-mac": 
					this.actions = 'set-dst-mac=' + $(e.currentTarget).val();
					break;
				case "set-tos-bits": 
					this.actions = 'set-tos-bits=' + $(e.currentTarget).val();
					break;
				case "set-src-ip": 
					this.actions = 'set-src-ip=' + $(e.currentTarget).val();
					break;
				case "set-dst-ip": 
					this.actions = 'set-dst-ip=' + $(e.currentTarget).val();
					break;
				case "set-src-port": 
					this.actions = 'set-src-port=' + $(e.currentTarget).val();
					break;
				case "set-dst-port": 
					this.actions = 'set-dst-port=' + $(e.currentTarget).val();
					break;
				default:
					break;
			}
		},
		
		pushFlow: function() {
			var proceed = true;
			//if (this.name in this.nameList){
				//proceed = confirm("Warning! " + this.name + " is already being used." 
					   //+ " Proceeding will overwrite the current flow with" 
					  // + " this name. Would you like to proceed using "  
					  // + this.name + "?");
			//}
			
			if (this.name in this.nameList === false || proceed){
				this.nameList[this.name] = true;
				var flowAttrs = [this.name, this.ingressport, this.actions, this.srcport, 
							 	this.dstport, this.ethertype, this.dstmac, 
							 	this.srcmac, this.srcip, this.dstip, this.protocol, 
							 	this.vlanid, this.vlanpriority, this.tosbits, this.wildcards,
							 	this.priority, this.active];

				var addFlow = new FlowMod("null");
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
					'vlan-id':this.vlanid,
					'vlan-priority':this.vlanpriority,
					'tos-bits':this.tosbits,
					'wildcards':this.wildcards,
					'priority':this.priority,
					'active':this.active,
				});
				//console.log(JSON.stringify(addFlow));
			
				//clear all flow attributes
				this.ingressport = '';
				this.name = '';
				this.actions = '';
				this.srcport = '';
				this.dstport = '';
				this.ethertype = '';
				this.dstmac = '';
				this.srcmac = '';
				this.srcip = '';
				this.dstip = '';
				this.protocol = '';
				this.vlanid = '';
				this.vlanpriority = '';
				this.tosbits = '';
				this.wildcards = '';
				this.priority = '';
				this.active = '';
			}
		},
		
		deleteFlow: function () {
			var x = new FlowMod("null");
			x.destroy({data: { name: this.name }});
		},
		
		deleteFlows: function () {
			var x = new FlowMod("all");
			x.fetch();
			//x.fetch().complete(function () {
    	  		//console.log(JSON.stringify(x));
    	 	//});
		},
		
		deleteSwFlows: function () {
			var x = new FlowMod($('#dpid').val());
			x.fetch();
		},
		
		showPorts: function (e) {
			console.log(JSON.stringify(this.collection));
			var v = $(e.currentTarget).val();
			var c = this.collection.get(v);
			var d = c.get("ports");
			$('#portBody').remove();
			$('#flowEdTable').append(this.template2(c.toJSON())).trigger('create');
		},
		
		listStaticFlowNames: function() {
			
		},
		
	});
	return FlowEdView;
});