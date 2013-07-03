define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* Structure to hold switch information */
	var Description = Backbone.Model.extend({
		defaults: {
			software: '',
    		hardware: '',
    		manufacturer: '',
    		serialNum: '',
    		datapath: ''
		},
	});
	return Description;
});