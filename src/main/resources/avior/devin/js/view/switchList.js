define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/featuresFl",
	"floodlight/switchStatisticsFl",
	"text!template/switchSumTemplate.html"
], function($, _, Backbone, Marionette, Features, SwitchStats, swtchSumTpl){
	var SwitchSumView = Backbone.Marionette.ItemView.extend({
		tagName: "dt",
		template: _.template(swtchSumTpl),
		
		initialize: function(options){
    		//console.log(JSON.stringify(options.features));
    		//console.log(JSON.stringify(options.stats)); 
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