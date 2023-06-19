import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import format from './tasks/format.js';
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
    bake,
    clean,
    clear,
    copy,
    fetch,
    gulp.parallel(lint, scripts, images),
    nunjucks,
    styles
  )
);

// run default tasks and then serve locally
gulp.task('dev', gulp.series('default', serve));

// Allow them to be called individually
gulp.task(clear);
gulp.task(fetch);
gulp.task(format);
