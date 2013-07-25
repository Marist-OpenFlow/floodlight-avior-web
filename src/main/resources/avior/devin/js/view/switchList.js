define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"text!template/switchSumTemplate.html",
	"text!template/switchLayout.html"
], function($, _, Backbone, Marionette, Features, SwitchStats, swtchSumTpl){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		tagName: "dt",
		template: _.template(swtchSumTpl),
		
		onBeforeRender: function(){
    		//var features = new Features();
    		//var switchStats = new SwitchStats();
  		},	
	});
	return SwitchSumView;
});