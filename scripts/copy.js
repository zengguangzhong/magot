import path from 'path';
import mkdirp from 'mkdirp';
import { promises as fs } from 'fs';

/**
 * copy files
 *
 * @export
 * @param {string[]} files
 * @param {string} dest dest dir
 * @param {string} cwd
 * @returns {string[]}
 */
export default function copy(files, dest, cwd) {
  if (!/\/$/.test(cwd)) cwd += '/';
  files.forEach(file => copyOne(file, dest, cwd));
  return files;
}

/**
 * copy file
 *
 * @param {string} file
 * @param {string} dest
 * @param {string} cwd
 */
async function copyOne(file, dest, cwd) {
  try {
    const destFile = path.join(dest, file.replace(cwd, ''));
    mkdirp.sync(path.dirname(destFile));
    await fs.copyFile(file, destFile);
  } catch (err) {
    console.error('[copy]: %s is ERROR', file);
    console.error('[copy]: %s', err.message);
    process.exit(1);
  }
}
