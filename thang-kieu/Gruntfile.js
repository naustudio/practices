
module.exports = function (grunt) {
	'use strict';
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// automatically load grunt tasks listed in the initConfig
	require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({

		dirs: {
			js: 'src/js',
			src: 'exercise/',
			doc: '../docs',
			release: '~release',
			deploy: '~deploy',
			install: 'assets/install-page',
			upload: '~upload',
			ftpremote: '/project/staging',
			ftpdoc: '/project/docs'
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		connect: {
			options: {
				port: 3000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0',
				livereload: 35740,
				open: true,
				base: [
					'.',
					'<%= dirs.src %>'
				]
			},
			dev: {
				base: [
					'.',
					'<%= dirs.src %>'
				]
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.'
					]
				}
			}
		},

		sass: {
			compile: { // Target
				options: { // Target options
					style: 'expanded'
					// sourcemap: true //need SASS 3.3, install with: gem install sass --pre
				},

				files: [{
					expand: true,
					cwd: '<%= dirs.src %>/css',
					src: ['main.scss'],
					dest: '<%= dirs.src %>/css',
					ext: '.css'
				}]
			}
		},

		watch: {
			sass: {
				files: [
					'<%= dirs.src %>/css/*.scss'
				],
				tasks: ['sass']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				// files: [
				// 	'*.html',
				// 	'<%= dirs.src %>/**/*.js',
				// 	'<%= dirs.src %>/**/*.ejs',
				// 	'<%= dirs.src %>/css/*.css'
				// ],
				files: [
					'*.html',
					'<%= dirs.src %>/js/*.js',
					'<%= dirs.src %>/*.html',
					'<%= dirs.src %>/css/*.css'
				]
			}
		}
	});

	// Actually load this plugin's task(s).
	// grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'nodeunit']);

	/*******************
	 * TESTING
	 *******************/
	grunt.registerTask('serve', function (target) {

		if (!target) {
			target = 'dev';
		}
		process.env.target = target;
		grunt.task.run([
			'connect:' + target,
			'watch'
		]);
	});

	// By default, lint and run all tests.
	grunt.registerTask('default', 'serve');

};
