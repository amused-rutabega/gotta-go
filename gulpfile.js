var gulp = require('gulp');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;

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

gulp.task('default', ['server-tests', 'client-tests'], function () {

});