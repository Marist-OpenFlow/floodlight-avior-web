var Switches = Backbone.Model.extend({
	defaults:{
		inetAddress:'',
		dpid:'',
		connectedSince:'',
		name:'',
		portNumber:'',
		manufacturer:'',
		hardware:''
	}
});

var SwitchesCollection = Backbone.Collection.extend({
  	model: Switches,
  	
  	url: function(){
  		return this.instanceUrl;
  	},
  	
  	initialize: function(newUrl){
  		this.instanceUrl = newUrl;
  		this.fetch();
  	}
});

var SwitchesView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var template = _.template( $("#switch_template").html(), {} );
		this.$el.html( template );
	},
	
	events: {
		"click input[id=switch_button]": "getSwitches",
		"click input[id=clear_button]": "clearScreen"
	},
	
	getSwitches: function(event){
		var getSwitch = this.todos.fetch().complete(function () {
    	  		$( '#container' ).html( JSON.stringify(getSwitch) );
    	 	});
	},
	
	clearScreen: function(event){
		$("#container").html(" ");
	}
});

var theTodos = new SwitchesCollection('/wm/core/controller/switches/json');
var switch_view = new SwitchesView({ el: $("#switch_container") });
switch_view.todos = theTodos; 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
var FlowView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var template = _.template( $("#flow_template").html(), {} );
		this.$el.html( template );
	},
	
	events: {
		"click input[id=flows_button]": "pushFlows"
	},
	
	pushFlows: function(event){
		var flows = todos.create({
			switch:'00:00:00:00:00:00:00:01',
			name:'flowMod1',
			actions:'output=5',
		});
	},
});

var flow_view = new FlowView({ el: $("#flow_container") });  
 
 
//to get switches (REST API GET requests)	
/*var getSwitch = todos.fetch().complete(function () {
    	  		$( '#container' ).html( JSON.stringify(getSwitch) );
    	 	});*/

//to push flows ( REST API PUT Requests)    	 	 
/*var flows = todos.create({
	switch:'00:00:00:00:00:00:00:00',
	name:'maybe',
	actions:'output=3',
});*/
	
//to delete flows ( REST API DELETE Requests) 
/*$.ajax({
    type: "DELETE",
    url: "/wm/staticflowentrypusher/json",
    data: '{"name":"maybe"}',
    success: function(msg){
        console.log(msg);
    }
});*/

