define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"floodlight/switch",
	"view/switchDetail",
	"router/router",
], function($, _, Backbone, Marionette, Switch, SwitchDetail, Router){
	return {
		Switch: Switch,
		SwitchDetail: SwitchDetail,
		Router: Router,
		initialize: function(){
			$(document).ready(function(){
				var switchDetail = new SwitchDetail({model: new Switch});
				switchDetail.delegateEvents(switchDetail.events);
				var router = new Router();
				Backbone.history.start();
			});
		}
	};
});


