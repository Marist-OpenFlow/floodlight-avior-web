define([
        "backbone",
        "util",
        "model/switch"
], function(Backbone,Util,Switch){
        /* Structure to hold switch models */
        var SwitchCollection = Backbone.Collection.extend({
                url: Util.missingCtlrErr,
                model: Switch,
                comparator: function(switch){
                        return switch.get("dpid");
                },
        });
        return SwitchCollection;
});

