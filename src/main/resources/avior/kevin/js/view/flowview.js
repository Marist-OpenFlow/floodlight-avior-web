define([
	"jquery",
	"underscore",
	"backbone",
	"text!template/switch.html"
], function($, _, Backbone, swtchTpl){
	var SwitchView = Backbone.View.extend({
		tagName: "tbody",
		
		template: _.template(flowTpl),
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}		
	});
	return FlowView;
});