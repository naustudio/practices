define([
	'jquery',
	'backbone',
	'underscore',
	'collections/wineCollections',
	'models/wineModel'
], function($,Backbone,_,Wines,Wine) {
	var WinesView = Backbone.View.extend({
		el: $('#content'),
		render: function(eventName) {
			console.log(this);
			var self = this;
			var wines = new Wines().fetch({
				success: function(data) {
					var template = _.template($('#wines-template').html(),{wines: data.models});
					self.$el.html(template);
				}
			});
			return this;
		},
	});
	return WinesView;
});