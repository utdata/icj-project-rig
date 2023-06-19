import del from 'del';
import gulp from 'gulp';

function clean(resolve) {
  del(['docs/*'], {
    dot: true
  });
  resolve();
}

gulp.task('clean', clean);

export default clean;
