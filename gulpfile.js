var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./js/app.js'],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
        .on('update', function () {
            var updateStart = Date.now();
            watcher.bundle()
                .pipe(source('App.js'))
                .pipe(gulp.dest('./build/'));
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('App.js'))
        .pipe(gulp.dest('./build/'));
});

// I added this so that you see how to run two watch tasks
//gulp.task('css', function () {
//    gulp.watch('styles/**/*.css', function () {
//        return gulp.src('styles/**/*.css')
//            .pipe(concat('main.css'))
//            .pipe(gulp.dest('build/'));
//    });
//});
gulp.task('default', ['browserify']);