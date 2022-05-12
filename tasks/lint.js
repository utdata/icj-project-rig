import gulp from 'gulp';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
 
export function lint() {
  return gulp.src(['src/js/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(!browserSync.active, eslint.failAfterError()))
};
