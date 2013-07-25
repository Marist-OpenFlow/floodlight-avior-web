 define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/switchDetail",
	"text!template/switchLayout.html",
], function($, _, Backbone, Marionette, SwitchDetail, layoutTpl){
	var SwitchLayout = Backbone.Marionette.Layout.extend({
  		el: $('body'),
  		template: _.template(layoutTpl),

		events: {"click a.dpidLink": "clickSwitch"},

  		regions: {
    		switchList: "#switchList",
    		switchDesc: "#switchDesc",
    		portStats: "#portStats",
    		flowList: "#flowList",
    		flowMod: "#flowMod",
  		},
  		
  		initialize: function() {
  			this.render();
  			this.swt = new SwitchDetail();
  			this.switchList.show(this.swt);
  		},
  		
  		clickSwitch: function() {
  			//alert("LLLL");
  			//alert(JSON.stringify(this.swt.collection.models));
  		},
	});
	return SwitchLayout;
});