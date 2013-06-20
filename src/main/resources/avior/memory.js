var Memory = Backbone.Model.extend({
	urlRoot: '/wm/core/memory/json' 
}); 

var MemoryCollection = Backbone.Collection.extend({
	model: Memory,
	url: '/wm/core/memory/json'  
});

var MemoryView = Backbone.View.extend({
	el: $('body'), // attaches `this.el` to an existing element.
    
    events: {
      'click button#mem': 'getMemory'
    },
    
	initialize: function(){
    	_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
		this.collection = new MemoryCollection();
		this.collection.bind('fetch', this.appendItem);  
    	this.render(); // not all views are self-rendering. This one is.
	},
    
	render: function(){
		$(this.el).append("<button id='mem'>Controller Memory</button>");
    	$(this.el).append("<ul></ul>");
	},
	
	getMemory: function() {
		var memory = new Memory();
		//this.collection.add(memory.fetch().complete());
    	var finalBlue;
    	var blue = memory.fetch().complete(function () {
    		finalBlue = JSON.stringify(blue);
    		alert(finalBlue);
    	});
	}
});
  
var memoryView = new MemoryView();