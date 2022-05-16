// native
import path from 'path';

// packages
import gulp from 'gulp';
import colors from 'ansi-colors';
import fs from 'fs-extra';

// internal
import { google } from 'googleapis';
import { docToArchieML } from '@newswire/doc-to-archieml';
import { sheetToData } from '@newswire/sheet-to-data';
import config from '../project.config.json' assert {type: 'json'};

async function getData() {
  const auth = await google.auth.getClient({
    scopes: [
      'https://www.googleapis.com/auth/documents.readonly',
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
  });
  const { files } = config;
  for (const file of files) {
    const filepath = path.join('src/data', `${file.name}.json`);

    let data;
    let color;

    switch (file.type) {
      case 'doc':
        data = await docToArchieML({ documentId: file.fileId, auth });
        color = 'magenta';
        break;
      case 'sheet':
        data = await sheetToData({ spreadsheetId: file.fileId, auth });
        color = 'cyan';
        break;
      default:
        throw new Error(
          `No data fetching method found for type '${file.type}'`
        );
    }

    await fs.outputJson(filepath, data, { spaces: 2 });

    logDownload(file.name, file.fileId, color);
  }
}

function logDownload(fileName, fileId, color) {
  console.log(colors[color](`Downloaded \`${fileName}\` (${fileId})`));
}

function fetch(resolve, reject) {
  getData();
  resolve();
};

gulp.task('fetch', fetch)

export default fetch;
