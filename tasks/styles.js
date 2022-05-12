import gulp from 'gulp';
import postcss from 'gulp-postcss';
import newer from 'gulp-newer';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
var sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'cssnano';
import log from 'fancy-log';
import browserSync from 'browser-sync';

function styles() {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  var plugins = [
    cssnano()
  ];
  
  return gulp.src([
    'src/scss/*.scss'
  ])
    .pipe(newer('./docs/css'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', log.error)
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.stream());
};

gulp.task('styles', styles)

export default styles;
