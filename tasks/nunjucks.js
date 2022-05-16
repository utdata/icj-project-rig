import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import * as journalize from 'journalize';
import browserSync from 'browser-sync';
import config from '../project.config.json' assert {type: 'json'};
import log from 'fancy-log';
import fs from 'fs';

function nunjucks(resolve, reject) {
  // nunjucks environment setup
  const manageEnv = function (env) {
    // loop over config vars to add to nunjucks global env
    // which can be added to project.config.json
    for (var k in config) {
      if (config.hasOwnProperty(k)) {
        env.addGlobal(k, config[k]);
      }
    }

    let data_dir = 'src/data/';

    // loop over the directory of files
    fs.readdir(data_dir, function (err, files) {
      // handle errors
      if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
      }

      // for each file
      files.forEach(function (file, index) {
        // if it's a .json file
        if (file.endsWith('json')) {
          // make the key the file name
          let key = file.split('.json')[0];

          // and the value the file contents
          let fileContents = fs.readFileSync(data_dir + file);
          let value = JSON.parse(fileContents);

          // and add to our global environment
          env.addGlobal(key, value);
        }
      });
    });

    // set up journalize
    for (let key in journalize) {
      let func = journalize[key];
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
        manageEnv: manageEnv,
      })
    )
    .on('error', log.error)
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.stream());
  resolve();
};

gulp.task('nunjucks', nunjucks)

export default nunjucks;
