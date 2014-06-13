(function() {
	$(document).ready(function() {

		/**
		 * get database
		 * @return {[type]} [description]
		 */
		function getData() {
			var db = {};
			$.getJSON('../data/database.json').done(function(data) {
				db = data;
				console.log('Success');
				return db;
			}).fail(function() {
				console.log('Fail to load database');
				return db;
			});
		}

		var data = getData();

		var product = new EJS({
			url: '../templates/product.ejs'
		}).render(data[0]);

		console.debug(product);

	});
})();