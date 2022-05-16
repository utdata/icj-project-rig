import gulp from 'gulp';

function copy() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/@popperjs/core/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
  ])
    .pipe(gulp.dest('./docs/js'))
};

gulp.task('copy', copy)

export default copy;
