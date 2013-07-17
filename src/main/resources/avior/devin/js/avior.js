define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switch",
	"view/switchDetail"
], function($, _, Backbone, Switch, SwitchDetail){
	return {
		Switch: Switch,
		SwitchDetail: SwitchDetail,
		initialize: function(){
			$(document).ready(function(){
				var switchDetail = new SwitchDetail({model: new Switch});
				//$(document.body).append(switchDetail.render().el);
				switchDetail.delegateEvents(switchDetail.events);
			});
		}
	};
});

