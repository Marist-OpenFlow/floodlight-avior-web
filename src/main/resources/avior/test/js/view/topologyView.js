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
			var svgContainer = d3.select(this.el).append("svg")
												  .attr("width", 200)
												  .attr("height", 200);
			
			var circle = svgContainer.append("line")
								     .attr("x1", 5)
								     .attr("y1", 5)
								     .attr("x2", 50)
								     .attr("y2", 50)
								     .attr("stroke-width", 2)
								     .attr("stroke", "red");
			return this;
		}
				
	});
	return TopologyView;
}); 