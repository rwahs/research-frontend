/* global __dirname */

(function (pkg, gulp, jshint, jscs, stylish, mocha, connect, less, requirejs, uglify, replace, header, yargs, rimraf, mkdirp, recursive) {
    'use strict';

    var environment = yargs.argv.env || 'development',
        headerTemplate =
            '/**\n' +
            ' * ${pkg.name}\n' +
            ' * ${pkg.description}\n' +
            ' * \n' +
            ' * @version ${pkg.version}\n' +
            ' * @link ${pkg.homepage}\n' +
            ' * @license ${pkg.license}\n' +
            ' */\n\n';

    gulp.task(
        'qa:lint',
        function () {
            return gulp
                .src([
                    '*.js',
                    'public/app/**/*.js',
                    'test/**/*.js'
                ])
                .pipe(jshint())
                .pipe(jscs())
                .pipe(stylish.combineWithHintResults())
                .pipe(jshint.reporter('jshint-stylish'));
        }
    );

    gulp.task(
        'qa:test',
        [
            'qa:lint'
        ],
        function () {
            return gulp
                .src('test/runner.html')
                .pipe(mocha());
        }
    );

    gulp.task(
        'qa',
        [
            'qa:lint',
            'qa:test'
        ]
    );

    gulp.task(
        'build:clean',
        function (callback) {
            rimraf('public/css', callback);
        }
    );

    gulp.task(
        'build:less',
        [
            'build:clean'
        ],
        function () {
            return gulp
                .src('public/less/main.less')
                .pipe(less({
                    paths: [ 'public/less' ]
                }))
                .pipe(gulp.dest('public/css'));
        }
    );

    gulp.task(
        'build',
        [
            'build:clean',
            'build:less'
        ]
    );

    gulp.task(
        'package:clean',
        function (callback) {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            rimraf('dist/' + environment, function () {
                mkdirp('dist/' + environment, callback);
            });
        }
    );

    gulp.task(
        'package:less',
        [
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/less/main.less')
                .pipe(less({
                    paths: [ 'public/less' ],
                    optimize: true
                }))
                .pipe(gulp.dest('dist/' + environment));
        }
    );

    gulp.task(
        'package:javascript',
        [
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            // Dynamically generate the `include` list, because most of the modules are dynamically `require`d.
            recursive('public/app', function (err, files) {
                return gulp
                    .src('public/app/main.js')
                    .pipe(requirejs({
                        mainConfigFile: 'public/app/main.js',
                        name: '../lib/requirejs/require',
                        optimize: 'none',
                        out: 'application.js',
                        include: files.map(function (file) {
                            // Strip common path prefix; return .js files without extension, and others via text plugin.
                            file = file.replace(/^public\/app\//, '');
                            return file.match(/\.js$/) ? file.replace(/\.js$/, '') : 'text!' + file;
                        })
                    }))
                    .pipe(replace(/var environment = 'development';/g, 'var environment = "' + environment + '";'))
                    .pipe(uglify())
                    .pipe(header(headerTemplate, { pkg: pkg }))
                    .pipe(gulp.dest('dist/' + environment));
            });
        }
    );

    gulp.task(
        'package:html',
        [
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/index.html')
                .pipe(replace(/src="\/lib\/requirejs\/require\.js"/g, 'src="/application.js"'))
                .pipe(replace(/href="\/css\/main\.css"/g, 'href="/main.css"'))
                .pipe(gulp.dest('dist/' + environment));
        }
    );

    gulp.task(
        'package:images',
        [
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/images/**/*')
                .pipe(gulp.dest('dist/' + environment + '/images'));
        }
    );

    gulp.task(
        'package:fonts',
        [
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/lib/bootstrap/fonts/**/*')
                .pipe(gulp.dest('dist/' + environment + '/lib/bootstrap/fonts'));
        }
    );

    gulp.task(
        'package',
        [
            'package:clean',
            'package:less',
            'package:javascript',
            'package:html',
            'package:images',
            'package:fonts'
        ]
    );

    gulp.task(
        'server',
        function () {
            connect.server({
                port: 8888,
                root: 'public',
                fallback: 'public/index.html'
            });
        }
    );

    gulp.task(
        'dist-server',
        function () {
            connect.server({
                port: 8889,
                root: 'dist/' + environment,
                fallback: 'dist/' + environment + '/index.html'
            });
        }
    );

    gulp.task(
        'watch:qa',
        function () {
            return gulp
                .watch(
                    [
                        '*.js',
                        'public/app/**',
                        'test/**/*.js'
                    ],
                    [
                        'qa'
                    ]
                );
        }
    );

    gulp.task(
        'watch:less',
        function () {
            return gulp
                .watch(
                    [
                        'public/less/**/*.less',
                        'public/app/ui/**/*.less'
                    ],
                    [
                        'build:less'
                    ]
                );
        }
    );

    gulp.task(
        'watch',
        [
            'watch:qa',
            'watch:less'
        ]
    );

    gulp.task(
        'default',
        [
            'qa',
            'build',
            'watch'
        ]
    );
}(
    require('./package.json'),
    require('gulp'),
    require('gulp-jshint'),
    require('gulp-jscs'),
    require('gulp-jscs-stylish'),
    require('gulp-mocha-phantomjs'),
    require('gulp-connect'),
    require('gulp-less'),
    require('gulp-requirejs-optimize'),
    require('gulp-uglify'),
    require('gulp-replace'),
    require('gulp-header'),
    require('yargs'),
    require('rimraf'),
    require('mkdirp'),
    require('recursive-readdir')
));
