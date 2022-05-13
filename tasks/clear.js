import gulp from 'gulp';
import cache from 'gulp-cache';

function clear() {
  return cache.clearAll()
};

gulp.task('clear', clear)

export default clear;
