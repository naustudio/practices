var Practices = {
    //Define months in String
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    init: function() {
        // 1
        console.log('-------------- 1 -------------');
        console.log('Define a function maxOfThree() that takes three numbers as arguments and returns the largest of them.');
        console.log('[12,45,32]');
        console.log('Results : ' + this.maxOfThree(12, 45, 32));
        console.log('\n');

        // 2
        console.log('-------------- 2 -------------');
        console.log('Define a function sum() and a function multiply() \nthat sums and multiplies (respectively) all the numbers in an array of numbers.\n For example, sum([1,2,3,4]) should return 10, and multiply([1,2,3,4]) should return 24.');
        array = [4, 23, 7, 4, 6, 9, 3, 2, 7, 42, 3, 8, 9, 4];
        console.log(array);
        console.log('Results : ' + this.sum(array));
        console.log('\n');

        // 3
        console.log('-------------- 3 -------------');
        console.log('Write a function to sort a list of words (an array) in alphabetical order');
        array = ['Nau', 'Studio', 'Thinh', 'Thang', 'Thanh', 'Long', 'Phuong', 'Trang', 'Thao', 'Quy', ':D'];
        console.log(array);
        console.log('Results : ' + this.sortAlphaB(array));
        console.log('\n');

        // 4
        console.log('-------------- 4 -------------');
        console.log('Write a function findLongestWord() \n that takes an array of words and returns the length of the longest one.');
        console.log(array);
        console.log('Results : ' + this.findLongestWord(array));
        console.log('\n');

        // 5
        console.log('-------------- 5 -------------');
        console.log('Write a function filterLongWords() that takes an array of words and an integer i \n and returns the array of words that are longer than i.');
        console.log(array);
        console.log('Results : ' + this.filterLongWords(array, 4));
        console.log('\n');

        // 6
        console.log('-------------- 6 -------------');
        console.log('Write a function to collect elements that appear in 2 arrays');
        var array1 = [4, 23, 7, 4, 6, 9, 3, 2, 7, 42, 3, 8, 9, 4];
        var array2 = [54, 63, 7, 2, 94, 3, 9846, 8, 3, 2, 9, 84, 2, 5, 3];
        console.log(array1);
        console.log(array2);
        console.log('Results : ' + this.collectElements(array1, array2));
        console.log('\n');

        // 7
        console.log('-------------- 7 -------------');
        console.log('Write a function to collect all element from 2 arrays that does not appear in both arrays');
        console.log(array1);
        console.log(array2);
        console.log('Results : ' + this.collectElementsNot(array1, array2));
        console.log('\n');

        // 8
        console.log('-------------- 8 -------------');
        console.log('Display the current date on the page in the following format: October 30, 2000.\n Do not display the time. Do not "hard code" the date;\n if I load the page tomorrow, I should get a different date.');
        console.log('Results : ' + this.displayCurrentDate());
        console.log('\n');

        // 9
        console.log('-------------- 9 -------------');
        console.log('Display a message saying \n Good Morning if it is in the morning, \n Good Afternoon if it is in the afternoon, \n and Good Evening if it is in the Evening.');
        console.log('Results : ' + this.greeting());
        console.log('\n');

        // 10
        console.log('-------------- 10 -------------');
        console.log('Write a function to calculate age in both year and month: \n Ex: your age is 2 years 6 months');
        var monthOfBirth = 12;
        var yearOfBirth = 1976;
        console.log(monthOfBirth);
        console.log(yearOfBirth);
        console.log('Results : ' + this.calculateAge(monthOfBirth, yearOfBirth));
    },
    // create an array of length for an array
    getItemArrayLength: function(array) {
        var arrayLength = [];
        array.forEach(function(item) {
            arrayLength.push(item.length);
        });
        return arrayLength;
    },
    // Check time for hour
    returnWhatTime: function(hour) {
        if (hour > 0 && hour < 10) {
            return 'Morning';
        } else if (hour >= 10 && hour < 17) {
            return 'Afternoon';
        } else {
            return 'Evening';
        }
    },
    // 1 - Define a function maxOfThree() that takes three numbers as arguments and returns the largest of them.
    maxOfThree: function(n1, n2, n3) {
        return Math.max(n1, n2, n3);
    },
    // 2 - Define a function sum() and a function multiply() that sums and multiplies (respectively)
    // all the numbers in an array of numbers.
    // For example, sum([1,2,3,4]) should return 10, and multiply([1,2,3,4]) should return 24.
    sum: function(array) {
        var sum = 0;
        if (array.length > 0) {
            var n = array.length;
            for (var i = n - 1; i >= 0; i--) {
                sum += array[i];
            }
        }
        return sum;
    },
    // 3 - Write a function to sort a list of words (an array) in alphabetical order
    sortAlphaB: function(array) {
        return array.sort();
    },
    // 4 - Write a function findLongestWord()
    // that takes an array of words and returns the length of the longest one.
    findLongestWord: function(array) {
        var arrayLength = this.getItemArrayLength(array);
        return array[arrayLength.indexOf(Math.max.apply(null, arrayLength))];
    },
    // 5 - Write a function filterLongWords() that takes an array of words and an integer i
    // and returns the array of words that are longer than i.
    filterLongWords: function(array, i) {
        return array.filter(function(item) {
            return item.length > i;
        });
    },
    // 6 - Write a function to collect elements that appear in 2 arrays
    collectElements: function(array1, array2) {
        var arrayResult = [];
        array1.forEach(function(item) {
            if (array2.indexOf(item) !== -1) {
                arrayResult.push(item);
            }
        });
        return arrayResult;
    },
    // 7 - Write a function to collect all element from 2 arrays that does not appear in both arrays
    collectElementsNot: function(array1, array2) {
        var arrayResult = [];
        var collectedElements = this.collectElements(array1, array2);
        var arrayMerged = array1.concat(array2);
        arrayMerged.forEach(function(item) {
            if (collectedElements.indexOf(item) === -1) {
                arrayResult.push(item);
            }
        });
        return arrayResult;
    },
    // 8 - Display the current date on the page in the following format: October 30, 2000.
    // Do not display the time. Do not "hard code" the date;
    // if I load the page tomorrow, I should get a different date.
    displayCurrentDate: function() {
        var date = new Date();
        var stringDate = this.months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
        return stringDate;
    },
    // 9 - Display a message saying
    // Good Morning if it is in the morning,
    // Good Afternoon if it is in the afternoon,
    // and Good Evening if it is in the Evening.
    greeting: function() {
        var date = new Date();
        var time = this.returnWhatTime(date.getHours());
        var stringDate = 'Good ' + time;
        return stringDate;
    },
    // 10 - Write a function to calculate age in both year and month:
    // Ex: your age is 2 years 6 months
    calculateAge: function(monthOfBirth, yearOfBirth) {
        var today = new Date();
        var month,
            year,
            age;
        var stringAge = '';
        var dateOfBirth = new Date();
        dateOfBirth.setMonth(monthOfBirth);
        if (yearOfBirth.length > 2) {
            dateOfBirth.setFullYear(yearOfBirth);
        } else {
            dateOfBirth.setYear(yearOfBirth);
        }
        age = today - dateOfBirth;
        age /= 1000;
        year = Math.floor(age / 31536000);
        if (today.getMonth() < (monthOfBirth - 1)) {
            year -= 1;
            var newMonth = 12 + today.getMonth();
            month = newMonth - (monthOfBirth - 1);
        } else {
            month = today.getMonth() - (monthOfBirth - 1);
        }
        stringAge = 'your age is ' + year + ' years ' + month + ' months';
        return stringAge;
    }
};

// initialize
Practices.init();