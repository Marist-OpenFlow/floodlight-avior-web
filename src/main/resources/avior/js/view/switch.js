define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switch.html"
], function($, _, Backbone, swtchTpl){
	var SwitchView = Backbone.View.extend({
		//tagName: "tbody",
		
		template: _.template(swtchTpl),
		
		//render the switch model using the template
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}		
	});
	return SwitchView;
});