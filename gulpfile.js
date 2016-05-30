/* global __dirname */

(function (gulp, jshint, jscs, stylish, mocha, connect, less) {
    'use strict';

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
        'less',
        function () {
            return gulp
                .src('public/less/main.less')
                .pipe(less({ paths: [ __dirname + '/public/less' ] }))
                .pipe(gulp.dest('public/css'));
        }
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
                        'public/less/**/*.less'
                    ],
                    [
                        'less'
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
            'qa'
        ]
    );
}(
    require('gulp'),
    require('gulp-jshint'),
    require('gulp-jscs'),
    require('gulp-jscs-stylish'),
    require('gulp-mocha-phantomjs'),
    require('gulp-connect'),
    require('gulp-less')
));
