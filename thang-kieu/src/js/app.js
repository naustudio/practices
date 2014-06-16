(function($) {
	$(document).ready(function() {

		/**
		 * Append into content wrapper
		 */
		function appendHTML(html, wrapper) {
			$(wrapper).append(html);
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
		function getObjectByValue(array,id) {
			var result = array.filter(function(val) {
				return val._id === id;
			});
			return result;
		}
		/**
		 * get database
		 * @return {[type]} [description]
		 */
		var database = {};
		var products 	= [];
		var pageHtml	= '';
		var qtyEachPage = 8;
		var beginPro 	= 0;
		var url = location.href;
		var currentPage = parseInt(getPageNo(url));

		$.getJSON('src/data/database.json').done(function(data) {
			database = data;
			// get total of pages
			var pages = data.database.length / qtyEachPage + 1;
			for (var i = 1; i< pages; i++) {
				pageHtml += '<a href=#!/page/'+ i +' class="page page-'+ i +'" data-page="'+ i +'">'+ i +'</a>';
			}

			if(currentPage) {
				beginPro 	= qtyEachPage * (currentPage - 1);
				endPro 		= beginPro + qtyEachPage;

			} else {
				beginPro = 0;
				endPro	 = beginPro + qtyEachPage;
			}
			// if endPro greater than length of product number
			if (endPro >= data.database.length) {
				endPro = data.database.length - 1;
			}
			// get array of product's html
			render(beginPro, endPro, data.database, '.content-inner');
			appendHTML(pageHtml, '.pagination');


		}).fail(function() {
			console.log('Fail to load database');

		});


		/**
		 * Pagination
		 */
		$('.content-wrapper').on('click', '.page', function() {
			var currentPage = $(this).attr('data-page');

			if(currentPage) {
				beginPro 	= qtyEachPage * (currentPage - 1);
				endPro 		= beginPro + qtyEachPage;

			} else {
				beginPro = 0;
				endPro	 = beginPro + qtyEachPage;
			}
			// if endPro greater than length of product number
			if (endPro >= database.database.length) {
				endPro = database.database.length - 1;
			}
			// destroy exist element
			$('.content-inner').text('');
			// get array of product's html
			render(beginPro, endPro, database.database, '.content-inner');
		});

		/**
		 * View detail
		 */
		$('.content-wrapper').on('click', '.product-more-detail', function() {
			var id = $(this).attr('data-id');
			var product = getObjectByValue(database.database, id);
			console.log(database.database[id]);
		});
	});
})(jQuery);