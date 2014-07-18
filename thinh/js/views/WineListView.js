define([
	'jquery',
	'backbone',
	'underscore',
], function($,Backbone,_) {
	var WinesView = Backbone.View.extend({
		el: $('#content'),
		render: function(page) {
			if (window.Winestore.wineCollection){
				var wines = window.Winestore.wineCollection.models;
				var len = wines.length;
				var startPos = (page - 1) * window.Winestore.perPage;
				var endPos = Math.min(startPos + window.Winestore.perPage, len);
				var template = _.template($('#wines-template').html(),{
					wines	: wines,
					start	: startPos,
					end		: endPos
				});
				this.$el.html(template);
			}
			return this;
		},
	});
	console.log(WinesView);
	return WinesView;
});