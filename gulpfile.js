'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var ejsLint = require('ejs-lint');
var sass = require('gulp-sass')

var paths = {
  src: 'src',
  sass: 'client/**/*.scss',
  public: 'public'

}
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.public))
})

gulp.task('watch', function () {
  gulp.watch([paths.sass], ['sass'])
  gulp.watch([paths.public + '/**/*.*'], browserSync.reload)
})

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});


gulp.task('browser-sync', ['nodemon', 'watch'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:8080",
    files: ['public/**/*.*', 'views/**/*.*', 'controller/**/*.*', 'model/**/*.*', 'routes/**/.*.*', 'app/**/*.*'],
    browser: "google chrome",
    port: 7000,
    open: false
  });
});

gulp.task('default', ['browser-sync'], function () {

});