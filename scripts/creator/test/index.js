import fs from 'fs';
import path from 'path';
import tpl from '../component/templates/test';
import { createFile } from '../create';

const name = process.argv[2];

if (!name) {
  console.error('请输入组件名');
  process.exit(1);
}

const src = path.resolve(__dirname, '../../../src/components');
const componentDir = path.join(src, name);

if (!fs.existsSync(componentDir)) {
  console.error('该组件不存在');
  process.exit(1);
}

const dir = path.join(componentDir, tpl.dir);
createFile(dir, tpl.filename, tpl.code, name);
