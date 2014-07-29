function Functions() {

}
/**
 * [maxOfThree description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
Functions.prototype.maxOfThree = function(arr) {
	return Math.max.apply(null, arr);
};

/**
 * calculate sum of number array
 * @param  {array} arr array to calculate
 * @return {number}     sum
 */
Functions.prototype.sum = function(arr) {
	var array = arr || [];
	var sumValue = 0;

	for (var i = 0; i < array.length; i++) {
		var val = parseInt(array[i]);
		if (val) {
			sumValue += val;
		} else {
			return false;
		}
	}

	return sumValue;
};

/**
 * multiply all the number of array
 * @param  {array} arr array of number
 * @return {number}     multiply value
 */
Functions.prototype.multiply = function(arr) {
	var array = arr || [];
	var multiplyValue = 1;

	for (var i = 0; i < array.length; i++) {
		if (parseInt(array[i])) {
			multiplyValue *= array[i];
		} else {
			return false;
		}
	}

	return multiplyValue;
};

/**
 * sort alphabet array
 * @param  {array} arr array of words
 * @return {array}     array sorted (increase)
 */
Functions.prototype.sortAlplabet = function(arr) {
	var array = arr || [];

	if (array.length) {
		array.sort(function(a, b) {
			a.toString();
			b.toString();

			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			} else {
				return 0;
			}
		});
	} else {
		return false;
	}

	return array;
};

/**
 * find longest words in an array of words
 * @param  {araay} arr  array of words
 * @return {number}     length of the longest word
 */
Functions.prototype.findLongestWord = function(arr) {
	var array = arr || [];	// if not have argument
	var lengths = [];		// array length of words

	for (var i = 0; i < array.length; i++) {
		// convert to string
		array[i].toString();
		// push to lengths array
		lengths.push(array[i].length);
	}

	// return max of lengths
	return Math.max.apply(null, lengths);
};

/**
 * take an array of words longer than i
 * @param  {array} arr array of words
 * @param  {number} i   compare value
 * @return {array}     array of words have length longer than i
 */
Functions.prototype.filterLongWords = function(arr, i) {
	var array = arr || [];
	var results = [];

	results = array.filter(function(item) {
		return typeof(item) === 'string' && item.length > i;
	});

	return results;
};

/**
 * collect the same value of 2 array
 * @param  {[type]} arrays [description]
 * @return {[type]}        [description]
 */
Functions.prototype.collectSameValue = function(arrays) {
	var array1 = arrays[0] || [];
	var array2 = arrays[1] || [];
	var results = [];
	array1.forEach(function(item1) {
		array2.forEach(function(item2) {
			if (item1 === item2) {
				results.push(item1);
				return;
			}
		});
	});

	results = this.removeSameValueArray(results);

	return results;
};

/**
 * collect different value of 2 array
 * @param  {[type]} arrays [description]
 * @return {[type]}        [description]
 */
Functions.prototype.collectDiffValue = function(arrays) {
	// var array1 = arr1 || [];
	// var array2 = arr2 || [];
	var results = [];
	var sameEl = this.collectSameValue(arrays);

	arrays.forEach(function(item) {
		item.forEach(function(item1) {
			sameEl.forEach(function(item2) {
				if (item1 !== item2) {
					results.push(item1);
				}
			});
		});
	});

	results = this.removeSameValueArray(results);

	return results;
};

Functions.prototype.removeSameValueArray = function(array) {
	var result = [];
	var found = false;

	array.forEach(function(val1) {
		result.forEach(function(val2) {
			// found = false;
			if (val1 === val2) {
				found = true;
				return;
			}
		});
		if (!found) {
			result.push(val1);
		}
	});

	return result;
};

/**
 * get date of today
 * @return {string} date format 'October 30, 2000'
 */
Functions.prototype.getDate = function() {
	var today = new Date();
	var months = ['Jan', 'Ferb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var date = today.getDate();
	var month = months[today.getMonth()];
	var year = today.getFullYear();

	var dateStr = month + ' ' + date + ', ' + year;
	return dateStr;
};

/**
 * show message refer to time of system
 * @return {string}
 */
Functions.prototype.sayHello = function() {
	var today = new Date();
	var msg = '';
	var hour = today.getHours();

	if (hour >= 0 && hour < 12) {
		msg = 'Good morning';
	} else if (hour < 17) {
		msg = 'Good afternoon';
	} else {
		msg = 'Good evening';
	}

	return msg;
};

/**
 * get age with year and month
 * @param  {Date} birthday birthday
 * @return {string}          result
 */
Functions.prototype.calcAgeWithYearMonth = function(birthday) {
	var today = new Date();
	birthday = new Date(birthday[0]);
	var yearOfAge = today.getFullYear() - birthday.getFullYear();
	var monthOfAge = today.getMonth() - birthday.getMonth();
	var yearStr = 'year';
	var monthStr = 'month';

	if (monthOfAge < 0) {
		yearOfAge--;
		monthOfAge = 12 - monthOfAge;
	}
	// set year and month string
	if (yearOfAge > 1) {
		yearStr += 's';
	}
	if (monthOfAge > 1) {
		monthStr += 's';
	} else if (monthOfAge === 0) {
		monthOfAge = '';
	}

	return 'Your age: ' + yearOfAge + ' ' + yearStr + ' ' + monthOfAge + ' ' + monthStr;
};

/**
 * [showConsole description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
Functions.prototype.showResult = function($, result) {
	$('.output-content').empty();
	var outputStr = '';

	if (Array.isArray(result)) {
		result.forEach(function(item){
			outputStr += '<div class="result-list half-width normal-text">' + item + '</div>';
		});
	} else {
		outputStr = result;
	}

	$('.output-content').append(outputStr);
};

/**
 * Validate
 */
Functions.prototype.validate = function(val, type) {
	switch(type) {
		case 'number':
			if (!parseInt(val)) {
				return false;
			}
			return true;
		default:
			return true;
	}
};