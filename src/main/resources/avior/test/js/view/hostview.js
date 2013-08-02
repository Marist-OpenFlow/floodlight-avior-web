define([
	"jquery",
	"underscore",
	"backbone",
	"floodlight/hostCollectionFl",
	"text!template/hostTable.html",
	"text!template/hostEntry.html"
], function($, _, Backbone, HostCollection, hostTableTpl, hostEntryTpl){
	var HostView = Backbone.View.extend({
	    tagName: "div",
	    
		template: _.template(hostTableTpl),
		template2: _.template(hostEntryTpl),
		
		initialize: function(){
			var self = this;
			this.collection = new HostCollection();
			this.collection.fetch();
			this.collapsed = true;
			// Update the collection when changes occur
			this.listenTo(this.collection, "sync", this.render);
			$('#displayhosts').click(function() {self.clickable();});
		},
		
		// Render the collection
	    render: function() {
			// May not be necessary
			this.$el.html(this.template(this.collection.toJSON()));
			_.forEach(this.collection.models, function(host) {
				$('#hostEntries').append(self.template2(host.toJSON()));
			}, this);
			
			return this;
	    },
		refresh: function(){this.collection.fetch();},
		
		//only call fetch when the view is visible
		clickable: function() {
			if (this.collapsed){
				this.collapsed = false;
				var self = this;
				this.interval = setInterval(function(){self.collection.fetch()}, 2000);
			}
			else{
				this.collapsed = true;
				clearInterval(this.interval);
			}
		},
	});
	return HostView;
});

