const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const glob = require('glob');

const DATABASE_NAME = 'nbd';
const DUMP_PATH = path.resolve(__dirname, '..', 'vendors', 'cwiczenia2.json');
const CW1_DIR = path.resolve(__dirname, '..', 'cw1');

// cleanup
const previousOutputFiles = glob.sync(`${CW1_DIR}/*.json`);
previousOutputFiles.forEach((f) => {
  fs.rmSync(f);
});
// // cleanup
execSync(`mongo ${DATABASE_NAME} --eval "db.dropDatabase()"`);
execSync(
  `mongoimport --file ${DUMP_PATH} --db ${DATABASE_NAME} --jsonArray -c people`
);

// execution
fs.readdirSync(CW1_DIR).forEach((filename) => {
  const inputPath = path.resolve(CW1_DIR, filename);
  const id = filename.match(/\d+/)[0];
  const outputPath = path.resolve(CW1_DIR, `wyniki_${id}.json`);

  execSync(`mongo --quiet < ${inputPath} nbd >> ${outputPath}`);
});
