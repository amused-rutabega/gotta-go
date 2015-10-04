var gulp = require('gulp');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');

gulp.task('server-tests', function () {
  return gulp.src('spec/ServerSpec.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('client-tests', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('linter', function () {
  return gulp.src(['client/app/**/*.js', 'server/**/*.js', 'spec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['linter', 'server-tests', 'client-tests']);
