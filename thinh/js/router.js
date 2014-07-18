define([ 'jquery','underscore','backbone','views/WineListView','views/WineListItemView','views/WineListPaginatorView'],
	function($, _, Backbone, WineListView, WineDetailView,WineListPaginatorView) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			''					: 'home',
			'wines'				: 'list',
			'wines/page/:page'	: 'list',
			'wines/add'			: 'home',
			'wines/:id'			: 'detail'
		},
		home: function() {
			$('#content').html('Loading....');
		},
		detail: function(id) {
			var wineDetail = new WineDetailView();
			wineDetail.render(id);
		},
		list: function(page) {
			var p = page ? parseInt(page, 10) : 1;
			var wineListView = new WineListView();
			console.log(wineListView);
			wineListView.render(p);
			$('.thumbnails').after((new WineListPaginatorView).render(p).el);
			//console.log((new WineListPaginatorView).render().el);
		},
		initialize: function () {
			//alert('router initialize');
		}

	});

	var initialize = function() {
		window.Winestore.appRouter = new AppRouter();
		Backbone.history.start({
			root: '/'
		});
	};
	return {
		initialize: initialize
	};
});