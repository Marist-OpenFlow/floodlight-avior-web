var Memory = Backbone.Model.extend({
});

var MemoryCollection = Backbone.Collection.extend({
  	model: Memory,
  	url: '/wm/core/memory/json '
});

var MemoryView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var template = _.template( $("#controllermem_template").html(), {} ); 
		this.$el.html( template ); 
	}, 
	
	events: {
	   "click input[id=controllermem_buttom]": "getcontrollermem",
	   "click input[id=clear_button]": "clearScreen"
		
		},
		
	getControllerMemory
	
});

var theTodos = new SwitchesCollection();
var switch_view = new SwitchesView({ el: $("#switch_container") });
switch_view.todos = theTodos; 
 
