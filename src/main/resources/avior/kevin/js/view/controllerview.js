define([
	"jquery",
	"underscore",
	"backbone",
	"model/controller/controllermodel",
	"model/controller/memorymodel",
	"model/controller/modulesmodel",
	"model/controller/statusmodel",
	"model/controller/uptimemodel",
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
			
			this.listenTo(newcontroller, "sync", this.render());
			
			
			_.forEach(newcontroller.models, function(item){
				item.fetch();
			}, this);
			
			console.log('web initialization successful');
		},
		
	    render: function() {
			this.$el.html(this.template1(this.model.toJSON()));
			this.$el.append(this.template1);
			
			var self = this;
			return this;
	    },
	    
	    
		refresh: function(evt){console.log(evt.currentTarget.id); this.model.fetch();}
	});
	return ControllerView;
});
