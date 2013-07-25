define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/switch",
	"view/switchLayout"
], function($, _, Backbone, Switch, SwitchLayout){
	return {
		Switch: Switch,
		SwitchLayout: SwitchLayout,
		initialize: function(){
			$(document).ready(function(){
				//var switchDetail = new SwitchDetail({model: new Switch});
				//switchDetail.delegateEvents(switchDetail.events);
				
				var layout = new SwitchLayout();
			});
		}
	};
});


