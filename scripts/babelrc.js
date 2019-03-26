export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        debug: process.env.NODE_ENV === 'development',
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
