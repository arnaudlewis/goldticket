var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('browserify', function () {
    var bundler = browserify({
        entries: ['./js/app.js'],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher = watchify(bundler);

    return watcher
        .on('update', function () {
            watcher.bundle()
                .pipe(source('App.js'))
                .pipe(gulp.dest('./build/'));
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('App.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('sass', function () {
    gulp.src(['css/*.scss', 'css/**/*.scss'])
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('watchcss', function () {
    gulp.watch('css/**/*.scss', ['sass']);
});

gulp.task('deploy', ['sass'], function () {
    "use strict";
    var b = browserify({
        entries: ['./js/app.js'],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });
    b.bundle() // Create the initial bundle when starting the task
        .pipe(source('App.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['browserify', 'watchcss']);
