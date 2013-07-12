define([
	"jquery",
	"underscore",
	"backbone",
	"model/controller/controllermodel",
	"model/controller/memory",
	"model/controller/modules",
	"model/controller/status",
	"model/controller/uptime",
	"text!tpl/controller.html",
], function($, _, Backbone, Controller, Memory, Modules, Status, Uptime, controllerTpl){
	var ControllerView = Backbone.View.extend({
		el: $('body'),
	    
	    template1: _.template(controllerTpl),
		
		events: {
			"click button": "refresh",
		},
		
	    render: function() {
			this.$el.html(this.template1(this.model.toJSON()));
			this.$el.append(this.template);
			
			var self = this;
			
			var controller = new Controller;
			controller.set({memory: new Memory, modules: new Modules, status: new Status, uptime: new Uptime});
			
			
			return this;
	    },
	    
	    
		refresh: function(evt){console.log(evt.currentTarget.id); this.model.fetch();}
	});
	return ControllerView;
});
