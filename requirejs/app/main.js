define(function (require) {
    var print = require('print');
    var qs1 =  require('./app-view.js');
    print(qs1.showInfo());
    qs1.showAnswer();
});
