import path from 'path';
import shell from 'shelljs';
import find from '../find';
import copy from '../copy';
import compileLess from '../less/compile';

const cwd = process.cwd();
const src = path.resolve(cwd, 'src');
const dest = path.resolve(cwd, 'lib');

const lessPattern = '**/*.less';
const assetsPattern = '**/*.{eot,ttf,woff,woff2,svg,png,jpg,jpeg,gif}';

shell.rm('-rf', dest);

shell.exec('tsc -p ./tsconfig.lib.json');

copy(find(src, assetsPattern), dest, src);
compileLess(copy(find(src, lessPattern), dest, src), dest, src);
