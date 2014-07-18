define([
	'jquery',
	'backbone',
	'underscore',
], function($,Backbone,_) {
	var WineListPaginatorView = Backbone.View.extend({
		render: function(currentPage) {
			if (window.Winestore.wineCollection){
				var wines = window.Winestore.wineCollection.models;
				var len = wines.length;
				var pages = Math.ceil( len / window.Winestore.perPage );
				var template = _.template($('#pagination-template').html(),{
					pages	: pages,
					currentPage: currentPage
				});
				this.$el.append(template);
			}
			return this;
		},
	});
	return WineListPaginatorView;
});