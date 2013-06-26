define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
		defaults:{
		inetAddress:'',
		dpid:'',
		connectedSince:'',
		name:'',
		portNumber:'',
		manufacturer:'',
		hardware:''
		}
	});
	return Switch;
});

