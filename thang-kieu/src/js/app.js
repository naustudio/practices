(function($) {
	$(document).ready(function() {

		/**
		 * Append into content wrapper
		 */
		function appendHTML(html, wrapper) {
			$('.' + wrapper).append(html);
		}

		/**
		 * Get html of products
		 */
		function getProductsHTML (begin, end, data) {
			var productsHTML = [];

			while (begin !== end) {
				productsHTML[begin] = new EJS({
					url: 'src/templates/product.ejs'
				}).render(data[begin]);

				begin++;
			}

			return productsHTML;
		}
		/**
		 * Get page number
		 */
		function getPageNo (url) {
			var splitUrl = url.split('page/');
			var pageNo = splitUrl[1];

			return pageNo;
		}
		/**
		 * Load data into HTML
		 */
		function render(begin, end, data, wrapper) {
			var products = getProductsHTML(begin, end, data);
			var html = products.join('');

			appendHTML(html, wrapper);
		}
		/**
		 * Get object by id
		 */
		function getObjectByValue(array, id) {
			var result = array.filter(function(val) {
				return val._id === id;
			});
			return result;
		}

		/**
		 * Clear wrapper content
		 */
		function clearWrapperContent(wrapper) {
			$('.' + wrapper).html('');
		}
		/**
		 * Update
		 */
		function update(url, data) {
			// $.post({
			// 	url: url,
			// 	data: data,
			// 	success: success,
			// 	dataType: {}
			// });
			$.ajax({
				url: url,
				type: 'POST',
				crossDomain: true,
				dataType: 'json',
				data: data,
				success: function(data) {
					console.log(data);
				},
				error: function(jqXHR) {
					console.log('ajax error ' + jqXHR.status);
				},
				headers: {
					'Content-Type': 'application/json',
					'X-HTTP-Method-Override': 'POST'
				}
			});
			// $.ajax({
			// 	url: url,
			// 	type: 'POST',
			// 	contentType: 'application/json',
			// 	accepts: 'application/json',
			// 	cache: false,
			// 	dataType: 'json',
			// 	data: JSON.stringify(data),
			// 	success: function(data) {
			// 		console.log(data);
			// 	},
			// 	error: function(jqXHR) {
			// 		console.log('ajax error ' + jqXHR.status);
			// 	}
			// });
		}

		/**
		 * get database
		 * @return {[type]} [description]
		 */
		var database = {};
		// var products = [];
		var pageHtml = '';
		var qtyEachPage = 8;
		var beginPro = 0;
		var endPro = 0;
		var url = location.href;
		var currentPage = parseInt(getPageNo(url));

		$.getJSON('http://192.168.0.199:3000/wines').done(function(data) {
			database = data;
			// get total of pages
			var pages = database.length / qtyEachPage + 1;
			for (var i = 1; i < pages; i++) {
				pageHtml += '<a href=#!/page/' + i + ' class="page page-' + i + '" data-page="' + i + '">' + i + '</a>';
			}

			if (currentPage) {
				beginPro = qtyEachPage * (currentPage - 1);
				endPro = beginPro + qtyEachPage;

			} else {
				beginPro = 0;
				endPro = beginPro + qtyEachPage;
			}
			// if endPro greater than length of product number
			if (endPro >= database.length) {
				endPro = database.length - 1;
			}
			// get array of product's html
			render(beginPro, endPro, database, 'product-content-wrapper');
			appendHTML(pageHtml, 'pagination');


		}).fail(function() {
			console.log('Fail to load database');

		});


		/**
		 * Pagination
		 */
		$('.content-wrapper').on('click', '.page', function() {
			var currentPage = $(this).attr('data-page');
			var beginPro = 0;
			var endPro = beginPro + qtyEachPage;

			if (currentPage) {
				beginPro = qtyEachPage * (currentPage - 1);
				endPro = beginPro + qtyEachPage;

			} else {
				beginPro = 0;
				endPro = beginPro + qtyEachPage;
			}
			// if endPro greater than length of product number
			if (endPro >= database.length) {
				endPro = database.length - 1;
			}
			// destroy exist element
			$('.product-content-wrapper').empty();
			// get array of product's html
			render(beginPro, endPro, database, 'product-content-wrapper');
		});

		/**
		 * View detail
		 */
		$('.content-wrapper').on('click', '.product-more-detail', function() {
			// e.preventDefault();
			var id = $(this).attr('data-id');
			// parse id to Int
			id = parseInt(id);

			var product = getObjectByValue(database, id);
			console.log(product);

			// show detail
			var productDetailHTML = new EJS({
				url: 'src/templates/detail.ejs'})
				.render(product[0]);

			// clear product list
			clearWrapperContent('content-inner');
			// append product detail
			appendHTML(productDetailHTML, 'content-inner');

		});

		/**
		 * Update
		 */
		$('.content-wrapper').on('click', '.save', function() {
			var data = {
				'name': 'LAN RIOJA CRIANZA',
				'year': '2006',
				'grapes': 'Tempranillo',
				'country': 'Spain',
				'region': 'Rioja',
				'description': 'A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.',
				'picture': 'lan_rioja.jpg',
				'_id': '506df6b6849a990200000002'
			};
			update('http://192.168.0.199:3000/wines/7', data);
		});
	});
})(jQuery);