define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/portList",
	"text!template/ports.html"
], function($, _, Backbone, Marionette, PortList, portsTpl){
	var PortView = Backbone.Marionette.CompositeView.extend({
		itemView: PortList,
		itemViewContainer: "tbody",
		template: _.template(portsTpl),
	});
	return PortView;
});