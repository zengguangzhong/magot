import MIMETYPE from './mimetype';

export function checkFileSize(file: File, maxSize: number, minSize = 0) {
  const size = file.size / 1024;
  return size >= minSize && size <= maxSize;
}

export function checkFileType(file: File, types: string[]) {
  if (types.indexOf('*') > -1) return true;

  let type = file.type;
  if (!type) type = getFileTypeByExt(file);
  if (!type) return false;

  for (const t of types) {
    if (t === type) return true;
    const ts = t.split('/');
    if (ts[1] === '*' && type.split('/')[0] === ts[0]) return true;
  }
  return false;
}

export function getFileTypeByExt(file: File) {
  return MIMETYPE[getFileExt(file)] || '';
}

export function getFileExt(file: File) {
  const ts = file.name.split('.');
  return (ts[ts.length - 1] || '').toLowerCase();
}
