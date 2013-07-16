define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/controllers",
	"floodlight/controller/memory",
	"floodlight/controller/modules",
	"floodlight/controller/status",
	"floodlight/controller/uptime",
	"text!/avior/kevin/tpl/controller.html",
], function($, _, Backbone, Controller, Memory, Modules, Status, Uptime, controllerTpl){
	var ControllerView = Backbone.View.extend({
		el: $('body'),
	    
	    template1: _.template(controllerTpl),
		
		events: {
			"click button": "refresh",
		},
		
		initialize: function() {
			var newcontroller = new Controller;
			newcontroller.set({memory: new Memory, modules: new Modules, status: new Status, uptime: new Uptime});
			console.log(newcontroller);
			console.log(JSON.stringify(newcontroller));
			
			this.listenTo(newcontroller, "sync", this.render(newcontroller));
			
			var m = new Memory;
			console.log(m.fetch());
			
			_.forEach(newcontroller, function(item){
				console.log(JSON.stringify(item));
				item.fetch();
				console.log("yo");
			}, this);
			
			console.log(newcontroller);
			
			console.log('web initialization successful');
		},
		
	    render: function(newcontroller) {
			this.$el.html(this.template1(newcontroller.toJSON()));
			
			
			var self = this;
			return this;
	    },
	    
	    
		refresh: function(evt){console.log(evt.currentTarget.id); this.model.fetch();}
	});
	return ControllerView;
});
