'use strict';

var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    client    = require('tiny-lr')(),
    refresh   = require('gulp-livereload'),
    jshint    = require('gulp-jshint'),
    shell     = require('gulp-shell'),
    lr_port   = 35729;


// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  test: ['specs/**/*.js']
};

// this is a live reload server, any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('live', function () {
  client.listen(lr_port, function (err) {
    if(err) {
      console.error(err);
    }
  });
});


gulp.task('karma', shell.task([
  'karma start'
]));

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: 'index.js', ignore: 'node_modules/**/*.js'})
    .on('restart', function () {
      refresh(client);
    });
});

// lint out JavaScript
gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(client));
});


gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(refresh(client));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(refresh(client));
});

// watch all our client code and force a refersh when they change
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['lint', 'live', 'serve', 'watch']);
