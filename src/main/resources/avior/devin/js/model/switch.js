define([
	"backbone",
	"util",
	"openflow",
	"model/portModel",
	"model/descriptionModel"
], function(Backbone, Util, Port, Description){
	
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
		model1: Port,
		model2: Description,
		
		parse: function (resp) {
        		return {
            		ports: this.getPortArray(resp.ports),
            		description: resp.description,
            		inetAddress: resp.inetAddress,
            		connectedSince: resp.connectedSince,
            		dpid: resp.dpid
        		}
        },
        
        getPortArray: function(resp) {
        	alert(resp);
    	}
	});
	return Switch;
});

