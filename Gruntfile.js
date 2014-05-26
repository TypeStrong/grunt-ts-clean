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
		var done = this.async();
		var expected = [
			'foo/foo.js',
			'index.js'
		];

		var recursive = require('recursive-readdir');
		var assert = require('assert');

		recursive('test/tmp', function (err, files) {
			if (err) {
				done(err);
				return;
			}
			files = files.map(function (file) {
				return file.replace(/\\/, '/');
			}).sort();

			assert(files.length, expected.length, 'length');

			files.forEach(function (file, i) {
				assert(files[i], expected[i], 'file ' + i);
			});
			grunt.log.writeln('verfied ' + files.length + ' files');
			done();
		});
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
						dest: 'test/tmp',
						dot: true
					}
				]
			}
		},
		ts_clean: {
			test: {
				options: {

				},
				src: ['./test/tmp/**/*'],
				dot: true
			}
		}
	});


	grunt.registerTask('test', ['clean', 'jshint', 'copy:test', 'ts_clean:test', 'verify']);
	grunt.registerTask('default', ['test']);
};
