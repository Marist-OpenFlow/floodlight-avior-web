Flow = Backbone.Model.extend();

Flowlist = Backbone.Collection.extend({
	model: Flow,
	value: null,
	url: function(){ return "/wm/core/switch/" + this.value + "/flow/json"; }
});

Flowview = Backbone.View.extend({
	el: $("body"),
	initialize: function () {
		this.flow = new Flowlist( null, { view: this });
		this.listenTo(this.flow, 'any', this.render);
		console.log('initialization successful');
	},
	events: {
		"click #getFlows": "getFlowList",
		"click #clear": "clearList",
	},
	getFlowList: function () {
		console.log('getFlowList started');
		$("#status").html(" ");
		this.flow.value = $("#switchDPID").val();
		console.log($("#switchDPID").val());
		console.log(this.flow.value);
		this.flow.fetch({success: function() {
			console.log("yar");
		}});
		console.log('getFlowList ended');
	},
	clearList: function() {
		$("#status").html(" ");
	},
	render: function () {
		console.log('rendered, ja');
		var flowE1 = $("#status");
		var info = "";
		this.flow.each( function(model) {
			console.log(JSON.stringify(model));
			info = _.pluck(JSON.stringify(model), $("#switchDPID").val());
			flowE1.prepend("<div>Switch " + $("#switchDPID").val() + ":<br>" + info + "</div>");
		});
	}
});
var HAI	= new Flowview();