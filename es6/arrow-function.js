"use strict";

var sum = function sum(first) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var sum = first;
  for (var i = 0; i < rest.length; i++) {
    sum += rest[i];
  }
  return sum;
};
