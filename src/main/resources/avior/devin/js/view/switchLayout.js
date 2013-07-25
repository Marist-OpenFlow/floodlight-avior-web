 define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/switchDetail",
	"view/description",
	"text!template/switchLayout.html",
], function($, _, Backbone, Marionette, SwitchDetail, Description, layoutTpl){
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
  		
  		clickSwitch: function(e) {
  			//alert(JSON.stringify(e.currentTarget.id));
  			//alert(JSON.stringify(this.swt.collection.models));
  			var currentID = e.currentTarget.id;
  			var desc = this.swt.collection.get(currentID).get("description");
  			desc.dpid = currentID;
  			//desc.connectedSince = 
  			console.log(JSON.stringify(desc));
  			this.switchDesc.show(new Description(desc));
  		},
	});
	return SwitchLayout;
});