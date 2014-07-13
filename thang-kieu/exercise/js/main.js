
// var $button = document.getElementById('button');

// $button.addEventListener('click', function() {
// 	main();
// });

/**
 * function
 */
(function($) {
	$(document).ready(function() {
		var functions = new Functions();
		var result = '';
		var array = [];
		var numCompare = 0;

		$('.body').on('change', '.actions', function() {
			var id = $(this).val();
			if (id) {
				$('.content').css('display', 'table');
				var templateLink = 'template/' + id + '.ejs';

				var template = new EJS({
					url: templateLink
				}).render({});

				$('.input-wrapper').empty();
				$('.input-wrapper').append(template);
			} else {
				$('.content').hide();
			}
		});

		$('.body').on('click', '.action-button', function(e) {
			e.preventDefault();
			var action = $(this).attr('data-action');
			var vals = [];
			var i = 0;

			if ($(this).parent().hasClass('multi-list')) {
				var vals1 = [];
				var vals2 = [];
				var values = [];

				// get value
				$('.list').each(function(index, el) {
					values[index] = [];
					$(el).find('.input').each(function(index2, el2) {

						$(el2).removeClass('error');

						var val = el2.value;
						var type = $(el2).attr('data-type');

						if (val === '') {
							$(el2).addClass('error');
						} else {
							if (!functions.validate(val, type)) {
								$(el2).addClass('error');
								// return false;
							} else {
								values[index].push(el2.value);
								i++;
							}
						}
					});
				});
				// get first list
				$('.first-list').find('.input').each(function(index, el) {
					$(el).removeClass('error');

					var val = el.value;
					var type = $(el).attr('data-type');

					if (val === '') {
						$(el).addClass('error');
					} else {
						if (!functions.validate(val, type)) {
							$(el).addClass('error');
							// return false;
						} else {
							vals1[index] = el.value;
							i++;
						}
					}
				});

				// get last list
				$('.last-list').find('.input').each(function(index, el) {
					$(el).removeClass('error');

					var val = el.value;
					var type = $(el).attr('data-type');

					if (val === '') {
						$(el).addClass('error');
					} else {
						if (!functions.validate(val, type)) {
							$(el).addClass('error');
							// return false;
						} else {
							vals2[index] = el.value;
							i++;
						}
					}
				});

				// call actiond
				var inputNo = 0;
				values.forEach(function(item) {
					inputNo += item.length;
				});
				if (inputNo === $('.input').length) {
					result = functions[action](values);
				} else {
					result = 'Error';
				}

				functions['showResult']($, result);
			} else {
				$('.input').each(function(index, el) {
					$(el).removeClass('error');

					var val = el.value;
					var type = $(el).attr('data-type');

					if (val === '') {
						$(el).addClass('error');
					} else {
						if (!functions.validate(val, type)) {
							$(el).addClass('error');
							// return false;
						} else {
							vals[i] = el.value;
							i++;
						}
					}
				});

				// call actiond
				if (vals.length === $('.input').length) {
					result = functions[action](vals, numCompare);
				} else {
					result = 'Error';
				}

				functions['showResult']($, result);
			}
		});

		$('.wrapper').on('click', '.push-to-arr', function(e) {
			e.preventDefault();
			$el = $(this).parent();
			var val = $el.find('.insert-input').val();
			// do nothing when input is empty
			if (val === '') {
				$el.find('.insert-input').focus().addClass('error');
				return;
			}
			var itemTemplate = '';
			// push to array
			array.push(val);
			itemTemplate = '<div class="item half-width table"><input type="text" disabled class="input table-cell" data-type="text" value="'+val+'"><span class="clear table-cell" data-index="' + array.indexOf(val) + '">x</span></div>';
			$el.find('.list').append(itemTemplate);
			$el.find('.insert-input').val('');
		});

		$('.wrapper').on('click', '.clear', function() {
			var index = $(this).attr('data-index');

			array.splice(index, 1);

			$(this).parents('.item').remove();
		});

		$('.wrapper').on('keyup', '.input-val', function(e) {
			// Enter
			if (e.keyCode == 13) {
				$('.push-to-arr').click();
			}
		});

		$('.wrapper').on('change', '.input-val-num', function() {
			numCompare = $(this).val();
		});
	});
})(jQuery);
