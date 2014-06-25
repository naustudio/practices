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
			$('.' + wrapper).empty();
		}
		/**
		 * Update
		 */
		function update(url, data) {
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
				}
			});
		}

		/**
		 * Update
		 */
		function deleteWine(url, id) {
			$.ajax({
				url: url,
				type: 'DELETE',
				crossDomain: true,
				dataType: 'json',
				data: id,
				success: function(data) {
					console.log(data);
				},
				error: function(jqXHR) {
					console.log('ajax error ' + jqXHR.status);
				}
			});
		}

		/**
		 * [listProduct description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		function showProductList(pageNo, qtyEachPage) {
			$.getJSON(sourceUrl).done(function(data) {
				var from = 0,
					to = 0;
				if (pageNo) {
					from = qtyEachPage * (pageNo - 1);
					to = from + qtyEachPage;

				} else {
					from = 0;
					to = from + qtyEachPage;
				}
				// if to greater than length of product number
				if (to >= data.length) {
					to = data.length - 1;
				}
				// clear content of wrapper
				clearWrapperContent('product-detail');
				clearWrapperContent('product-content-wrapper');
				// get array of product's html
				render(from, to, data, 'product-content-wrapper');
			});
		}

		/**
		 * Show product detail
		 */
		function showProductDetail(data, id) {
			var url = sourceUrl + '/' + id;
			$.getJSON(url).done(function(data) {
				// var product = getObjectByValue(data, id);
				var productDetailHTML = '';
				if (data) {
					// show detail
					productDetailHTML = new EJS({ url: 'src/templates/detail.ejs' }).render(data);

					// clear product list
					clearWrapperContent('product-detail');
					// clear product list
					clearWrapperContent('product-content-wrapper');
					clearWrapperContent('pagination');
				} else {
					// append product detail
					productDetailHTML = '<h2>This product is not found</h2>';
				}
				appendHTML(productDetailHTML, 'product-detail');
			});
		}

		/**
		 * Get new data form form
		 */
		function getData() {
			var data = {
				name: $('.name-text-input').val(),
				year: $('.year-text-input').val(),
				grapes: $('.grapes-text-input').val(),
				country: $('.country-text-input').val(),
				region: $('.region-text-input').val(),
				description: $('.description-text-input').val(),
				// picture: $('.-text-input').val(),
				_id: $('.id-text-input').val(),
			};
			return data;
		}

		/**
		 * add pagination
		 */
		function addPagination() {
			// get total of pages
			$.getJSON(sourceUrl).done(function(data) {
				var pages = data.length / qtyEachPage + 1;
				for (var i = 1; i < pages; i++) {
					if (i === 1) {
						pageHtml += '<li class="item"><a href=#wines/page/' + i + ' class="page active page-no page-' + i + '" data-page="' + i + '">' + i + '</a></li>';
					} else {
						pageHtml += '<li class="item"><a href=#wines/page/' + i + ' class="page page-no page-' + i + '" data-page="' + i + '">' + i + '</a></li>';
					}
				}

				// append to content
				appendHTML(pageHtml, 'pagination');
			});
		}

		/**
		 * get database
		 * @return {[type]} [description]
		 */
		var database = {};
		// var products = [];
		var pageHtml = '';
		var qtyEachPage = 8;
		var pageNo = 1;
		// var sourceUrl = 'http://0.0.0.0:3000/src/data/database.json';
		var sourceUrl = 'http://dev.naustud.io:3000/wines';

		var currentHashTag = window.location.hash;
		if (currentHashTag !== 'wines') {
			window.location.hash = 'wines';
		}


		showProductList(pageNo, qtyEachPage);
		addPagination();



		/**
		 * Pagination
		 */
		$('.content-wrapper').on('click', '.page', function() {
			// var pageNo = $(this).attr('data-page');
			// // parse pageNo to Int
			// pageNo = parseInt(pageNo);
			// showProductList(database, pageNo, qtyEachPage);
			$('.pagination .page').removeClass('active');
			$(this).addClass('active');
		});

		/**
		 * View detail
		 */
		$('.content-wrapper').on('click', '.product-more-detail', function() {
			// e.preventDefault();
			// var id = $(this).attr('data-id');
			// // parse id to Int
			// // id = parseInt(id);
			// showProductDetail(database, id);
		});

		/**
		 * event: window.hashtag change
		 */
		$(window).on('hashchange', function() {
			var currentHash = this.location.hash.replace(/#/, '');

			if (currentHash === 'wines') {
				showProductList(pageNo, qtyEachPage);
			} else if (currentHash.indexOf('page/') !== -1) {
				pageNo = currentHash.split('page/')[1];
				pageNo = parseInt(pageNo);
				showProductList(pageNo, qtyEachPage);
			} else if (parseInt(currentHash.split('wines/')[1]) > 0) {
				var id = parseInt(currentHash.split('wines/')[1]);
				id = parseInt(id);
				showProductDetail(database, id);
			}
		});

		/**
		 * Add
		 */
		// $('.content-wrapper').on('click', '.add-wine', function() {
		$('.add-wine').click( function() {
			// window.event.preventDefault();
			var data = {};
			var form = new EJS({ url: 'src/templates/form.ejs' }).render(data);

			// clear product list
			clearWrapperContent('product-detail');
			// clear product list
			clearWrapperContent('product-content-wrapper');
			appendHTML(form, 'product-detail');
		});

		/**
		 * Update
		 */
		$('.content-wrapper').on('click', '.save', function() {
			var id = $('.id-text-input').val();
			var url = sourceUrl + '/' + id;

			var data = {};
			data = getData();
			update(url, data);
		});

		/**
		 * Delete
		 */
		$('.content-wrapper').on('click', '.delete', function() {
			var id = $('.id-text-input').val();
			var url = sourceUrl + '' + id;

			deleteWine(url, id);
		});
	});
})(jQuery);