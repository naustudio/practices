define(function () {
    return function print(msg) {
        console.log(msg);
        $('main').append(msg);
    };
});
