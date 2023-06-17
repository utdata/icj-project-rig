import gulp from 'gulp';
import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import images from './tasks/images.js';
import nunjucks from './tasks/nunjucks.js';
import scripts from './tasks/scripts.js';
import serve from './tasks/serve.js';
import styles from './tasks/styles.js';
import format from './tasks/format.js';

// default tasks
gulp.task(
  'default',
  gulp.series(
    clean,
    styles,
    copy,
    gulp.parallel(scripts, images),
    nunjucks,
    bake,
    format
  )
);

// run default tasks and then serve locally
gulp.task('dev', gulp.series('default', serve));

// Add non-grouped tasks so that they are not marked as unused imports
gulp.task(clear);
gulp.task(fetch);
gulp.task(format);
