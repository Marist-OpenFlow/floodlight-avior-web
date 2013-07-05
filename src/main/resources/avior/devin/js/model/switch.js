define([
	"backbone",
	"util",
	"model/portModel"
], function(Backbone, Util, Port){
	
	/* Structure to hold switch information */
	var Switch = Backbone.Model.extend({
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
        	var i = 0;
        	var a = new Array();
        	_.forEach(resp, function(item) {
        		a[i] = new Port({portNumber: item.portNumber, name: item.name});
        		i += 1;
        	}, this);
        	this.ports = a;
        	console.log(JSON.stringify(this.ports));
    	}
	});
	return Switch;
});

