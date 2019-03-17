import path from 'path';
import shell from 'shelljs';

const cwd = process.cwd();
const dest = path.resolve(cwd, 'release');

shell.rm('-rf', dest);

shell.exec(
  'cross-env NODE_ENV=production webpack -r @babel/register --config webpack.config.js --progress'
);
