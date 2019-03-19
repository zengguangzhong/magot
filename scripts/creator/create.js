import fs from 'fs';
import path from 'path';

const templateVar = /(\$\{(.+?)\})/g;

export function createFile(dir, file, code, name) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const compileData = { name, type: toKebabCase(name) };
  const p = path.join(dir, render(file, compileData));
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

/**
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
  const lower = m => m.toLowerCase();
  return str.replace(/^[A-Z]/, lower).replace(/[A-Z]/g, m => '-' + lower(m));
}
