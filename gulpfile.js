import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import gulp from 'gulp';
import images from './tasks/images.js';
import lint from './tasks/lint.js';
import nunjucks from './tasks/nunjucks.js';
import scripts from './tasks/scripts.js';
import serve from './tasks/serve.js';
import styles from './tasks/styles.js';

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

// Add non-grouped tasks so that they are not marked as unused imports
gulp.task(clear);
gulp.task(fetch);
