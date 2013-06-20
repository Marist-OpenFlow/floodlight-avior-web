var Memory = Backbone.Model.extend({}); 

var MemoryCollection = Backbone.Collection.extend({
	model: Memory,
	url: '/wm/core/memory/json'  
});

var MemoryView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var template = _.template( $("#memory_template").html(), {} );
		this.$el.html( template );
	},
});

var theTodos = new MemoryCollection();
var memory_view = new MemoryView({ el: $("#memory_template") });
memory_view.todos = theTodos;