 define([
	"backbone",
	"underscore",
	"util",
	"collection/flowCollection",
], function(Backbone,_,Util,FlowCollection){
		FlowCollection.prototype.url = function() {return "/wm/core/switch/" + this.dpid + "/flow/json";};
		FlowCollection.prototype.initialize = function(dpid) { 
			this.dpid = dpid; 
		};
		
		FlowCollection.prototype.parse = function(response){
		    var innerArray = response[this.dpid];
   			return innerArray;
		}; 
	return FlowCollection;
});

/*
initialize: function() {
			this.model.actionText = _.reduce(this.model.actions, function (memo, a) {
                        switch (a.type) {
                            case "OUTPUT":
                                return memo + "output " + a.port + ', ';
                            case "OPAQUE_ENQUEUE":
                                return memo + "enqueue " + a.port + ':' + a.queueId +  ', ';
                            case "STRIP_VLAN":
                                return memo + "strip VLAN, ";
                            case "SET_VLAN_ID":
                                return memo + "VLAN=" + a.virtualLanIdentifier + ', ';
                            case "SET_VLAN_PCP":
                                return memo + "prio=" + a.virtualLanPriorityCodePoint + ', ';
                            case "SET_DL_SRC":
                                return memo + "src=" + a.dataLayerAddress + ', ';
                            case "SET_DL_DST":
                                return memo + "dest=" + a.dataLayerAddress + ', ';
                            case "SET_NW_TOS":
                                return memo + "TOS=" + a.networkTypeOfService + ', ';
                            case "SET_NW_SRC":
                                return memo + "src=" + a.networkAddress + ', ';
                            case "SET_NW_DST":
                                return memo + "dest=" + a.networkAddress + ', ';
                            case "SET_TP_SRC":
                                return memo + "src port=" + a.transportPort + ', ';
                            case "SET_TP_DST":
                                return memo + "dest port=" + a.transportPort + ', ';
                         }
                    }, "");
                    // remove trailing ", "
                 	this.model.actionText = this.model.actionText.substr(0, f.actionText.length - 2);
		} */