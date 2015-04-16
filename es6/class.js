"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var PersonClass = (function () {

    // equivalent of the PersonType constructor

    function PersonClass(name) {
        _classCallCheck(this, PersonClass);

        this.name = name;
    }

    _createClass(PersonClass, [{
        key: "sayName",

        // equivalent of PersonType.prototype.sayName
        value: function sayName() {
            console.log(this.name);
        }
    }]);

    return PersonClass;
})();

var person = new PersonClass("Nicholas");
person.sayName(); // outputs "Nicholas"

console.log(person instanceof PersonClass); // true
console.log(person instanceof Object); // true

console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"
