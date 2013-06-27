define([
	"jquery",
	"underscore",
	"backbone",
	"view/switch",
	"collection/switchcollection",
	"text!template/switchHeading.html"
], function($, _, Backbone, SwitchView, SwitchCollection, header){
	var SwitchHeading = Backbone.View.extend({
		el: $("#body"),

		template: _.template(header),
			
		initialize: function(item){
			this.collection = item;
		},
		
		events: {
			"click button": "refresh",
		},
		
		render: function() {		
			this.$el.html(this.template(this.model.toJSON()));
			
			return this;
		},
		
		refresh: function(){this.collection.fetch();}
	});
	return SwitchHeading;
});