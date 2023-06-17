import gulp from 'gulp';
import prettier from 'gulp-prettier';

function format() {
  return gulp
    .src([
      './src/js/*.js',
      './src/data/*.json',
      './docs/books/*.html',
      './docs/*.html',
      './src/js/*.js',
      './src/data/*.json'
    ])
    .pipe(prettier({ config: '.prettierrc.json' }))
    .pipe(gulp.dest((file) => file.base));
}

export default format;
