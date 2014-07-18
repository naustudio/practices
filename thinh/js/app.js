// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		bootstrap: 'lib/bootstrap.min',
		backbone: 'lib/backbone'
	},
	shim: {
		'bootstrap': ['jquery'] // Load jquery before load bootstrap
	}
});

// Start loading the main app file.
requirejs(['app/main','jquery','bootstrap','underscore','backbone'], function (App, $, Bootstrap, _, Backbone){
	window.Winestore = {
		initRouter: App.initialize,
		perPage : 8,
	};
	window.Winestore.initRouter();
});