define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var Port = Backbone.Model.extend({
		defaults: {
			portNumber: '',
    		hardwareAddress: '',
    		name: '',
    		config: '',
    		state: '',
    		currentFeatures: '',
    		advertisedFeatures: '',
    		supportedFeatures: '',
    		peerFeatures: ''
		},
	});
	return Port;
});