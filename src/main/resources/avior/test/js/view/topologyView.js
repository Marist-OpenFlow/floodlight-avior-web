define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/topology.html"
], function($, _, Backbone, Marionette, topologyTpl){
	var TopologyView = Backbone.Marionette.ItemView.extend({
		el: $('#content'),
		
		template: _.template(topologyTpl),
		
		//render the topology model using the template
		render: function() {
			this.$el.html(this.template);
			return this;
		}
				
	});
	return TopologyView;
}); 