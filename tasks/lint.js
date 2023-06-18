import gulp from 'gulp';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';

function lint() {
  return gulp
    .src([
      './src/js/*.js',
      './docs/books/*.html',
      './docs/*.html',
      './src/js/*.js'
    ])
    .pipe(eslint({ configFile: '.eslintrc.json', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(!browserSync.active, eslint.failAfterError()));
}

gulp.task('lint', lint);

export default lint;
