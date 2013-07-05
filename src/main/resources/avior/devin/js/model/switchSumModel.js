define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var SwitchSumModel = Backbone.Model.extend({
		defaults:{
		dpid:'',
		inetAddress:'',
		}
	});
	return SwitchSumModel;
});

