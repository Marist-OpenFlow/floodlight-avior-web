var Switches = Backbone.Model.extend({
	urlRoot: '/wm/staticflowentrypusher/json',
	defaults:{
		switch:'',
		name:'',
		cookie:'',
		priority:'',
		ingressport:'',
		active:'',
		actions:'',
		wildcards:'',
		srcmac:'',
		dstmac:'',
		vlanid:'',
		vlanpriority:'',
		protocol:'',
		srcip:'',
		dstip:'',
		srcport:'',
		dstport:''
	}
});

var SwitchesCollection = Backbone.Collection.extend({
  	model: Switches,
  	url: '/wm/staticflowentrypusher/list/all/json'
});

//var todos = new SwitchesCollection();


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
		//var getSwitch = todos.fetch().complete(function () {
		var getSwitch = this.todos.fetch().complete(function () {
    	  		$( '#container' ).html( JSON.stringify(getSwitch) );
    	 	});
	},
	
	clearScreen: function(event){
		$("#container").html(" ");
	}
});

var theTodos = new SwitchesCollection();
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

