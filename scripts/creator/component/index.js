import fs from 'fs';
import path from 'path';
import { createFile } from '../create';
import componentTpl from './templates/component';
import demoTpl from './templates/demo';
import docTpl from './templates/doc';
import indexTpl from './templates/index';
import lessTpl from './templates/less';
import testTpl from './templates/test';

const templates = [indexTpl, componentTpl, lessTpl, demoTpl, docTpl, testTpl];

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
