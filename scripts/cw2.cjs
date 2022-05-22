const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const glob = require('glob');

const DATABASE_NAME = 'nbd';
const DUMP_PATH = path.resolve(__dirname, '..', 'vendors', 'cwiczenia2.json');
const CW2_DIR = path.resolve(__dirname, '..', 'cw2');

// cleanup
const previousOutputFiles = glob.sync(`${CW2_DIR}/*.json`);
previousOutputFiles.forEach((f) => {
  fs.rmSync(f);
});
// // cleanup
execSync(`mongo ${DATABASE_NAME} --eval "db.dropDatabase()"`);
execSync(
  `mongoimport --file ${DUMP_PATH} --db ${DATABASE_NAME} --jsonArray -c people`
);

// execution
fs.readdirSync(CW2_DIR).forEach((filename) => {
  const inputPath = path.resolve(CW2_DIR, filename);
  const outputPath = inputPath
    .replace('zapytanie', 'wyniki')
    .replace('.js', '.json');

  execSync(`mongo --quiet < ${inputPath} nbd >> ${outputPath}`);
});
