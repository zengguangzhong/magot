import pkg from './package.json';
import { css } from 'docz-plugin-css';

export default {
  src: './src',
  dest: './docs/docz',
  title: pkg.name,
  description: pkg.description,
  indexHtml: './docs/docz.html',
  typescript: true,
  codeSandbox: false,
  themeConfig: {
    // mode: 'dark',
    styles: getThemeStyles(),
  },
  plugins: getPlugins(),
  menu: getMenuList(),
};

function getMenuList() {
  return [
    'Introduction',
    'Components',
    {
      name: 'Github',
      href: 'https://github.com/billjs/magot',
    },
  ];
}

function getPlugins() {
  return [css({ preprocessor: 'less' })];
}

function getThemeStyles() {
  return {
    body: {
      fontFamily:
        "'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSize: 14,
    },
    h1: {
      fontFamily: 'none',
      fontSize: 30,
    },
    h2: {
      fontFamily: 'none',
      fontSize: 24,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 14,
    },
    h6: {
      fontSize: 14,
    },
    paragraph: {
      fontSize: 14,
    },
    table: {
      fontFamily: 'none',
      fontSize: 12,
    },
    pre: {
      fontSize: 12,
    },
    blockquote: {
      fontSize: 14,
    },
  };
}
