import path from 'path';
import shell from 'shelljs';
import findLess from '../less/find';
import copyLess from '../less/copy';
import compileLess from '../less/compile';

const cwd = process.cwd();
const src = path.resolve(cwd, 'src');
const dest = path.resolve(cwd, 'lib');

shell.rm('-rf', dest);

shell.exec('tsc');

compileLess(copyLess(findLess(src), dest, src), dest, src);
