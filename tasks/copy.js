import gulp from 'gulp';

export function copy() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/@popperjs/core/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
  ])
    .pipe(gulp.dest('./docs/js'))
};
