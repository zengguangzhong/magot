import path from 'path';
import less from 'less';
import { promises as fs } from 'fs';
import globToRegExp from 'glob-to-regexp';

const ignoreLesses = ['variable.less', 'mixins/*.less', 'themes/*.less'];

/**
 * compile less files
 *
 * @export
 * @param {string[]} files
 * @param {string} dest dest dir
 * @param {string} cwd
 * @returns {string[]}
 */
export default function compile(files, dest, cwd) {
  if (!/\/$/.test(cwd)) cwd += '/';
  const _files = files.filter(file => {
    const p = file.replace(cwd, '');
    return ignoreLesses.every(ignore => !globToRegExp(ignore).test(p));
  });
  _files.forEach(file => compileOne(file, dest, cwd));
  return _files;
}

/**
 * compile file
 *
 * @param {string} file
 * @param {string} dest
 * @param {string} cwd
 */
async function compileOne(file, dest, cwd) {
  try {
    const p = file.replace(cwd, '').replace(/\.less$/, '.css');
    const destFile = path.join(dest, p);
    console.info('[less compile]: %s ==> %s', file, destFile);
    const input = await fs.readFile(file, 'utf8');
    const output = await less.render(input, {
      paths: [path.dirname(file)],
    });
    await fs.writeFile(destFile, output.css, 'utf8');
  } catch (err) {
    console.error('[less compile]: %s is ERROR', file);
    console.error('[less compile]: %s', err.message);
    console.error(err);
    process.exit(1);
  }
}
