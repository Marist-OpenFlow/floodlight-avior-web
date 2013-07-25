 define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"text!template/switchSummary.html",
], function($, _, Backbone, Marionette, layoutTpl){
	var SwitchLayout = Backbone.Marionette.Layout.extend({
  		template: "#layout-template",

  		regions: {
    		switchList: "#switchList",
    		switchDesc: "#switchDesc",
    		portStats: "#portStats",
    		flowList: "#flowList",
    		flowMod: "#flowMod",
  		}
	});
	return SwitchLayout;
});