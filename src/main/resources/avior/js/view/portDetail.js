define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/port.html"
], function($, _, Backbone, portTpl){
	var PortView = Backbone.View.extend({
		//tagName: "tbody",
		
		template: _.template(portTpl),
		
		//render the switch model using the template
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}		
	});
	return PortView;
});