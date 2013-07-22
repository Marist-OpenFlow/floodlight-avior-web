define([
	"jquery",
	"underscore",
	"backbone",
	"view/switchsummary",
	"collection/switch",
	"text!template/switches.html",
], function($, _, Backbone, SwitchView, SwitchCollection, swtchsTpl){
	var SwitchesView = Backbone.CollectionView.extend({
		//... is a div tag.
		el:  $("<table>"),
		// Cache the template function for a single item.
		modelView: SwitchView,
		collection: null,
		refresh: function(){this.collection.fetch();}
	});
	return SwitchesView;
});
