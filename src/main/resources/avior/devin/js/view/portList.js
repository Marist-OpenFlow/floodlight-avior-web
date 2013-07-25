define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/port.html",
], function($, _, Backbone, Marionette, portTpl){
	var PortList = Backbone.Marionette.ItemView.extend({
		tagName: "tr",
		template: _.template(portTpl),
	});
	return PortList;
});