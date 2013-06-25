define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switch.html"
], function($, _, Backbone, swtchTpl){
	var SwitchView = Backbone.View.extend({
		tagName: "div",
		
		template: _.template(swtchTpl),

		initialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return SwitchView;
});