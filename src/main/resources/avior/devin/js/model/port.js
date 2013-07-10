define([
	"backbone",
	"util",
	"model/portStatistics",
], function(Backbone, Util, PortStatistics){
	
	/* Structure to hold port information */
	var Port = Backbone.Model.extend({
		defaults: {
			portNumber: '',
    		name: '',
    		receivePackets: '',
    		transmitPackets: '',
    		receiveBytes: '',
    		transmitBytes: '',
    		dropped: '',
    		errors: ''
		},
		
		initialize: function(dpid) {
			this.getStats(dpid);
		},
		
		getStats: function(dpid) {
			var stats = new PortStatistics(dpid);
			stats.fetch().complete(function () {
				console.log("in fetch");
    	  		/*this.set({portNumber: portNumber, 
    	  				  receivePackets: receivePackets, 
    	  				  transmitPackets: transmitPackets, 
    	  				  receiveBytes:receiveBytes,
    	  				  transmitBytes: transmitBytes,
    	  				  dropped: receiveDropped + transmitDropped,
    	  				  errors: receiveErrors + transmitErrors + receiveFrameErrors + receiveOverrunErrors + receiveCRCErrors
    	  				 });*/
    	 	});
		}
	});
	return Port;
});