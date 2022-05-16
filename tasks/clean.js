import gulp from 'gulp';
import del from 'del';

function clean(resolve, reject) {
  del(['docs/*'], { dot: true });
  resolve();
};

gulp.task('clean', clean)

export default clean;
