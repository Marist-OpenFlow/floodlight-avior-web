define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var Port = Backbone.Model.extend({
		defaults: {
			portNumber: '',
    		name: ''
		}
	});
	return Port;
});