import gulp from 'gulp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg'; 
import imageminPngquant from 'imagemin-pngquant';

export function images() {
  return gulp.src('./src/img/**/*')
    .pipe(cache(imagemin([
      // lossy jpg compression
      imageminMozjpeg({
        quality: 50
      }),
      // png compression
      imageminPngquant({
        speed: 1,
        quality: 98 //lossy settings
      })
  ])))
    .pipe(gulp.dest('./docs/img'))
};
