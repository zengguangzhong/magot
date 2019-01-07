export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 9', '> 0.25%'],
        },
        modules: false,
        useBuiltIns: 'usage',
        debug: process.env.NODE_ENV === 'development',
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
  ],
  env: {
    production: {
      plugins: [['transform-react-remove-prop-types', { removeImport: true }]],
    },
  },
};
