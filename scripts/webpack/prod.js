import path from 'path';
import webpackMerge from 'webpack-merge';
import baseConfig from './base';

const cwd = process.cwd();
const release = path.resolve(cwd, 'release');

export default webpackMerge(baseConfig, {
  mode: 'production',
  output: {
    path: release,
    library: 'magot',
    libraryTarget: 'umd',
    pathinfo: false,
  },
  plugins: [],
});
