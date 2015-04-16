'use strict';

var options = {
    repeat: true,
    save: false,
    rules: {
        custom: 10 }
};

// later

var repeat = options.repeat;
var save = options.save;
var custom = options.rules.custom;

console.log(repeat); // true
console.log(save); // false
console.log(custom); // 10
console.log(rules); // 10
