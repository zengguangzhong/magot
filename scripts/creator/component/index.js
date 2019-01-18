import fs from 'fs';
import path from 'path';
import tpl_component from './templates/component';
import tpl_demo from './templates/demo';
import tpl_doc from './templates/doc';
import tpl_index from './templates/index';
import tpl_less from './templates/less';

const templateVar = /(\$\{(.+?)\})/g;
const templates = [tpl_index, tpl_component, tpl_less, tpl_demo, tpl_doc];

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

templates.forEach(tpl => createFile(tpl.filename, tpl.code));

const exp = path.join(src, '../index.ts');
const expCode = `export { default as ${name} } from './components/${name}';\n`;
fs.appendFileSync(exp, expCode, 'utf8');

function createFile(file, code) {
  const compileData = { name };
  const p = path.join(dest, render(file, compileData));
  const data = render(code, compileData);
  fs.writeFileSync(p, data, 'utf8');
}

/**
 * @param {string} tpl
 * @param {Object} data
 * @returns {string}
 */
function render(tpl, data) {
  const variables = [];
  let match = null;
  while ((match = templateVar.exec(tpl))) {
    variables.push({
      group: match[1],
      variable: match[2],
    });
  }
  if (!variables.length) return tpl;
  for (const v of variables) {
    tpl = tpl.replace(v.group, data[v.variable]);
  }
  return tpl;
}
