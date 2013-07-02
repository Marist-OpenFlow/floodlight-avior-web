define([
	"backbone",
	"util",
	"openflow",
	"model/portModel",
	"model/descriptionModel"
], function(Backbone,Util, Port, Description){
	
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
		parse: function (resp) {
        		return {
            		ports: resp.ports[0],
            		description: resp.description,
            		inetAddress: resp.inetAddress,
            		connectedSince: resp.connectedSince,
            		dpid: resp.dpid
        		}
    	}
	});
	return Switch;
});

