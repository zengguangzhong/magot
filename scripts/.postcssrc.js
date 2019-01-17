import path from 'path';

const cwd = process.cwd();
const source = path.resolve(cwd, 'src');

module.exports = {
  plugins: [
    require('postcss-import')({ path: source }),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-cssnext')({
      features: { customProperties: false },
      warnForDuplicates: false,
    }),
    require('postcss-reporter')({ clearMessages: true }),
    require('cssnano')({
      colormin: { legacy: true },
      core: false,
      zindex: false,
      reduceIdents: false,
      mergeIdents: false,
      discardUnused: { keyframes: false },
    }),
  ],
};
