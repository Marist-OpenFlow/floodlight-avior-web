define([
	"backbone",
	"util",
	"openflow"
], function(Backbone,Util){
	
	/* To handle nested JSON statements */
	var MatchModel = Backbone.Model.extend({
		defaults:{
			inputPort:''
		}
	});
	
	var ActionsModel = Backbone.Model.extend({
		defaults:{
			type:'',
			port:''
		}
	});
	
	/* Structure to hold flow information */
	var Flow = Backbone.Model.extend({
	
		model: {
			match: MatchModel,
			actions: ActionsModel,
		},
		
		parse: function(response){
			for(var key in this.model)
			{
				var embeddedClass = this.model[key];
				var embeddedData = response[key];
				response[key] = new embeddedClass(embeddedData, {parse:true});
			}
			return response
		}
	});
	
	return Flow;
});