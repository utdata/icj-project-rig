import archieML from 'archieml';
import axios from 'axios';
import colors from 'ansi-colors';
import csv from 'csvtojson';
import fs from 'fs-extra';
import gulp from 'gulp';
import path from 'path';

// eslint-disable-next-line no-sync
const config = fs.readJsonSync('./project.config.json');

async function getData() {
  const { files } = config;
  for (const file of files) {
    const filepath = path.join('src/data', `${file.name}.json`);

    let data;
    let color;
    let response;
    let url;

    switch (file.type) {
      case 'doc':
        url = `https://docs.google.com/document/d/${file.fileId}/export?format=txt`;
        // eslint-disable-next-line no-await-in-loop
        response = await axios.get(url);
        console.log(response.data);
        color = 'magenta';
        data = archieML.load(response.data);
        console.log(data);

        // eslint-disable-next-line no-await-in-loop
        await fs.outputJson(filepath, data, {
          spaces: 2
        });

        logDownload(file.name, file.fileId, color);
        break;
      case 'sheet':
        console.log('lol');
        color = 'cyan';
        url = `https://docs.google.com/spreadsheets/d/${file.fileId}/export?format=csv`;
        // eslint-disable-next-line no-await-in-loop
        response = await axios.get(url);
        console.log(response.data);
        color = 'magenta';

        data = csv()
          .fromString(response.data)
          .then((jsonObj) => {
            data = jsonObj;
          })
          .then(async () => {
            // eslint-disable-next-line no-await-in-loop
            await fs.outputJson(
              filepath,
              { stores: data },
              {
                spaces: 2
              }
            );

            logDownload(file.name, file.fileId, color);
          });
        break;
      default:
        throw new Error(
          `No data fetching method found for type '${file.type}'`
        );
    }
  }
}

function logDownload(fileName, fileId, color) {
  console.log(colors[color](`Downloaded \`${fileName}\` (${fileId})`));
}

function fetch(resolve) {
  getData();
  resolve();
}

gulp.task('fetch', fetch);

export default fetch;
