
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

		$('.body').on('change', '.actions', function() {
			var id = $(this).val();
			var templateLink = 'template/' + id + '.ejs';

			var template = new EJS({
				url: templateLink
			}).render({});

			$('.input-wrapper').empty();
			$('.input-wrapper').append(template);
		});

		$('.body').on('click', '.action-button', function() {
			var action = $(this).attr('data-action');
			var vals = [];

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
						vals[index] = el.value;
					}
				}
			});

			// call actiond
			if (vals.length === $('.input').length) {
				result = functions[action](vals);
			} else {
				result = 'Error';
			}

			functions['showResult']($, result);
		});

	});
})(jQuery);
