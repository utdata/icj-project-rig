import gulp from 'gulp';
import clean from './tasks/clean.js';
import styles from './tasks/styles.js';
import copy from './tasks/copy.js';
import lint from './tasks/lint.js';
import scripts from './tasks/scripts.js';
import images from './tasks/images.js';
import nunjucks from './tasks/nunjucks.js';
import bake from './tasks/bake.js';
import serve from './tasks/serve.js';
import clear from './tasks/clear.js';
import fetch from './tasks/fetch.js';

// default tasks
gulp.task(
  'default',
  gulp.series(
    clean,
    styles,
    copy,
    gulp.parallel(lint, scripts, images),
    nunjucks,
    bake
  )
);

// run default tasks and then serve locally
gulp.task('dev', gulp.series('default', serve));
