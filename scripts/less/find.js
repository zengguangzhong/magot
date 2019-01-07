// find all less files

import glob from 'glob';

const pattern = '**/*.less';

export default function find(src) {
  return glob.sync(pattern, { cwd: src, absolute: true });
}
