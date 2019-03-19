import fs from 'fs';
import path from 'path';
import { createFile } from '../create';
import tpl_component from './templates/component';
import tpl_demo from './templates/demo';
import tpl_doc from './templates/doc';
import tpl_index from './templates/index';
import tpl_less from './templates/less';
import tpl_test from './templates/test';

const templates = [
  tpl_index,
  tpl_component,
  tpl_less,
  tpl_demo,
  tpl_doc,
  tpl_test,
];

const name = process.argv[2];

if (!name) {
  console.error('请输入组件名');
  process.exit(1);
}

const src = path.resolve(__dirname, '../../../src/components');
const dest = path.join(src, name);

if (fs.existsSync(dest)) {
  console.error('该组件已存在');
  process.exit(1);
}

fs.mkdirSync(dest);

templates.forEach(tpl => {
  const dir = tpl.dir ? path.join(dest, tpl.dir) : dest;
  createFile(dir, tpl.filename, tpl.code, name);
});

const exp = path.join(src, '../index.ts');
const expCode = `export { default as ${name} } from './components/${name}';\n`;
fs.appendFileSync(exp, expCode, 'utf8');
