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
		},
		
		//render the topology model using d3.js
		render: function() {
			var self = this;
			this.switchLinks;
			this.$el.append(this.template({coll: this.switches.toJSON()})).trigger('create');
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
			
			
			var projection = d3.geo.albersUsa()
    				           	   .scale(1070)
    					   	       .translate([width / 2, height / 2]);
    
			var path = d3.geo.path()
     				         .projection(projection);
			
			var force = d3.layout.force()
    			.size([width, height])
    			.charge(-400)
    			.linkDistance(40)
    			.on("tick", tick);

			var drag = force.drag()
    			.on("dragstart", dragstart);

			this.svg = d3.select(".inner").append("svg")
    			.attr("width", width)
    			.attr("height", height);
    		
			$(window).bind('resize', function () { 
				height = window.innerHeight;
				width = window.innerWidth-45;
    			$("svg").attr("height", height);
    			$("svg").attr("width", width);
				//console.log(window.innerHeight);
				//console.log(window.innerWidth);
				//console.log($("svg"));
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
    			//console.log(JSON.stringify(e));
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
			console.log(this.switches.models);
			//console.log((edges.length));
  			force
      			.nodes(this.switches.models)
      			.links(edges)
      			.start();
			 
			console.log(this.switches.models); 
			 
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
      			
      		
      		this.showLegend();

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
			var border = this.svg.append("rect")
      						.attr("class", "border")
      						.attr("x", 45)
  							.attr("y", 0)
  							.attr("height", 65)
  							.attr("width", 116)
  							.style("fill", "white") ;

      		var legend = this.svg.append("g")
  							 .attr("class", "legend")
  							 .attr("x", 45)
  							 .attr("y", 25)
  							 .attr("height", 100)
   							 .attr("width", 100);
  
  			legend.selectAll('circle')
      			  .data([0,1])
      			  .enter()
      			  .append("circle")
      			  .attr("cx", 59)
     	 		  .attr("cy", function(d, i){ return (i *  30) + 15;})
      			  .attr("r", 8)
      			  .style("fill", function(d) { 
         							if (d === 0) return "blue"; else return "green";
      							  });	
      
   			legend.selectAll('text')
   				  .data([0,1])
   				  .enter()
   				  .append("text")
  				  .attr("x", 83)
  				  .attr("y", function(d, i){ return (i *  30) + 18;})
  				  .text(function(d) { if (d === 0) return "hosts"; else return "switches"; });
		},
		
		// On node selection, scale screen and translate graph to have selected node centered,
		// then unregister listener until next node is selected. When done button is clicked
		// the scale returns to normal(1). Legend does not change sizes upon rescaling/translating.
		nodeSelect: function (e) {
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			var nodeID = $(e.currentTarget).val();
			var nodeData = this.switches.get(nodeID);
			var k = 4;
			this.x = nodeData.px;
			this.y = nodeData.py;
			console.log(nodeID);
			console.log(nodeData);
			console.log("hi");
			//console.log(height/2);
			//console.log(width/2);
			//console.log(this.y);
			//console.log(this.x);
			
			//call this event on node selection...
			this.svg.call(d3.behavior.zoom().on("zoom", rescale));
			var self = this;

			function rescale() {
				$(function() { $("#doneDiv").show(); });
				var trans = [];
				console.log((width/2)-self.x);
				console.log((height/2)-self.y);
				trans.push((width/2)-self.x);
				trans.push((height/2)-self.y);
        		//var scale = 1.5;
        		var scale = 1;
        		//console.log(scale);

        		self.svg.attr("transform",
            		"translate(" + trans + ")"
                		+ " scale(" + scale + ")");
                self.svg.call(d3.behavior.zoom().on("zoom", null));
    		}
		},
		
		scaleOut: function () {
            this.svg.call(d3.behavior.zoom().on("zoom", rescale));
			var self = this;
            function rescale() {
				$(function() { $("#doneDiv").hide(); });
				var trans = [];
				trans.push(0);
				trans.push(0);
        		var scale = 1;
        		console.log(scale);

        		self.svg.attr("transform",
            		"translate(" + trans + ")"
                		+ " scale(" + scale + ")");
                self.svg.call(d3.behavior.zoom().on("zoom", null));
    		}
		},
				
	});
	return TopologyView;
}); 