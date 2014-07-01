define([
	'backbone',
	'models/wineModel'
],	function(Backbone,Wine) {

	var WineCollection = Backbone.Collection.extend({
		model: Wine,
		//url: 'http://nodecellar.coenraets.org/wines'
		url:  '/json/wines.json'
	});

	return WineCollection;
});