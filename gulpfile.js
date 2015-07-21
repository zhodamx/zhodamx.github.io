// require
var    gulp = require('gulp'),
       sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
     rename = require('gulp-rename'),
       neat = require('node-neat').includePaths,
         cp = require('child_process'),
          Q = require('q'),
        del = require('del');

// assets
var paths = {
  styles: 'src/scss/**/*.scss',
  markup: ['*.html', '*.md', '_posts/*.md'],
};

// serve task
gulp.task('serve', ['clean', 'jekyll'], function() {
  browserSync.init({
    server: './_site'
  });
});

// clean task
gulp.task('clean', function(){
  var deferred = Q.defer();
  del(['css', '_site']);
  deferred.resolve();
  return deferred.promise;
});

// jekyll task
gulp.task('jekyll', ['clean', 'sass'], function () {
  var deferred = Q.defer();
  var jekyll = cp.spawn('jekyll', ['build']);
  jekyll.on('exit', function(code) {
    browserSync.reload();
    deferred.resolve();
  });
  return deferred.promise;
});

// sass task
gulp.task('sass', function(){
  return gulp.src('src/scss/main.scss')
      .pipe(sass({includePaths: neat}).on('error', sass.logError))
      .pipe(gulp.dest('_site/css'))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

// watch task
gulp.task('watch', ['jekyll'], function(){
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.markup, ['jekyll']);
});

// default task
gulp.task('default', ['serve', 'watch']);
