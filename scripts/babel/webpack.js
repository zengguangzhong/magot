const DEBUG = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: !DEBUG ? 'usage' : false,
        corejs: 3,
        debug: DEBUG,
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [['@babel/plugin-syntax-dynamic-import']],
  env: {
    production: {
      plugins: [['transform-react-remove-prop-types', { removeImport: true }]],
    },
  },
};
