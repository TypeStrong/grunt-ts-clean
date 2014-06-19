# grunt-ts-clean

> Grunt [plugin](http://gruntjs.com/) to cleanup TypeScript builds for release.

[![Build Status](https://secure.travis-ci.org/grunt-ts/grunt-ts-clean.png?branch=master)](http://travis-ci.org/grunt-ts/grunt-ts-clean) [![Dependency Status](https://gemnasium.com/grunt-ts/grunt-ts-clean.png)](https://gemnasium.com/grunt-ts/grunt-ts-clean) [![NPM version](https://badge.fury.io/js/grunt-ts-clean.png)](http://badge.fury.io/js/grunt-ts-clean)

Remove declarations, <reference>-tags, sourcemaps, sourcemap-tags,  lint files and CRLF's to make a TypeScript build ready for distribution.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-ts-clean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ts-clean');
```

## The "grunt-ts-clean" task

### Default Options

**Note** use the `dot: true` configuration options to remove `.baseDir` files.

```js
grunt.initConfig({
	ts_clean: {
		build: {
			options: {
				// set to true to print files
				verbose: false
			},
			src: ['./build/**/*'],
			dot: true
		}
	}
});
```

## History

* 0.2.0 - Added verbose option
* 0.1.1 - First release

## Contributing

Contributions are very welcome, please create an Issue before doing something major.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

