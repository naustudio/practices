define([
	'jquery',
	'backbone',
	'underscore',
], function( $, Backbone, _ ) {
	var WineView = Backbone.View.extend({
		el: $('#content'),
		render: function(id) {
			if (window.Winestore.wineCollection){
				var wine = window.Winestore.wineCollection.get(id);
				var template = _.template($('#wine-template').html(),{wine: wine});
				this.$el.html(template);
			}
			return this;
		},
	});
	return WineView;
});