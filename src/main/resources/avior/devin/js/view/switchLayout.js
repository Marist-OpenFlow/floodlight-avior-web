 define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/switchDetail",
	"view/description",
	"model/description",
	"text!template/switchLayout.html",
], function($, _, Backbone, Marionette, SwitchDetail, Description, DescriptionModel, layoutTpl){
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
  			var currentID = e.currentTarget.id;
  			var desc = this.swt.collection.get(currentID).get("description");

  			var descModel = new DescriptionModel(desc);
  			descModel.set("dpid", currentID);
  			descModel.set("connectedSince", this.swt.collection.get(currentID).get("connectedSince"));
  			var descView = new Description({model: descModel});
			
  			this.switchDesc.show(descView);
  			
  			
  		},
	});
	return SwitchLayout;
});