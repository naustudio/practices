define([ 'jquery','underscore','backbone','views/list','views/detail'], function($, _, Backbone, WineListView, WineDetailView) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			'': 'home',
			'wines'		: 'list',
			'wines/add'		: 'home',
			'wines/:id'		: 'detail'
		},
		home: function() {
			$('#content').html('Loading....');
		},
		detail: function(id) {
			var wineDetail = new WineDetailView();
			wineDetail.render(id);
		},
		list: function() {
			var wineListView = new WineListView();
			wineListView.render();
		},
		initialize: function () {
			//alert('router initialize');
		}

	});

	var initialize = function() {
		window.app = new AppRouter();
		Backbone.history.start({
			root: '/'
		});
	};
	return {
		initialize: initialize
	};
});