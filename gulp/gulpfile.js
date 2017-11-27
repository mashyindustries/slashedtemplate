var gulp = require('gulp')
var less = require('gulp-less')
var minifyCSS = require('gulp-csso')

gulp.task('less', function(){
  return gulp.src('../resources/less/app.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('../public/assets/css'))
});

gulp.task('default', ['less'])
gulp.task('watch', ['less'])

if (process.argv[2] == 'watch'){
  gulp.watch('../resources/less/*.less', ['less'])
}

