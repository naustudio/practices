
requirejs.config({
    baseUrl: 'scripts',
    paths: {
        app: '../app',
        view:'../app/view'

    }
});

requirejs(['app/main']);
requirejs(['jquery']);
