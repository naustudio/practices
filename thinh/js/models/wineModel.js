define([
	'backbone'
],  function(Backbone) {
	var WineModel = Backbone.Model.extend({

		//urlRoot: '/json/wines.json',

		idAttribute: '_id',

		defaults: {
			_id: null,
			name: '',
			grapes: '',
			country: '',
			region: '',
			year: '',
			description: '',
			picture: null
		}
	});
	return WineModel;
});
