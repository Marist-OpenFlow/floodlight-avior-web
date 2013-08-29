define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/topologyFl",
	"model/topology",
	"text!template/topology.html",
	"text!template/switchHeading.html",
], function($, _, Backbone, Marionette, TopologyCollection, Topology, topologyTpl, switchHeading){
	var TopologyView = Backbone.Marionette.ItemView.extend({
		el: $('#content'),
		
		template: _.template(topologyTpl),
		
		events: {
			"click #showLabels": "toggleLabels",
			"click #doneButton": "scaleOut",
			"change #nodeList": "nodeSelect",
		},
		
		// accepts an array of switch dpids and hosts
		// connected to the controller
		initialize: function(s, h) {
			//console.log(s);
			//console.log(h);
			this.toggleCount = 0;
			this.switches = s;
			this.hosts = h;
			_.forEach(h.models, function(item) {
				if (item.attributes.attachmentPoint.length != 0){
					item.set("id", item.get("ipv4"));
					this.switches.push(item);
				}
					//console.log(JSON.stringify(item.attributes.attachmentPoint));
			}, this);
			//console.log(JSON.stringify(this.switches));
			//console.log(this.hosts);
			//console.log(window.innerHeight);
			//console.log(window.innerWidth);
			//alert(window.innerWidth + " testing scale with with multiple g's and immediate changes");
		},
		
		//render the topology model using d3.js
		render: function() {
			var self = this;
			this.switchLinks;
			this.$el.append(this.template({coll: this.switches.toJSON()})).trigger('create');
			
			this.showLegend();
			var topology = new TopologyCollection({model: Topology});
			topology.fetch().complete(function () {
				this.switchLinks = topology;
				self.showTopo(topology);
        	}, this);
			//console.log(JSON.stringify(topology));
			
        	return this;
		},
		
		showTopo: function(switchLinks) {
			var self = this;
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			//console.log(height);
			//console.log(width);
			
			var force = d3.layout.force()
    			.size([width, height])
    			.charge(-400)
    			.linkDistance(40)
    			.on("tick", tick);

			var drag = force.drag()
    			.on("dragstart", dragstart);

			this.svg = d3.select(".inner").append("svg")
    			.attr("width", width)
    			.attr("height", height)
    			.attr("class", "mainSVG")
    			.attr("pointer-events", "all")
    			.append("g")
    			.call(d3.behavior.zoom().on("zoom", rescale))
    			.append("g");
    		
            function rescale() {}
    		
			$(window).bind('resize', function () { 
				height = window.innerHeight;
				width = window.innerWidth-45;
    			$(".mainSVG").attr("height", height);
    			$(".mainSVG").attr("width", width);
    			d3.select("#legendDiv").style("float", function() {
    														if (window.innerWidth > 350){
    															$(function() { $(".leftLegend").hide(); $(".rightLegend").show(); }); 
    															return "right"; 
    														}
    														else{
    															$(function() { $(".rightLegend").hide(); $(".leftLegend").show(); });
    															return "left";
    														}
    													});
			});

			var link = this.svg.selectAll(".link"),
    		node = this.svg.selectAll(".node");
			
			var edges = [];
				
			// create source and target links based on dpid instead of index
			_.forEach(switchLinks.models, function(e) { 
    			
    			// Get the source and target nodes
    			var sourceNode = self.switches.filter(function(n) {
    												  	return n.attributes.dpid === e.attributes['src-switch']; 
    												  })[0],
        		targetNode = self.switches.filter(function(n) {
    											  		return n.attributes.dpid === e.attributes['dst-switch']; 
    											 })[0];
	
    			// Add the edge to the array
   		 		edges.push({source: sourceNode, target: targetNode});
			}, this);
			
			_.forEach(this.hosts.models, function(e) {
    			// Get the source and target nodes
    			if (e.attributes.attachmentPoint.length > 0) {
    			var sourceNode = self.switches.filter(function(n) {
    													return e.attributes.attachmentPoint[0].switchDPID ===  n.attributes.dpid; 
    												  })[0],
        		targetNode = self.switches.filter(function(n) { 
    											  		return n.attributes.dpid === e.attributes.attachmentPoint[0].switchDPID; 
    											  })[0];

    			// Add the edge to the array
    			if (targetNode != undefined)
    				targetNode = e;
   		 		edges.push({source: sourceNode, target: targetNode});
   		 		}
			}, this);
  			force
      			.nodes(this.switches.models)
      			.links(edges)
      			.on("end", end)
      			.start();
			 
			//console.log(this.switches.models); 
			 
  			link = link.data(edges)
    				   .enter().append("line")
      				   .attr("class", "link");

   			node = node.data(this.switches.models)
   					   .enter().append("g")
   					   .attr("class", "node")
   					   .attr("id", function(d) { if (d.attributes.dpid === undefined) return d.attributes['ipv4'][0]; else return d.attributes.dpid; })
      				   .call(drag);
      			
      		node.append("circle")
      				   .attr("r", 12)
      				   .style("fill", function(d) { if (d.attributes.dpid === undefined) return "blue"; else return "green"; });

			var self = this;
			
			function end() {
				self.shiftAmount = 0;
    			Array.min = function( array ){
        			return Math.min.apply( Math, array );
    			};

				console.log("force ended");
				var outOfBounds = [];
				
				_.forEach(self.switches.models, function(item) {
  					if (item.px < 0)
  						outOfBounds.push(item.px);
				}, this);
				
				if (outOfBounds.length > 0){
					self.shiftAmount = (Array.min(outOfBounds) * -1) + 15;
					self.svg.attr("transform",
            			"translate(" + self.shiftAmount + ",0)");
            	}
            	
				force.on("end", null);
			}

			function tick() {
				
  				link.attr("x1", function(d) { return d.source.x; })
      			.attr("y1", function(d) { return d.source.y; })
      			.attr("x2", function(d) { return d.target.x; })
      			.attr("y2", function(d) { return d.target.y; });

  				//node.attr("cx", function(d) { return d.x = Math.max(12, Math.min(width - 12, d.x)); })
      		    	//.attr("cy", function(d) { return d.y = Math.max(12, Math.min(height - 12, d.y)); });
      		    	node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			}	

			function dragstart(d) {
  				d.fixed = true;
  				d3.select(this).classed("fixed", true);
			}									                    		      	                  		          	                  	  		
        		
		},
		
		toggleLabels: function (e) {
			//alert(window.innerWidth);
			var node = this.svg.selectAll(".node");
			if (this.toggleCount % 2 === 0) {
				node.append("text")
    				.attr("x", 12)
    				.attr("dy", ".35em")
    				.attr("id", "nodeLabels")
    				.text(function(d) { if (d.attributes.id === undefined) return d.attributes['ipv4'][0] ; else return d.attributes.id; });
				this.toggleCount++;	
			}
			else {
				var labels = this.svg.selectAll("#nodeLabels");
				labels.remove();	
				this.toggleCount++;
			}
		},
		
		showLegend: function() {
			legendSvg = d3.selectAll("#legendDiv").append("svg")
    			.attr("width", 115)
    			.attr("height", 65);
    		
    		d3.select("#legendDiv").style("float", function() {
    														if (window.innerWidth > 350){
    															$(function() { $(".rightLegend").show(); }); 
    															return "right"; 
    														}
    														else{
    															$(function() { $(".leftLegend").show(); });
    															return "left";
    														}
    													});
			
			var border = legendSvg.append("rect")
      						.attr("class", "border")
      						.attr("x", 3)
  							.attr("y", 0)
  							.attr("height", 61)
  							.attr("width", 100)
  							.style("fill", "white") ;

      		var legend = legendSvg.append("g")
  							 .attr("class", "legend")
  							 .attr("x", 45)
  							 .attr("y", 25)
  							 .attr("height", 100)
   							 .attr("width", 100);
  
  			legend.selectAll('circle')
      			  .data([0,1])
      			  .enter()
      			  .append("circle")
      			  .attr("cx", 20)
     	 		  .attr("cy", function(d, i){ return (i *  30) + 15;})
      			  .attr("r", 8)
      			  .style("fill", function(d) { 
         							if (d === 0) return "blue"; else return "green";
      							  });	
      
   			legend.selectAll('text')
   				  .data([0,1])
   				  .enter()
   				  .append("text")
  				  .attr("x", 39)
  				  .attr("y", function(d, i){ return (i *  30) + 19})
  				  .text(function(d) { if (d === 0) return "hosts"; else return "switches"; });
		},
		
		nodeSelect: function (e) {
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			var nodeID = $(e.currentTarget).val();
			var nodeData = this.switches.get(nodeID);
			this.x = nodeData.px;
			this.y = nodeData.py;
			var self = this;
			//alert(width);
			
			var allNodes = this.svg.selectAll("g");
			allNodes.style("stroke", "#fff")
				    .style("stroke-width", 1.5);
				    
			this.node = this.svg.selectAll("g").filter(function(d, i) { return i===nodeData.index; });
			this.node.style("stroke", "black")
				.style("stroke-width", 2.5);

			var trans = [];
			trans.push((width/2)-self.x);
			trans.push(((height/2)-self.y) - ((height/2) * .50));
			
			this.svg.attr("transform",
            		"translate(" + trans + ")");
            
			$(function() { $("#doneDiv").show(); });
		},
		
		scaleOut: function () {
            this.node.style("stroke", "#fff")
				.style("stroke-width", 1.5);
				
			var trans = [];
			trans.push(0);
			trans.push(0);
			
			this.svg.attr("transform",
            		"translate(" + this.shiftAmount + ",0)");
            		
            $(function() { $("#doneDiv").hide(); });
		},
				
	});
	return TopologyView;
}); 