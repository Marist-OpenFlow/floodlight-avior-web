define(["./ofp10","jquery","lodash","backbone","text!../tpl/controller.html"],
	function(OFP, $, _, Backbone, ctrlTpl){
		var missingCtlrErr = function () {
			var msg = "Avior: Error: Controller module missing.";
			console.log(msg);
			window.alert(msg);
		}

		var Avior = {};
		/* Structure to hold port information */
		Avior.Port = Backbone.Model.extend({
			initialize: function(obj){
				if (obj) { this.parse(obj); }
				else this.set(new OFP.Port);
			},

			parse: missingCtlrErr,
			toJSON: missingCtlrErr,
		});

		Avior.PortCollection = Backbone.Collection.extend({
			model: Avior.Port,
			parse: function(resp) { this.add(resp); },
			toJSON: function() { return this.models; }
		});

		/* Structure to hold switch information */
		Avior.Switch = Backbone.Model.extend({
			initialize: function(obj){
				if (obj) { this.parse(obj); }
				else this.set(new OFP.SwitchFeatures);
			},

			parse: missingCtlrErr,
			toJSON: missingCtlrErr,
		});

		Avior.SwitchCollection = Backbone.Collection.extend({
			url: missingCtlrErr,
			model: Avior.Switch,
			//parse: function(resp,options) { this.add(resp); },
			toJSON: function() { return this.models; }
		});

		Avior.SwitchSummary = Backbone.View.extend({
			tagName: "li",
			initialize: function(){
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			}
		});

		Avior.SwitchList = Backbone.View.extend({
			tagName: "ul",
			initialize: function(){
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render: function(){
				_.each(this.models, function(mod){
					this.$("#output").append(mod.render().el);
				});
			}
		});

		/* Structure to hold controller metadata */
		Avior.Memory = Backbone.Model.extend({
			url: missingCtlrErr,
			defaults: {
				total: 0,
				free: 0
			},
		});

		Avior.MemoryView = Backbone.View.extend({
			//... is a div tag.
		    tagName:  "div",
		    // Cache the template function for a single item.
			//template: _.template($('#controller-template').html()),
			template: _.template(ctrlTpl),
			initialize: function(){
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			events: {
				"click button": "refresh",
			},
			// Re-render the titles of the todo item.
		    render: function() {
				this.$el.html(this.template(this.model.toJSON()));
				return this;
		    },
			refresh: function(){this.model.fetch();}
		});

		Avior.AppView = Backbone.View.extend({
			el: $('#output'),
			render: function(){
		      if (Switches.length) {
		        this.show();
		      } else {
		        this.hide();
		      }
		    }
		});

		return Avior;
	}
);

