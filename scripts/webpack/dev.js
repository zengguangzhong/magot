import path from 'path';
import webpackMerge from 'webpack-merge';
import baseConfig from './base';

const cwd = process.cwd();
const dev = path.resolve(cwd, 'dev');

export default webpackMerge(baseConfig, {
  mode: 'development',
  output: {
    path: dev,
    publicPath: '',
    sourceMapFilename: 'sourcemaps/[file].map',
    pathinfo: true,
  },
  devServer: {
    hot: true,
    port: 36500,
    contentBase: dev,
  },
  plugins: [],
});
