module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        ignoreBrowserslistConfig: true,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
};
