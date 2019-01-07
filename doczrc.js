import { css } from 'docz-plugin-css';

export default {
  src: './src',
  title: 'Magot',
  description:
    'A cool and easy UI framework of customizable themes and React-based.',
  indexHtml: './docs/docz.html',
  typescript: true,
  plugins: [
    css({
      preprocessor: 'less',
      cssmodules: true,
    }),
  ],
};
