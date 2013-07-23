define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/switchSumTemplate.html"
], function($, _, Backbone, Marionette, swtchSumTpl){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		//tagName: "dt",
		template: _.template(swtchSumTpl)
		
		
		
		//pre-marionette stuff
		/*tagName: "tbody",
		
		template: _.template(swtchSumTpl),
		
		//render the switch model using the template
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}*/
				
	});
	return SwitchSumView;
});