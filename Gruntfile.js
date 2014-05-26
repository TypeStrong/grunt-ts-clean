/*
 * grunt-ts-clean
 * https://github.com/grunt-ts/grunt-ts-clean
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadTasks('tasks');

	grunt.registerTask('verify', function () {
		var failed = [];

		function verify(src) {
			//what more?
			if (grunt.file.exists(src)) {
				return;
			}
			var content = grunt.file.read(src);
			if (content.length > 0) {
				return;
			}
			//TODO more testing?
			failed.push(src);
		}

		//add more here
		verify('./test/cases/example.html');

		if (failed.length > 0) {
			grunt.log.error('missing output:'.red);
			grunt.log.error(failed.join('\n'));
			grunt.log.writeln();
			return false;
		}
		else {
			grunt.log.ok('output verified');
		}
	});

	grunt.initConfig({
		clean: {
			test: ['./test/tmp']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/**/*.js'
			]
		},
		copy: {
			test: {
				files: [
					{
						expand: true,
						cwd: 'test/fixtures',
						src: ['**'],
						dest: 'test/tmp'
					}
				]
			}
		},
		ts_clean: {
			test: {
				options: {

				},
				src: ['./test/tmp/**/*']
			}
		}
	});


	grunt.registerTask('test', ['clean', 'copy:test', 'ts_clean:test']);
	grunt.registerTask('default', ['test']);
};
