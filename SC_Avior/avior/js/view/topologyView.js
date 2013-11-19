define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/topologyFl",
	"model/topology",
	"floodlight/portStatCollectorCollectionFl",
	"floodlight/flowStatCollectorCollectionFl",
	"model/portStatCollectorModel",
	"model/flowStatCollectorModel",
	"text!template/topology.html",
	"text!template/portCollectortpl.html",
], function($, _, Backbone, Marionette, TopologyCollection, Topology, PortStatCollectorCollection, FlowStatCollectorCollection, PortStatCollectorModel, FlowStatCollectorModel, topologyTpl, portCollTpl){
	var TopologyView = Backbone.Marionette.ItemView.extend({
		el: $('#content'),
		
		template: _.template(topologyTpl),
		template2: _.template(portCollTpl),
		
		events: {
			"click #showLabels": "toggleLabels",
			"click #doneButton": "scaleOut",
			"change #nodeList": "nodeSelect",
			"click #viewTrafficButton": "viewTrafficMode",
			"click #exitViewTrafficButton": "exitViewTrafficMode",
		},
		
		// accepts an array of switch dpids and hosts
		// connected to the controller
		initialize: function(s, h) {
			this.shiftAmountx = 0;
			this.shiftAmounty = 0;
			this.toggleCount = 0;
			this.toggleSwitchCount1 = 0;
			this.toggleSwitchCount2 = 0;
			this.clearLabelCount1 = 0;
			this.clearLabelCount2 = 0;
			this.hostSelectedCount = 0;
			this.edges = [];
			this.switchLinks;
			this.interval;
			this.node1;
			this.node2;
			this.i = 0;
			this.ipToMac = {};
			this.switches = s;
			this.hosts = h;
			//this.obj = {};
			var self = this;
			
			_.forEach(this.hosts.models, function(item) {
				var mac = item.get("mac")[0];
				item.set("id", mac);
				if (item.attributes.ipv4.length === 0) {
					item.set("ipv4", "ip not found");
				}
				this.switches.push(item);
			}, this);
		},
		
		//render the legend and network topology using d3.js
		render: function() {
			var self = this;
			
			//clear the content div in order to display the topology
			$('#content').empty();
			
			//append the header and buttons
			this.$el.append(this.template({coll: this.switches.toJSON()})).trigger('create');
			
			//display view traffic mode button initially
			$(function() { $("#viewDiv").show(); });
			
			//display the legend
			this.showLegend();
			
			var topology = new TopologyCollection({model: Topology});
			var self = this;
			//get topology data and render the network graph
			topology.fetch().complete(function () {
				self.switchLinks = topology;
				self.showTopo(topology);
        	}, this);
        	
        	this.interval = setInterval(function(){
						self.displayTooltips();
					}, 5000);
        	
        	return this;
		},
		
		// Create and display the network graph
		showTopo: function(switchLinks) {
			var self = this;
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			
			this.force = d3.layout.force()
    			.size([width, height])
    			.charge(-700)
    			.linkDistance(100)
    			.on("tick", tick);

			var drag = this.force.drag()
    			.on("dragstart", dragstart);
    			
			this.svg = d3.select(".inner").append("svg")
    			.attr("width", width)
    			.attr("height", height)
    			.attr("class", "mainSVG")
    			.attr("pointer-events", "all");
    		
            function rescale() {}
    		
    		// On window resize, relocate legend and expand 
    		// or contract screen scroll amount
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
    													
    			self.force.size([width+45, height/1.5]).start();
    			
    			if (self.dynamicWindowSize > window.innerWidth)
            		d3.select(".inner").style("width", self.dynamicWindowSize + "px");
            	else 
            		d3.select(".inner").style("width", window.innerWidth-45 + "px");
            		
            	if (self.dynamicWindowSize > window.innerHeight)
            		d3.select(".inner").style("height", self.dynamicWindowSize + "px");
            	else
            		d3.select(".inner").style("height", window.innerHeight + "px");
			});

    		var node = this.svg.selectAll(".node");
			
			//var edges = [];
				
			//add double links for testing of multiple connections between nodes
			/*switchLinks.add([{"src-switch":"00:00:00:00:00:00:00:02","src-port":131072,"dst-switch":"00:00:00:00:00:00:00:01","dst-port":196608,"type":"internal","direction":"bidirectional"},
			                 {"src-switch":"00:00:00:00:00:00:00:03","src-port":131072,"dst-switch":"00:00:00:00:00:00:00:01","dst-port":196608,"type":"internal","direction":"bidirectional"}]);*/
			                 
			 /* switchLinks.add([{"src-switch":"00:00:00:00:00:00:00:01","src-port":65536,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":131072,"type":"internal","direction":"unidirectional"},
			  					{"src-switch":"00:00:00:00:00:00:00:01","src-port":131072,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":65536,"type":"internal","direction":"bidirectional"}]);  */
			  					
			 /* switchLinks.add([{"src-switch":"00:00:00:00:00:00:00:02","src-port":65536,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":65536,"type":"internal","direction":"unidirectional"},
			  					{"src-switch":"00:00:00:00:00:00:00:02","src-port":131072,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":131072,"type":"internal","direction":"bidirectional"},
			  					{"src-switch":"00:00:00:00:00:00:00:02","src-port":196608,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":196608,"type":"internal","direction":"bidirectional"},
			  					{"src-switch":"00:00:00:00:00:00:00:02","src-port":131072,"dst-switch":"00:00:00:00:00:00:00:03","dst-port":131072,"type":"internal","direction":"bidirectional"}]); */ 					            
				
			// Create source and target links based on dpid instead of index
			_.forEach(switchLinks.models, function(e) {
    			// Get the source and target nodes
    			if (e.attributes['src-switch'] !== e.attributes['dst-switch']){
    			
    			var sourceNode = self.switches.filter(function(n) {
    												  	return n.attributes.dpid === e.attributes['src-switch']; 
    												  })[0],
        		targetNode = self.switches.filter(function(n) {
    											  		return n.attributes.dpid === e.attributes['dst-switch']; 
    											 })[0];
	
    			// Add the edge to the array
   		 		this.edges.push({source: sourceNode, sourcePort: e.attributes['src-port'], target: targetNode, targetPort: e.attributes['dst-port'], curve: 1, seen: 0, direction: e.attributes['direction']});
   		 		}
   		 		//console.log(this.edges);
			}, this);
			
			// Create source and target links based on dpid instead of index
			// WHEN WORKING ON MINI UNCOMMENT IF STATEMENT!!
			// THIS IS BECAUSE MININET RETURNS HOSTS THAT DO NOT HAVE AN IP 
			// ADDRESS WHICH THEN ALSO DO NOT HAVE ATTACHMENT POINTS
			_.forEach(this.hosts.models, function(e) {
    			// Get the source and target nodes
    			// UNCOMMENT THIS IF STATEMENT WHEN USING MININET!!
    			//if (e.attributes.ipv4.length > 0 && e.attributes.ipv4 !== "ip not found") {
    				var sourceNode = self.switches.filter(function(n) {
    														if (e.attributes.attachmentPoint[0] != undefined)
    															return e.attributes.attachmentPoint[0].switchDPID ===  n.attributes.dpid; 
    												  	  })[0],
        			targetNode = self.switches.filter(function(n) { 
        													if (e.attributes.attachmentPoint[0] != undefined)
    											  				return n.attributes.dpid === e.attributes.attachmentPoint[0].switchDPID; 
    											  	 	  })[0];

    			// Add the edge to the array
    			if (targetNode != undefined){
    				targetNode = e;
   		 			self.edges.push({source: sourceNode, sourcePort: e.attributes.attachmentPoint[0].port, target: targetNode, curve: 1, seen: 0, direction: 'bidirectional'});
   		 		}
   		 		//}
			}, this);

			var graphCenter = [];
			graphCenter.push(width-45);
			graphCenter.push(height / 1.5);
  			
  			this.force
      			.nodes(this.switches.models)
      			.links(this.edges)
      			.size(graphCenter) 
      			.on("end", end)
      			.start();
			
			//draw the triangle which represents the arrow for directed graph
			this.svg.append("svg:defs").selectAll("marker")
    						  	 .data([9])
  								 .enter().append("svg:marker")
    							 .attr("id", "EndTriangle")
    							 .attr("viewBox", "0 -5 10 10")
   	 							 .attr("refX", 24)
    							 .attr("refY", -1.5)
    							 .attr("markerWidth", 7)
    							 .attr("markerHeight", 7)
    							 .attr("orient", "auto")
  								 .append("svg:path")
    							 .attr("d", "M0,-5L10,0L0,5");
    							 
            this.svg.append("svg:defs").selectAll("marker")
    						  	 .data([9])
  								 .enter().append("svg:marker")
    							 .attr("id", "StartTriangle")
    							 .attr("viewBox", "0 -5 10 10")
   	 							 .attr("refX", -14)
    							 .attr("refY", -1.5)
    							 .attr("markerWidth", 7)
    							 .attr("markerHeight", 7)
    							 .attr("orient", "auto")
  								 .append("svg:path")
    							 .attr('d', 'M10,-5L0,0L10,5');
    
    		var visiblePath = this.svg.append("g").selectAll("path")
    				   		   .data(this.edges)
    				   		   .enter()
    				   		   .append("svg:path")
    				   		   .attr("class", "link")
    				   		   .attr("marker-end", "url(#EndTriangle)")
    				   		   .attr("marker-start", function(d) {
    												 	//console.log(d.direction);
    												 	if (d.direction == 'bidirectional')
    												 		return "url(#StartTriangle)";
    												 	else 
    												 		return "";
  				                                     })
    				   		   .attr("fill", function(d) {
    												 	//console.log(d.direction);
    												 	if (d.direction == 'unidirectional')
    												 		return "none";
    												 	else 
    												 		return "transparent";
    										});
    		
    		//used to widen pointer-event area for displaying tooltips							
    		var invisiblePath = this.svg.append("g").selectAll("path")
    				   		   .data(this.edges)
    				   		   .enter()
    				   		   .append("svg:path")
    				   		   .attr("class", "link2")
    				   		   .attr("fill", function(d) {
    												 	//console.log(d.direction);
    												 	if (d.direction == 'unidirectional')
    												 		return "none";
    												 	else 
    												 		return "transparent";
    										})
    							.attr('pointer-events', 'stroke');
        	
        	this.displayTooltips();
      
    		this.svg.append("g")
    			    .call(d3.behavior.zoom().on("zoom", rescale));

   			node = node.data(this.switches.models)
   					   .enter().append("g")
   					   .attr("class", "node")
   					   .attr("id", function(d) { if (d.attributes.dpid === undefined) return d.attributes['mac'][0]; else return d.attributes.dpid; })
      				   .call(drag);
 
      		node.append("circle")
      				   .attr("r", 9)
      				   .style("fill", function(d) { if (d.attributes.dpid === undefined) return "grey"; else return "blue"; });
			
			var self = this;
			
			// At the end of the layout simulation, move nodes laying
			// outside of the svg element inside of it and set the size of
			// the scrollable window based on the graph size
			function end() {
				self.shiftAmountx = 0;
				self.shiftAmounty = 0;
				var pxList = [];
				var pyList = [];
    			Array.min = function( array ){
        			return Math.min.apply( Math, array );
    			};
    			
    			Array.max = function( array ){
        			return Math.max.apply( Math, array );
    			};
    			
    			function sortNumber(a,b) {
    				return a - b;
				}

				var outOfBoundsx = [];
				var outOfBoundsy = [];
				
				_.forEach(self.switches.models, function(item) {
					pxList.push(Math.round(item.px));
					pyList.push(Math.round(item.py));
  					if (item.px < 0)
  						outOfBoundsx.push(item.px);
  					if (item.py < 0)
  						outOfBoundsy.push(item.py);
				}, this);
				
				if (outOfBoundsx.length > 0){
					self.shiftAmountx = (Array.min(outOfBoundsx) * -1) + 15;
            	}
            	
            	if (outOfBoundsy.length > 0){
					self.shiftAmounty = (Array.min(outOfBoundsy) * -1) + 15;
            	}
            	
            	self.svg.attr("transform",
            			"translate(" + self.shiftAmountx + "," + self.shiftAmounty + ")");
            	
            	// dynamically set inner window size base on network graph size
            	var xHigh1 = pxList[pxList.length - 1];
            	var xHigh2 = pxList[pxList.length - 2];
            	var xLow1 = pxList[0];
            	var xLow2 = pxList[1];
            	
            	var yHigh1 = pyList[pxList.length - 1];
            	var yHigh2 = pyList[pxList.length - 2];
            	var yLow1 = pyList[0];
            	var yLow2 = pyList[1];
            	
            	var dynamicHeightx = Math.max( Math.abs(xHigh1 - xHigh2), Math.abs(xLow1 - xLow2) );
            	var dynamicWidth1x = Math.max( Math.abs(xLow2 - xHigh1), Math.abs(xLow2 - xHigh2) );
            	var dynamicWidth2x = Math.max( Math.abs(xLow1 - xHigh1), Math.abs(xLow1 - xHigh2) );
            	var dynamicWidthx = Math.max( dynamicWidth1x, dynamicWidth2x );
            	
            	var dynamicHeighty = Math.max( Math.abs(yHigh1 - yHigh2), Math.abs(yLow1 - yLow2) );
            	var dynamicWidth1y = Math.max( Math.abs(yLow2 - yHigh1), Math.abs(yLow2 - yHigh2) );
            	var dynamicWidth2y = Math.max( Math.abs(yLow1 - yHigh1), Math.abs(yLow1 - yHigh2) );
            	var dynamicWidthy = Math.max( dynamicWidth1y, dynamicWidth2y );
            	
            	var dynamicWidth = Math.max( dynamicWidthx, dynamicWidthy );
            	var dynamicHeight = Math.max( dynamicHeightx, dynamicHeighty ); 
            	self.dynamicWindowSize = Math.max( dynamicWidth, dynamicHeight ) * 3;
  				
  				if (self.dynamicWindowSize > window.innerWidth)
            		d3.select(".inner").style("width", self.dynamicWindowSize + "px");
            		
            	if (self.dynamicWindowSize > window.innerHeight)
            		d3.select(".inner").style("height", self.dynamicWindowSize + "px");
            	
				self.force.on("end", null);
			}
			
			this.linkObj = {};
			this.linkArray = [];
			var self = this;
			var curveFactor1 = 1;
			var curveFactor2 = 1;
			var i = 0;
			
			// Runs the force layout simulation one step		
			function tick() {
  			    visiblePath.attr("d", function(d) {
  			    	var linkObj = {};
  			    	linkObj[d.source.id] = d.target.id;
  			    	var dx = d.target.x - d.source.x,
        				dy = d.target.y - d.source.y;
  			    	if (($.inArray((JSON.stringify(linkObj)), self.linkArray)) == -1) {
  			    		d["seen"] = 1;
  			    		self.linkArray.push(JSON.stringify(linkObj));
  			    		console.log("add to list, curve stays the same");
  			    	}
  			    	else if (($.inArray((JSON.stringify(linkObj)), self.linkArray)) > -1 && d.curve == 1 && d.seen == 0) {
  						if ( i == 0) {
  			    			var temp = d.source;
  			    			d.source = d.target;
  			    			d.target = temp;
  			    			d["seen"] = 1;
  			    			console.log("increase curve");
  						}
  						else if (i % 2 == 0) {
  			    			var temp = d.source;
  			    			d.source = d.target;
  			    			d.target = temp;
  			    			curveFactor1 += 0.65;
  			    			d["curve"] = curveFactor1;
  			    			d["seen"] = 1;
  			    			console.log("increase curve");
  			    		}
  			    		else {
  			    			curveFactor2 += 0.7;
  			    			d["curve"] = curveFactor2;
  			    			d["seen"] = 1;
  			    			console.log("increase curve");
  			    		}
  			    		i++;
  			    	}
  			    	else {
  			    		//console.log("stays the same");
  			    	}
        			var dr = Math.sqrt(dx * dx + dy * dy);
    				return "M" + d.source.x + "," + d.source.y + "A" + (dr/d.curve) + "," + (dr/d.curve) + " 0 0,1 " + d.target.x + "," + d.target.y;
  				});

  				node.attr("transform", function(d) {
    				return "translate(" + d.x + "," + d.y + ")";
  				});
  				
  				invisiblePath.attr("d", function(d) {
  			    	var linkObj = {};
  			    	linkObj[d.source.id] = d.target.id;
  			    	var dx = d.target.x - d.source.x,
        				dy = d.target.y - d.source.y;
  			    	if (($.inArray((JSON.stringify(linkObj)), self.linkArray)) == -1) {
  			    		d["seen"] = 1;
  			    		self.linkArray.push(JSON.stringify(linkObj));
  			    	}
  			    	else if (($.inArray((JSON.stringify(linkObj)), self.linkArray)) > -1 && d.curve == 1 && d.seen == 0) {
  						if ( i == 0) {
  			    			var temp = d.source;
  			    			d.source = d.target;
  			    			d.target = temp;
  			    			d["seen"] = 1;
  						}
  						else if (i % 2 == 0) {
  			    			var temp = d.source;
  			    			d.source = d.target;
  			    			d.target = temp;
  			    			curveFactor1 += 0.65;
  			    			d["curve"] = curveFactor1;
  			    			d["seen"] = 1;
  			    		}
  			    		else {
  			    			curveFactor2 += 0.7;
  			    			d["curve"] = curveFactor2;
  			    			d["seen"] = 1;
  			    		}
  			    		i++;
  			    	}
  			    	else {
  			    		//console.log("stays the same");
  			    	}
        			var dr = Math.sqrt(dx * dx + dy * dy);
    				return "M" + d.source.x + "," + d.source.y + "A" + (dr/d.curve) + "," + (dr/d.curve) + " 0 0,1 " + d.target.x + "," + d.target.y;
  				});

  				node.attr("transform", function(d) {
    				return "translate(" + d.x + "," + d.y + ")";
  				});
  			}
			
			// Allows for a sticky force directed graph
			function dragstart(d) {
  				d.fixed = true;
  				d3.select(this).classed("fixed", true);
  				console.log(d);
			}									                    		      	                  		          	                  	  		
        		
		},
		
		// SC specific, display tooltips containing port stats for each link
		displayTooltips: function() {
			this.obj = {};
			var collector = new PortStatCollectorCollection({model: PortStatCollectorModel});
			this.portStats;
			
			// SC specific..Get the mapping of longer port numbers to shorter ones
			_.forEach(this.switches.models, function(item) {
				_.forEach(item.attributes.ports, function(item2) {
					var value = item2.portNumber;
					var key = item2.ofphysicalPort.portNumber;
					if (!(key in this.obj))
						this.obj[key] = value;
					console.log(this.obj);
					console.log(item2);
				}, this);
			}, this);
			var self = this;
			
			// Get port statistics and initialize tipsy tooltip functionality
			collector.fetch().complete(function () {
				this.portStats = collector;
				var portNumber = "";
				
				_.forEach(collector.models, function(item) {
					for (var i = 0; i < item.attributes.portId.length && $.isNumeric(item.attributes.portId[i]); i++){
						portNumber += item.attributes.portId[i];
					}
					item.set("portNumber", self.obj[portNumber]);
					console.log(item);
					portNumber = "";
				}, this);
        								
        		d3.selectAll("path").attr("original-title", function(d, i) { if (d.source != undefined){
        		                                                             	var self = this;
          																		this.sourceStats;
          																		this.targetStats;
        		                                                             	_.forEach(collector.models, function(item) {
        		                                                             				console.log(item);
          																					console.log(item.attributes.portNumber);
          																					console.log(d);
          																					if(item.attributes.switchId == d.source.id && item.attributes.portNumber == d.sourcePort){
          																						console.log(item);
          																						console.log(item.attributes.portNumber);
          																						console.log(d);
          																						self.sourceStats = item;
          																					}
          																					if(item.attributes.switchId == d.target.id && item.attributes.portNumber == d.targetPort){
          																						self.targetStats = item;
          																					}
          																		}, this);
          																		
          																		console.log(this.sourceStats);
          																		
          																	    if (this.targetStats != undefined){
          																			return '<u>Source</u>' + 
          						  	 													   '</br>Switch ID: ' + d.source.id + 
          					      														   '</br>Port ID: ' + this.sourceStats.attributes.portId + 
          					       															'</br>Port Speed: ' + this.sourceStats.attributes.portSpeed +
          					       															'</br>Packet Rate: ' + this.sourceStats.attributes.packetRate +
          					       															'</br>Bit Rate: ' + this.sourceStats.attributes.bitRate +
          					       															'</br>Flow Count: ' + this.sourceStats.attributes.flowCount +
          					       															'</br></br><u>Destination</u>' +
          					       															'</br>Switch ID: ' + d.target.id +
          					       															'</br>Port ID: ' + this.targetStats.attributes.portId + 
          					      		 													'</br>Port Speed: ' + this.targetStats.attributes.portSpeed +
          					       															'</br>Packet Rate: ' + this.targetStats.attributes.packetRate +
          					       															'</br>Bit Rate: ' + this.targetStats.attributes.bitRate +
          					       															'</br>Flow Count: ' + this.targetStats.attributes.flowCount;
          																		}
          																		else{
          																			return '<u>Source</u>' + 
          						   															'</br>Switch ID: ' + d.source.id + 
          					       															'</br>Port ID: ' + this.sourceStats.attributes.portId + 
          					       															'</br>Port Speed: ' + this.sourceStats.attributes.portSpeed +
          					       															'</br>Packet Rate: ' + this.sourceStats.attributes.packetRate +
          					       															'</br>Bit Rate: ' + this.sourceStats.attributes.bitRate +
          					       															'</br>Flow Count: ' + this.sourceStats.attributes.flowCount +
          					       															'</br></br><u>Destination</u>' +
          					       															'</br>Host: ' + d.target.id;
          																		}
        		                                                             } 
        		                                                           });
        									
        		$('path').tipsy({ 
       	 			gravity: 'n', 
        			html: true, 
        			title: function() { return this.getAttribute('original-title'); },
      			});
      			//d3.selectAll("path").attr("original-title", '');
        	}, this);
		},
		
		// On clicking the show label button, display 
		// or remove labels next to each node in the graph
		toggleLabels: function (e) {
			var node = this.svg.selectAll(".node");
			var self = this;
			if (this.toggleCount % 2 === 0) {
				node.append("text")
    				.attr("x", 12)
    				.attr("dy", ".35em")
    				.attr("id", "nodeLabels")
    				.text(function(d) {if (d.attributes.id === undefined || d.attributes.id.length < 23){ 
    										if(d.attributes['ipv4'] === "ip not found"){
    											return d.attributes['ipv4'] + "/" + d.attributes['mac'][0];
    										} 
    										else{
    											return d.attributes['ipv4'][0] + "/" + d.attributes['mac'][0];
    										}
    									} 
    									else 
    										return d.attributes.id; 
    						});
				this.toggleCount++;	
				//console.log(this.ipToMac);
			}
			else {
				var labels = this.svg.selectAll("#nodeLabels");
				labels.remove();	
				this.toggleCount++;
			}
		},
		
		// Create a new svg element and append a rectangle,
		// group element, circles and text to represent the
		// graph legend
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
         							if (d === 0) return "grey"; else return "blue";
      							  });	
      
   			legend.selectAll('text')
   				  .data([0,1])
   				  .enter()
   				  .append("text")
  				  .attr("x", 39)
  				  .attr("y", function(d, i){ return (i *  30) + 19})
  				  .text(function(d) { if (d === 0) return "hosts"; else return "switches"; });
		},
		
		// On selecting a node to view locally, highlight the selected
		// node, hide nodes and links not connected to the selected node,
		// zoom in on the selected node, alter graph force attributes and
		// display the done button 
		nodeSelect: function (e) {
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			var nodeID = $(e.currentTarget).val();
			var nodeData = this.switches.get(nodeID);
			this.x = nodeData.px;
			this.y = nodeData.py;
			var self = this;
			
			var allNodes = this.svg.selectAll("g");
			allNodes.style("stroke", "#fff")
				    .style("stroke-width", 1.5);
				    
			this.node = this.svg.selectAll("g").filter(function(d, i) { if(d != undefined) return d.id==nodeData.id; });
			
			this.node.style("stroke", "black")
				     .style("stroke-width", 2.5);
			
			var nodesToHide = [];
			
			var linksToHide = this.svg.selectAll(".link").filter(function(d, i) { 
																	if (d.source.px === self.x) 
																		nodesToHide.push(d.target.px); 
																	if (d.target.px === self.x) 
																		nodesToHide.push(d.source.px); 
																	return d.source.px === self.x || d.target.px === self.x || d.source.py === self.y || d.target.py === self.y; 
																 });
			
			nodesToHide.push(self.x);
			
			//hide nodes not directly connected to selected node
			var hiddenNode = this.svg.selectAll(".node")
							     .style("opacity", function(d,i) {
							     						 var found = false;
							     						 _.forEach(nodesToHide, function(item) {
							     						 	if (d.px === item)
							     						 		found = true;
        												 }, this);
        												 if (!found)
        												 	return 0;
							     				    });
			
			//hide links not directly connected to selected node				     				    
			var hiddenLink = this.svg.selectAll(".link")
							         .style("opacity", function(d,i) {
							     							if (d.source.px === self.x || d.target.px === self.x)
        												 		return 1;
        												 	else
        												 		return 0;
							     				    });
			
			//re-size the marker
			d3.select("#EndTriangle").attr("markerWidth", 5)
			 					  .attr("markerHeight", 5)
			 					  .attr("refX", 30)
			 					  .attr("refY", -2.4);
			 					  
			 					  d3.select("#StartTriangle").attr("markerWidth", 5)
			 					  .attr("markerHeight", 5)
			 					  .attr("refX", -20)
			 					  .attr("refY", -1.5);
			
			var trans = [];
			trans.push(((width/2)-(self.x*1.5)) - 18);
			trans.push(((height/2)-(self.y*1.5)) - ((height/2) * .55));
			
			this.svg.attr("transform",
            		"translate(" + trans + ")"
            			+ " scale(" + 1.5 + ")");
            			
            this.force.size([width+45, height/1.5])
    				  .charge(-400)
    			      .linkDistance(90)
    			      .start();
            
			$(function() { $("#doneDiv").show(); });
		},
		
		// On clicking done in local topology view, return to intial
		// layout of graph and hide the done button
		scaleOut: function () {
			var height = window.innerHeight;
			var width = window.innerWidth-45;
			var allNodes = this.svg.selectAll(".node")
								   .style("opacity", 1);
								   
			var allLinks = this.svg.selectAll(".link")
								   .style("opacity", 1);
			
            this.node.style("stroke", "#fff")
				.style("stroke-width", 1.5);
    							 
    		//re-size the marker
			d3.select("#EndTriangle").attr("markerWidth", 7)
			 					  .attr("markerHeight", 7)
			 					  .attr("refX", 24)
			 					  .attr("refY", -1.5);
			 					  
		    d3.select("#StartTriangle").attr("markerWidth", 7)
			 					  .attr("markerHeight", 7)
			 					  .attr("refX", -14)
			 					  .attr("refY", -1.5);
				
			var trans = [];
			trans.push(0);
			trans.push(0);
			
			this.svg.attr("transform",
            		"translate(" + this.shiftAmountx + "," + this.shiftAmounty + ")");
            		
			//d3.selectAll(".node").data().fixed = false;
			//d3.selectAll(".node").classed("fixed", false);       
            		
            this.force.size([width+45, height/1.5])
            		  .nodes(this.switches.models)
      				  .links(this.edges)
    				  .charge(-700)
    			      .linkDistance(100)
    			      .start();
            		
            $(function() { $("#doneDiv").hide(); });
		},
		
		viewTrafficMode: function () {
			clearInterval(this.interval);
			d3.selectAll("path").attr("original-title", '');
		
			$(function() { $("#viewDiv").hide(); });
			$(function() { $("#exitDiv").show(); });
			
			d3.selectAll(".node").on("click", test);
			d3.selectAll(".node fixed").on("click", test);
			
			var self = this;
			
			function test(d) { 
				d3.selectAll(".aClass").remove();
				d3.selectAll("circle").attr("original-title", '');
				d3.selectAll("path.link").style("stroke", "#999")
										 .style("stroke-width", "1.0px");
				
				var nodeData = self.switches.get(d.id);
				this.node = self.svg.selectAll("g").filter(function(d, i) {  if(d != undefined && JSON.stringify(d.id).length < 25) { return d.id==nodeData.id; }});
				
				console.log(this.node[0][0]);
				
				if (this.node[0][0] != undefined){
				if(self.hostSelectedCount == 0){
					console.log("1");
					self.node1 = this.node;
					self.hostSelectedCount++;
				}
				else if(self.hostSelectedCount == 1 && self.node1 == undefined && this.node[0][0] !== self.node2[0][0]){
					console.log("2");
					self.node1 = this.node;
					self.hostSelectedCount++;
				}
				
				else if(self.hostSelectedCount == 1 && this.node[0][0] !== self.node1[0][0]){
					console.log("4");
					self.node2 = this.node;
					self.hostSelectedCount++;
				}
				
				else {
					console.log("host select else");
				}
				
				//console.log(self.node1);
				//console.log(" ");
				//console.log(self.node2);
				
				if(this.node[0][0] === self.node1[0][0]){
					self.node1 = this.node;
					var node = this.node;
					//console.log("preaux1");
					self.auxTraffic1(d, node);
					if(self.hostSelectedCount == 2)
						self.displayPath();
				}
				else if (this.node[0][0] === self.node2[0][0]){
					self.node2 = this.node;
					var node = this.node;
					//console.log("preaux2");
					self.auxTraffic2(d, node);
					if(self.hostSelectedCount == 2)
						self.displayPath();
				}
				else{
					console.log("aux traffic select else");
					if(self.hostSelectedCount == 2)
						self.displayPath();
				}
				}
			}
		},
		
		auxTraffic1: function (d, node) {
			console.log("aux1");
			this.node = node;
			this.clearLabelCount1++;  	 
				if (this.clearLabelCount1 % 3 === 0) {
					d3.selectAll("#node1").text(" ");
					this.toggleSwitchCount = 0;
					this.node.style("stroke", "#fff")
				             .style("stroke-width", 1.5);
				    this.node1 = undefined;
				    this.hostSelectedCount--;
				}   
				else {	 
				var node = this.svg.selectAll(".node");
				if (this.toggleSwitchCount1 % 2 === 0) {
					this.node.style("stroke", "black")
				     	     .style("stroke-width", 2.5);
					d3.selectAll("#node1").text(" ");
					this.node.append("text")
    					.attr("x", 12)
    					.attr("dy", "1.55em")
    					.attr("id", "node1")
    					.text(function(d) { return " source"; });
					this.toggleSwitchCount1++;	
				}
				else {
    				d3.selectAll("#node1").text(" ");
    				this.node.append("text")
    					.attr("x", 12)
    					.attr("dy", "1.55em")
    					.attr("id", "node1")
    					.text(function(d) { return " destination"; });
					
					this.toggleSwitchCount1++;
				}
				}
		},
		
		auxTraffic2: function (d, node) {
			console.log("aux2");
			this.node = node;
			this.clearLabelCount2++;  	 
				if (this.clearLabelCount2 % 3 === 0) {
					d3.selectAll("#node2").text(" ");
					this.toggleSwitchCount2 = 0;
					this.node.style("stroke", "#fff")
				             .style("stroke-width", 1.5);
				    this.node2 = undefined;
				    this.hostSelectedCount--;
				}   
				else {	 
				var node = this.svg.selectAll(".node");
				if (this.toggleSwitchCount2 % 2 === 0) {
					this.node.style("stroke", "black")
				     	     .style("stroke-width", 2.5);
					d3.selectAll("#node2").text(" ");
					this.node.append("text")
    					.attr("x", 12)
    					.attr("dy", "1.55em")
    					.attr("id", "node2")
    					.text(function(d) { return " source"; });
					this.toggleSwitchCount2++;	
				}
				else {
    				d3.selectAll("#node2").text(" ");
    				this.node.append("text")
    					.attr("x", 12)
    					.attr("dy", "1.55em")
    					.attr("id", "node2")
    					.text(function(d) { return " destination"; });
					
					this.toggleSwitchCount2++;
				}
				}
		},
		
		exitViewTrafficMode: function () {
			$(function() { $("#exitDiv").hide(); });
			$(function() { $("#viewDiv").show(); });
			
			d3.selectAll(".node").on("click", null);
			d3.selectAll(".node fixed").on("click", null);
			
			this.svg.selectAll(".node").style("stroke", "#fff")
				                       .style("stroke-width", 1.5);
			
			d3.selectAll("#node1").text(" ");
			d3.selectAll("#node2").text(" ");
			this.node1 = undefined;
			this.node2 = undefined;
			this.hostSelectedCount = 0;
			this.toggleSwitchCount1 = 0;
			this.toggleSwitchCount2 = 0;
			this.clearLabelCount1 = 0;
			this.clearLabelCount2 = 0;
			
			d3.selectAll("path.link").style("stroke", "#999")
									 .style("stroke-width", "1.0px");
			
			d3.selectAll(".aClass").remove();
			
			d3.selectAll("circle").attr("original-title", '');
			
			this.displayTooltips();
			var self = this;
			this.interval = setInterval(function(){
						self.displayTooltips();
					}, 5000);
		},
		
		displayPath: function () {
			console.log(this.node1.text());
			console.log(this.node2.text());
			console.log(this.node1);
			//console.log("5");
			//console.log(this.switchLinks);
			var label1 = this.node1.text().trim();
			var label2 = this.node2.text().trim();
			var newLabel1 = label1;
			var newLabel2 = label2;
			
			for (var i = label1.length; i >= 0; i--){
				if (label1.charAt(i) == " ")
					newLabel1 = label1.substring(i, label1.length).trim();
			}
			//console.log(newLabel1);
			
			for (var i = label2.length; i >= 0; i--){
				if (label2.charAt(i) == " ")
					newLabel2 = label2.substring(i, label2.length).trim();
			}
			//console.log(newLabel2);
			
			/*if (newLabel1 == "destination"){
				$(this.node2[0]).tipsy({'original-title': ""}); 
				$(this.node1[0]).tipsy({ 
       	 			gravity: 'n', 
        			html: true, 
        			title: function() { console.log("blue"); return "blue"; },
      			});
			}
			else if (newLabel2 == "destination") {
				$(this.node1[0]).tipsy({'original-title': ""}); 
				$(this.node2[0]).tipsy({ 
       	 			gravity: 'n', 
        			html: true, 
        			title: function() { console.log("red"); return "red"; },
      			});
			}
			else {
			 	console.log("nothing");
			}*/
			
			
			//create a mapping of host ip's to mac's
			var self = this;
			_.forEach(this.hosts.models, function(item) {
				if(item.attributes['ipv4'] === "ip not found"){
    				var mac = item.attributes['mac'][0]; 
    				self.ipToMac[mac] = item.attributes['ipv4'];
    			} 
    			else{
    				var mac = item.attributes['mac'][0]; 
    				self.ipToMac[mac] = item.attributes['ipv4'][0];
    			}
			}, this);
			//console.log(this.ipToMac);
			var node1MAC = this.node1.data()[0].id;
			var node2MAC = this.node2.data()[0].id;
			var node1IP = self.ipToMac[node1MAC];
			var node2IP = self.ipToMac[node2MAC];
			//console.log(node1IP);
			//console.log(node2IP);
			
			this.pathObj = {};
			
			if ((newLabel1 == "source" && newLabel2 == "destination") || (newLabel1 == "destination" && newLabel2 == "source")){
				var flowCollector = new FlowStatCollectorCollection({model: FlowStatCollectorModel});
				flowCollector.fetch().complete(function () {
					console.log("fetching flow stats");
					var self2 = self;
					self.i = 0;
					d3.selectAll(".aClass")
  								  .remove();
  					d3.selectAll("circle").attr("original-title", '');
					_.forEach(flowCollector.models, function(item) {
						//console.log("tests");
						//console.log(JSON.stringify(item));
						//console.log(item.attributes.srcIp);
						//console.log(item.attributes.dstIp);
						
						if (newLabel1 == "source"){
							if (item.attributes.srcIp == node1IP && item.attributes.dstIp == node2IP){
								console.log(JSON.stringify(item));
								self.i++;
								var pathName = "Path " + self.i;
								var desc = 'Switch IP: ' + item.attributes['srcIp'] + 
          					      														   '</br>DestinationIP: ' + item.attributes['dstIp'] + 
          					       															'</br>Source Port: ' + item.attributes['srcPort'] +
          					       															'</br>Destination Port: ' + item.attributes['dstPort'] +
          					       															'</br>Capacity: ' + item.attributes['capacity'] +
          					       															'</br>Packet Rate: ' + item.attributes['packetRate'] +
          					       															'</br>Bit Rate: ' +item.attributes['bitRate'];
  								self2.pathObj[pathName] = item.attributes.path;
  								console.log(self2.pathObj[pathName]);
								d3.select(".flowPath")
  								  .append("a")
  								  .attr("id", function(d, i) { return 'Switch IP: ' + item.attributes['srcIp'] + 
          					      														   '</br>DestinationIP: ' + item.attributes['dstIp'] + 
          					       															'</br>Source Port: ' + item.attributes['srcPort'] +
          					       															'</br>Destination Port: ' + item.attributes['dstPort'] +
          					       															'</br>Capacity: ' + item.attributes['capacity'] +
          					       															'</br>Packet Rate: ' + item.attributes['packetRate'] +
          					       															'</br>Bit Rate: ' +item.attributes['bitRate']; })
  								  .attr("class", "aClass")
  								  .html(node1IP + " port " + item.attributes.srcPort + " to " + node2IP + " port " + item.attributes.dstPort)
  								  .on("click", function () {showLinks(node1MAC, node2MAC, self2.pathObj[pathName], desc); })
  								  .append("br");
							}
						}
						else{
							if (item.attributes.srcIp == node2IP && item.attributes.dstIp == node1IP){
								console.log(JSON.stringify(item));
								self.i++;
								var pathName = "Path " + self.i;
								var desc = 'Switch IP: ' + item.attributes['srcIp'] + 
          					      														   '</br>DestinationIP: ' + item.attributes['dstIp'] + 
          					       															'</br>Source Port: ' + item.attributes['srcPort'] +
          					       															'</br>Destination Port: ' + item.attributes['dstPort'] +
          					       															'</br>Capacity: ' + item.attributes['capacity'] +
          					       															'</br>Packet Rate: ' + item.attributes['packetRate'] +
          					       															'</br>Bit Rate: ' +item.attributes['bitRate'];
  								self2.pathObj[pathName] = item.attributes.path;
  								console.log(self2.pathObj[pathName]);
								d3.select(".flowPath")
  								  .append("a")
  								  .attr("id", function(d, i) { return 'Switch IP: ' + item.attributes['srcIp'] + 
          					      														   '</br>DestinationIP: ' + item.attributes['dstIp'] + 
          					       															'</br>Source Port: ' + item.attributes['srcPort'] +
          					       															'</br>Destination Port: ' + item.attributes['dstPort'] +
          					       															'</br>Capacity: ' + item.attributes['capacity'] +
          					       															'</br>Packet Rate: ' + item.attributes['packetRate'] +
          					       															'</br>Bit Rate: ' +item.attributes['bitRate']; })
  								  .attr("class", "aClass")
  								  .html(node2IP + " port " + item.attributes.srcPort + " to " + node1IP + " port " + item.attributes.dstPort)
  								  .on("click", function () { showLinks(node2MAC, node1MAC, self2.pathObj[pathName], desc); })
  								  .append("br");
							}
						}
						
						function showLinks(source, target, path, desc) { 
							var t = (document.getElementById(target));
							var pathSelected = document.getElementById(desc);
							//d3.selectAll(pathSelected).attr("title", desc);
							console.log(pathSelected);
							console.log(t.firstChild);
							$(t.firstChild).attr("original-title", desc);
							$(t.firstChild).tipsy({ 
       	 						gravity: 'n', 
        						html: true,
        						//trigger: 'manual',
        						title: function() { return this.getAttribute('original-title'); },
      						});
      						
      						//c.tipsy('show');
      						
							d3.selectAll("path.link").style("stroke", "#999")
													 .style("stroke-width", "1.0px");
							console.log(path); 
							//console.log(d3.selectAll(".node")._data_);
							/*_.forEach(d3.selectAll("path.link")[0], function(item) {
								//console.log(d3.select(item).attr("original-title"));
								console.log(item.attributes);
							}, this);*/
							var i = 0;
							var finalPath = [];
							var midLinksArray = [];
							var testArray = [];
							var testObj = {};
							_.forEach(self2.switchLinks.models, function(item) {
								var midLinks = {};
								var testObj = {};
								var src = item.attributes['src-switch'];
								if ($.inArray(src, path) > -1){
									var index = $.inArray(src, path);
									console.log(index);
									testObj[path[index]] = item.attributes['dst-switch'];
									console.log(testObj);
								}
								midLinks[src] = item.attributes['dst-switch'];
								midLinksArray[i] = midLinks;
								testArray[i] = testObj;
								i++;
							}, this);
							console.log(testArray);
							
							var al = d3.selectAll("path.link").filter(function(d) {
								//console.log(i);
								if(d.source != undefined){
								console.log(d);
								console.log(d.source.id);
								console.log(d.target.id);
								console.log(source);
								console.log(target);
								console.log(path[0]);
								
								if (d.target.id == source && d.source.id == path[0]){
									console.log(true);
									i++;
								
								}
								var dst = d.target.id;
								var src = d.source.id;
								console.log(dst);
								console.log(midLinksArray[0][dst]);
								var testObj = {};
								
				
								
								
								for (var j = 0; j < midLinksArray.length; j++){
									for (var k = 0; k < path.length; k++){
										//jkl
									}
								}
								
								var src = d.source.id;
								var dst = d.target.id; 
								
								
								if (dst == source && src == path[0])
									return dst == source && src == path[0];
									
								else if (dst == target && src == path[path.length - 1])
									return dst == target && src == path[path.length - 1];
								
								else{
								for (var n = 0; n < testArray.length; n++) {
									if (testArray[n][src] == d.target.id)
										return true;
								}
								}
								
                				}
                				
            				});
            				al.each(function() {
                					d3.select(this).style("stroke", "#32cd32")
                								   .style("stroke-width", "1.0px");
                					//console.log(this);
                					});
                					
            				console.log(al[0]);
						}
						
					}, this);
					console.log(self.pathObj);	
				}, this);
				
			}
		},
				
	});
	return TopologyView;
}); 