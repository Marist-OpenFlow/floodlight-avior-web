define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"text!template/switchSumTemplate.html",
	"text!template/switchSummary.html"
], function($, _, Backbone, Marionette, Features, SwitchStats, swtchSumTpl, header){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		tagName: "dt",
		template1: _.template(header),
		template: _.template(swtchSumTpl),
		
		initialize: function(options){
			$('body').html(this.template1(this.model.toJSON()));
  		},
		
		onBeforeRender: function(){
    		//console.log(JSON.stringify(this.model));
    		var features = new Features();
    		var switchStats = new SwitchStats();
  		}
		
		
		
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