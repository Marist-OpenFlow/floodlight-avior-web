var Memory = Backbone.Model.extend({
	urlRoot: '/wm/core/memory/json' 
}); 

var MemoryCollection = Backbone.Collection.extend({
	model: Memory,  
});

var MemoryView = Backbone.View.extend({	
	el: $('body'), 
    
    events: {
      'click button#mem': 'getMemory'
    },
    
	initialize: function(){
    	//_.bindAll(this, 'render', 'getMemory', 'appendList'); 
		this.collection = new MemoryCollection();
		this.collection.bind('add', this.appendList);  
    	this.render(); 
	},
    
	render: function(){
		$(this.el).append("<button id='mem'>Controller Memory</button>");
    	$(this.el).append("<ul></ul>");
	},
	
	getMemory: function() {
		var memory = new Memory();
		var self = this;
		var finalBlue;
    	
    	var blue = memory.fetch().complete(function () {
    		self.collection.add(blue);
    	});
	},
	
	appendList: function(fin) {
		$('ul', this.el).append("<li>"+ JSON.stringify(fin) +"</li>");
	}
});
  
var memoryView = new MemoryView();