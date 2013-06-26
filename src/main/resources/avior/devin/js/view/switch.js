define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switch.html"
], function($, _, Backbone, swtchTpl){
	var SwitchView = Backbone.View.extend({
		tagName: "div",
		
		template: _.template(swtchTpl),
		
		//may need the var tmpl to complete this
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}		
	});
	return SwitchView;
});