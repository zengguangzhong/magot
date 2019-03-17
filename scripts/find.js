import glob from 'glob';

/**
 * find specified files by glob pattern
 *
 * @export
 * @param {*} src
 * @param {*} pattern
 * @returns
 */
export default function find(src, pattern) {
  return glob.sync(pattern, { cwd: src, absolute: true });
}
