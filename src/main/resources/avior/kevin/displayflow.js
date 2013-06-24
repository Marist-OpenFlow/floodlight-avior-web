Flow = Backbone.Model.extend();

Flowlist = Backbone.Collection.extend({
	model: Flow,
	value: null,
	url: "/wm/core/switch/" + this.value + "/flow/json"
});

Flowview = Backbone.View.extend({
	el: $("body"),
	initialize: function () {
		_.bindAll(this, "render", 'getFlowList');
		this.flow = new Flowlist( null, { view: this });
		this.flow.bind("refresh", this.render);
		console.log('initialization successful');
	},
	events: {
		"click #getFlows": "getFlowList",
	},
	getFlowList: function () {
		console.log('poo');
		this.value = $("#switchDPID").val();
		console.log($("#switchDPID").val());
		console.log(this.flow.value);
		this.flow.fetch();
		console.log('poop');
	},
	render: function () {
		console.log('ahhhh');
		var flowE1 = $("#status");
		this.flow.each( function(model) {
			flowE1.prepend("<div>" + model.get('flow') + "</div>");
		});
	}
});
var HAI	= new Flowview();