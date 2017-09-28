'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
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
    })
    .on('restart', function () {
      console.log('restarted!')
      setTimeout(function () {
        browserSync.reload();
      }, 1000);
    })
    .on('crash', function () {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds 
    });
});


gulp.task('browser-sync', ['nodemon', 'watch'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:8080",
    files: ['serve-index/**/*.*', 'public/**/*.*', 'views/**/*.*', 'controller/**/*.*', 'model/**/*.*', 'routes/**/.*.*', 'app/**/*.*'],
    // files: ['serve-index/**/*.*', 'public/**/*.*', 'views/**/*.*', 'controller/**/*.*', 'model/**/*.*', 'routes/**/.*.*', 'app/**/*.*'],
    browser: "google chrome",
    port: 7000,
    open: false,
    online: true
  });
});

gulp.task('default', ['browser-sync'], function () {

});