import * as journalize from 'journalize';
import browserSync from 'browser-sync';
import fs from 'fs-extra';
import gulp from 'gulp';
import log from 'fancy-log';
import nunjucksRender from 'gulp-nunjucks-render';

const config = fs.readJsonSync('./project.config.json');

function nunjucks(resolve) {
  // nunjucks environment setup
  const manageEnv = function (env) {
    // loop over config vars to add to nunjucks global env
    // which can be added to project.config.json
    for (const k in config) {
      if (config.hasOwnProperty(k)) {
        env.addGlobal(k, config[k]);
      }
    }

    const dataDir = 'src/data/';

    // loop over the directory of files
    fs.readdir(dataDir, (err, files) => {
      // handle errors
      if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
      }

      // for each file
      files.forEach((file, index) => {
        // if it's a .json file
        if (file.endsWith('json')) {
          // make the key the file name
          const key = file.split('.json')[0];

          // and the value the file contents
          const fileContents = fs.readFileSync(dataDir + file);
          const value = JSON.parse(fileContents);

          // and add to our global environment
          env.addGlobal(key, value);
        }
      });
    });

    // set up journalize
    for (const key in journalize) {
      const func = journalize[key];
      if (typeof func === 'function') {
        env.addFilter(key, func);
      }
    }
  };

  gulp
    .src([
      'src/njk/*.html',
      'src/njk/*.njk',
      'src/njk/**/*.njk',
      '!src/njk/_*/',
      '!src/njk/_*/**/*'
    ])
    .pipe(
      nunjucksRender({
        path: 'src/njk',
        manageEnv
      })
    )
    .on('error', log.error)
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.stream());
  resolve();
}

gulp.task('nunjucks', nunjucks);

export default nunjucks;
