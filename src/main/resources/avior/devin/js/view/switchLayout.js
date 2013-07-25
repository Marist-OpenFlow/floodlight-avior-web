 define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"view/switchDetail",
	"view/description",
	"view/portDetail",
	"collection/portCollection",
	"model/port",
	"model/description",
	"text!template/switchLayout.html",
], function($, _, Backbone, Marionette, SwitchDetail, DescriptionView, PortDetail, PortCollection, Port, DescriptionModel, layoutTpl){
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
  			var descView = new DescriptionView({model: descModel});
  			this.switchDesc.show(descView);
  			
  			var ports = this.swt.collection.get(currentID).get("ports");
  			var portCollection = new PortCollection;
  			for (var p in ports){
  				console.log(JSON.stringify(ports[p]));
  				var portModel = new Port(ports[p]);
  				portCollection.add(portModel);
  			}
  			var portView = new PortDetail({collection: portCollection});
  			this.portStats.show(portView);
  			//console.log(JSON.stringify(portCollection.models));
  		},
	});
	return SwitchLayout;
});