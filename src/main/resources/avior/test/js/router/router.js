define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/switch",
	"view/switchDetail",
], function($, _, Backbone, Marionette, Switch, SwitchDetail){
	var Router = Marionette.AppRouter.extend({
		routes: {
			"controllers": "switchRoute",
		},	
		
		switchRoute: function() {
			//console.log("router routing routers");
			var switchDetail = new SwitchDetail({model: new Switch});
			switchDetail.delegateEvents(switchDetail.events);
		},
	});
	return Router;
}); 