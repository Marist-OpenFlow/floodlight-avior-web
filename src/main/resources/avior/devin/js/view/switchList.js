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