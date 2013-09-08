define([
        "backbone",
        "util",
        "model/switch"
], function(Backbone,Util,Switch){
        /* Structure to hold switch models */
        var SwitchCollection = Backbone.Collection.extend({
                url: Util.missingCtlrErr,
                model: Switch
        });
        return SwitchCollection;
});

