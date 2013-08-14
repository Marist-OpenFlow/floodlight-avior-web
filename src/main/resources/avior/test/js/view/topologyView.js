define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/topologyFl",
	"model/topology",
	"text!template/topology.html"
], function($, _, Backbone, Marionette, TopologyCollection, Topology, topologyTpl){
	var TopologyView = Backbone.Marionette.ItemView.extend({
		el: $('#content'),
		
		template: _.template(topologyTpl),
		
		// accepts an array of switch dpids and hosts
		// connected to the controller
		initialize: function(s, h) {
			this.switches = s;
			this.hosts = h;
			console.log(s);
			console.log(h);
		},
		
		//render the topology model using d3.js
		render: function() {
			var svgContainer = d3.select(this.el).append("svg")
												  .attr("width", 1000)
												  .attr("height", 1000);
			
			var switchNodes = svgContainer.selectAll("circle")
	                          		   .data(this.switches)
    	                      		   .enter()
        	                  		   .append("circle")
        	                  		   .attr("cx", function (d,i) { return ((i+3)*30); })
				                       .attr("cy", function (d,i) { return ((i+3)*30); })
                				       .attr("r", 20 );;
        	                  		   
        	var hostNodes = svgContainer.selectAll("rect")
	                          		   .data(this.hosts)
    	                      		   .enter()
        	                  		   .append("rect"); 
        	                  		   
        	                  	  	
			
			var topology = new TopologyCollection({model: Topology});
			topology.fetch().complete(function () {
				//console.log(JSON.stringify(topology));
        		}, this);
        		
        	return this;
		}
				
	});
	return TopologyView;
}); 