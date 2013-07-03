define([
	"jquery",
	"underscore",
	"backbone",
	"collection/flowEdCollection",
	"text!template/flowEd.html",
	"text!template/getFlowsPlaceholder.html"
], function($, _, Backbone, FlowEdCollection, flowEdTpl, place){
	var FlowEdView = Backbone.View.extend({
		el: $('body'),
			
		template1: _.template(flowEdTpl),
		template2: _.template(place),

		initialize: function(item){
			var self = this;
			this.collection = new FlowEdCollection();
			this.listenTo(this.collection, "sync", this.render);
		},
		
		events: {
			"click button": "setModel",
		},
		
		// render the heading and table template, 
		// then render each model in this.collection
		render: function() {
			this.$el.html(this.template1(this.model.toJSON()));
			return this;
		},
		
		setModel: function(){
			
		}
	});
	return FlowEdView;
});