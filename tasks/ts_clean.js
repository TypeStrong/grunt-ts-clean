module.exports = function (grunt) {

	grunt.registerMultiTask('ts_clean', 'Cleanup TypeScript compilation', function () {
		var options = this.options({});

		// lazy init
		var fs = require('fs');
		var path = require('path');
		var async = require('async');

		var split = require('split');
		var filter = require('through2-filter');
		var toArray = require('stream-to-array');

		var done = this.async();

		var jsExp = /\.js$/;

		var defExp = /.+\.d\.ts$/;
		var mapExp = /.+\.js\.map$/;
		var baseDirExp = /^\.baseDir\./;
		var tsCommandExp = /^\.tscommand$/;

		var refExp = /^[ \t]*\/\/\/[ \t]*<reference path=.*? \/?>[ \t]*$/;
		var sourceExp = /^[ \t]*\/\/[@#] ?sourceMapping.+$/;

		function isRemoveFile(file) {
			if (defExp.test(file) || mapExp.test(file)) {
				return true;
			}
			var base = path.basename(file);
			if (baseDirExp.test(base) || tsCommandExp.test(base)) {
				return true;
			}
			return false;
		}

		function isCleanupFile(file) {
			if (jsExp.test(file)) {
				return true;
			}
			return false;
		}

		function keepLine(line) {
			return !(refExp.test(line) || sourceExp.test(line));
		}

		var cleaned = [];
		var removed = [];

		async.each(this.filesSrc, function (file, callback) {
			fs.stat(file, function (err, stat) {
				if (err) {
					callback(err);
					return;
				}
				if (!stat.isFile()) {
					callback();
					return;
				}
				if (isRemoveFile(file)) {
					fs.unlink(file, function (err) {
						removed.push(file);
						callback(err);
					});
				}
				else if (isCleanupFile(file)) {
					toArray(fs.createReadStream(file)
							.pipe(split())
							.pipe(filter(keepLine)),
						function (err, arr) {
							if (err) {
								callback(err);
								return;
							}
							fs.writeFile(file, arr.join('\n') + '\n', function (err) {
								if (err) {
									callback(err);
									return;
								}
								cleaned.push(file);
								callback();
							})
						}
					);
				}
				else {
					callback();
				}
			});
		}, function (err) {
			grunt.log.writeln('removed ' + removed.length);
			if (removed.length > 0) {
				removed.forEach(function(file) {
					grunt.log.writeln(file);
				});
			}

			grunt.log.writeln('cleaned ' + cleaned.length);
			if (cleaned.length > 0) {
				cleaned.forEach(function(file) {
					grunt.log.writeln(file);
				});
			}

			if (err) {
				done(err);
			}
			else {
				done();
			}
		});
	})
};
