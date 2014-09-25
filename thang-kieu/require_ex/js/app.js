require.config({
	// base url: 'module' --> js/module.js
	// by default, modules will be loaded from js directory
	baseUrl: 'js/lib',
	paths: {
		// if the module IDs start with app
		// it will be loaded in js/app directory
		// because it relative with baseUrl, so we will config
		// this directory like this
		app: '../app'
	}
});

// main
require(['app/AppView'],
	function (AppView) {
		var app = new AppView();

		app.init();
});