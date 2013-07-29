define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switch",
	"view/switchDetail",
	"router/router",
], function($, _, Backbone, Switch, SwitchDetail, Router){
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


