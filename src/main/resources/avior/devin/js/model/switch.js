define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
		defaults: {inetAddress: '', dpid: ''},
		parse: function (resp) {
        		return {
            		ports: resp.ports,
            		description: resp.description,
            		inetAddress: resp.inetAddress,
            		connectedSince: resp.connectedSince,
            		dpid: resp.dpid
        		}
    	}
	});
	return Switch;
});

