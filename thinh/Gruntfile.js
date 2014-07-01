/* © 2014
 * @author Thanh Tran
 */
/*jshint node:true*/
module.exports = function(grunt) {
    'use strict';
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            app: '',
            dist: 'dist'
        },
        // Task configuration

        sass: {
            dev: { // Target
                options: { // Target options
                    // style: 'expanded'
                    // sourcemap: true //need SASS 3.3, install with: gem install sass --pre
                },

                files: {
                    'css/main.css':'css/main.scss'
                }
            }
        },

        watch: {
            sass: {
                files: [
                    'css/main.scss'
                ],
                tasks: ['sass:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '*.html',
                    'js/*.js',
                    'js/**/*.js',
                    'css/*.css'
                ]
            }
        },

        connect: {
            options: {
                port: 9002,
                livereload: true,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.'
                    ]
                }
            }
        }
    });

    //serve and watch and live reload the app
    grunt.registerTask('serve', ['sass:dev', 'connect:livereload', 'watch']);

    // Default task
    grunt.registerTask('default', ['serve']);
};
