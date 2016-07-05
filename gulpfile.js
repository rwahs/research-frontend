/* global __dirname */

(function (pkg, gulp,
           jshint, jscs, stylish, mocha, connect, less, requirejs, uglify, replace, rename, header, awspublish,
           aws, yargs, fs, path, rimraf, mkdirp, recursive) {
    'use strict';

    var environment, environmentPrefix, headerTemplate, autodiscoverTests;

    environment = yargs.argv.env || 'development';

    environmentPrefix = {
        staging: 'staging-',
        uat: 'uat-',
        production: ''
    };

    headerTemplate =
        '/**\n' +
        ' * ${pkg.name}\n' +
        ' * ${pkg.description}\n' +
        ' * \n' +
        ' * @version ${pkg.version}\n' +
        ' * @date ' + (new Date()).toISOString() + '\n' +
        ' * @environment ' + environment + '\n' +
        ' * @link ${pkg.homepage}\n' +
        ' * @license ${pkg.license}\n' +
        ' */\n\n';

    autodiscoverTests = function (callback) {
        var rootPath, paths, tests;
        rootPath = path.join(__dirname, 'test', 'spec');
        paths = [ '' ];
        tests = [];
        (function processNextPath() {
            var dir;
            if (paths.length === 0) {
                return callback(null, tests);
            }
            dir = paths.pop();
            fs.readdir(path.join(rootPath, dir), function (err, files) {
                (function processNextFile() {
                    var file;
                    if (files.length === 0) {
                        return processNextPath();
                    }
                    file = files.pop();
                    fs.stat(path.join(rootPath, dir, file), function (err, stat) {
                        if (stat.isDirectory()) {
                            paths.push(path.join(dir, file));
                        }
                        if (stat.isFile()) {
                            tests.push(path.join('spec', dir, file.replace(/\.js$/, '')));
                        }
                        processNextFile();
                    });
                }());
            });
        }());
    };

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
        'qa:autodiscover-tests',
        [
            'qa:lint'
        ],
        function (callback) {
            autodiscoverTests(function (err, tests) {
                if (err) {
                    return callback(err);
                }
                gulp.src('test/main.js.template')
                    .pipe(replace(
                        /\/\/\sTESTS GO HERE.*/,
                        '\'' + tests.join('\',\n                    \'') + '\''
                    ))
                    .pipe(rename('main.js'))
                    .pipe(gulp.dest('test'));
                callback();
            });
        }
    );

    gulp.task(
        'qa:test',
        [
            'qa:lint',
            'qa:autodiscover-tests'
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
            'qa:autodiscover-tests',
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
        [
            'qa',
            'build'
        ],
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
            'qa',
            'build',
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
            'qa',
            'build',
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            // Dynamically generate the `include` list, because most of the modules are dynamically `require`d.
            recursive('public/app', function (err, files) {
                files = files.map(function (file) {
                    // Strip common path prefix; return .js files without extension, and others via text plugin.
                    file = file.replace(/^public\/app\//, '');
                    return file.match(/\.js$/) ? file.replace(/\.js$/, '') : 'text!' + file;
                });
                files.push('bootstrap');
                return gulp
                    .src('public/app/main.js')
                    .pipe(requirejs({
                        mainConfigFile: 'public/app/main.js',
                        name: '../lib/requirejs/require',
                        optimize: 'none',
                        out: 'application.js',
                        include: files
                    }))
                    .pipe(replace(
                        /var environment = 'development';/g,
                        'var environment = "' + environment + '";'
                    ))
                    .pipe(uglify())
                    .pipe(header(headerTemplate, { pkg: pkg }))
                    .pipe(gulp.dest('dist/' + environment));
            });
        }
    );

    gulp.task(
        'package:html',
        [
            'qa',
            'build',
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/index.html')
                .pipe(replace(
                    /src="\/lib\/requirejs\/require\.js"/g,
                    'src="/application.js"'
                ))
                .pipe(replace(
                    /href="\/css\/main\.css"/g,
                    'href="/main.css"'
                ))
                .pipe(replace(
                    /(<a href=['"]https?:\/\/)(.*?['"].*?class=['"]cross-site-link['"])/g,
                    '$1' + environmentPrefix[environment] + '$2'
                ))
                .pipe(gulp.dest('dist/' + environment));
        }
    );

    gulp.task(
        'package:images',
        [
            'qa',
            'build',
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
            'qa',
            'build',
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
        'package:robotstxt',
        [
            'qa',
            'build',
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/robots.txt.' + environment)
                .pipe(rename('robots.txt'))
                .pipe(gulp.dest('dist/' + environment));
        }
    );

    gulp.task(
        'package:favicon',
        [
            'qa',
            'build',
            'package:clean'
        ],
        function () {
            if (environment === 'development') {
                throw new Error('Cannot use "package" tasks in development environment');
            }
            return gulp
                .src('public/favicon.ico')
                .pipe(gulp.dest('dist/' + environment));
        }
    );

    gulp.task(
        'package',
        [
            'qa',
            'build',
            'package:clean',
            'package:less',
            'package:javascript',
            'package:html',
            'package:images',
            'package:fonts',
            'package:robotstxt',
            'package:favicon'
        ]
    );

    gulp.task(
        'deploy',
        [
            'qa',
            'build',
            'package'
        ],
        function () {
            var publisher;
            if (environment === 'development') {
                throw new Error('Cannot use "deploy" task in development environment');
            }
            publisher = awspublish.create(
                {
                    region: 'ap-southeast-2',
                    params: {
                        Bucket: 'rwahs.' + environment + '.research-frontend'
                    },
                    credentials: new aws.SharedIniFileCredentials({ profile: 'rwahs' })
                },
                {
                    cacheFile: '.aws-cache/'
                }
            );
            return gulp
                .src('dist/' + environment + '/**/*')
                .pipe(publisher.publish())
                .pipe(publisher.cache())
                .pipe(awspublish.reporter());
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
                        'public/app/**/*.js',
                        'test/fixtures/**/*.js',
                        'test/spec/**/*.js'
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
    require('gulp-rename'),
    require('gulp-header'),
    require('gulp-awspublish'),
    require('aws-sdk'),
    require('yargs'),
    require('fs'),
    require('path'),
    require('rimraf'),
    require('mkdirp'),
    require('recursive-readdir')
));
