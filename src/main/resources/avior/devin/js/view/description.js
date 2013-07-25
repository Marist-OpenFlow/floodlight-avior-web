define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"model/description",
	"text!template/description.html",
], function($, _, Backbone, Marionette, Description, description){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		tagName: "dt",
		template: _.template(description),
		model: Description,
  	});
	return SwitchSumView;
});