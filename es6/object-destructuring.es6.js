'use strict';

var options = {
        repeat: true,
        save: false,
        rules: {
            custom: 10,
        }
    };

// later

var { repeat, save, rules: { custom }, rules} = options;

console.log(repeat);        // true
console.log(save);          // false
console.log(custom);        // 10
console.log(rules);        // 10