var Flows = Backbone.Model.extend({
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

var Switches = Backbone.Model.extend({
	urlRoot:'/wm/core/controller/switches/json',
	defaults:{
		dpid:'',
		actions:'',
		attributes:'',
		inetAddress:'',
		connectedsince:'',
		ports:'',
		buffers:'',
		capabilities:'',
		harole:''
	}
});

var FlowsCollection = Backbone.Collection.extend({
  	model: Flows,
  	url: '/wm/staticflowentrypusher/list/all/json'
});

var SwitchesCollection = Backbone.Collection.extend({
	model:Switches,
});

//var todos = new SwitchesCollection();


var SwitchesView = Backbone.View.extend({
	el: $('body'),
	events: {
		"click button#switch_button": "getSwitches",
		"click input#clear_button": "clearScreen"
	},
	
	initialize: function(){
		_.bindAll(this, 'render', 'getSwitches');
		
		this.collection = new List()
		this.collection.bind('switch_button', this.append
		
		this.render();
	},
	
	render: function(){
		var self = this;
		$(this.el).append("<input type='button' id='switch_button'>Get Switches</button>");
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

