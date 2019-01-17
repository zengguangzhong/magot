import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './base';

const cwd = process.cwd();
const demo = path.resolve(cwd, 'demo');

export default webpackMerge(baseConfig, {
  mode: 'development',
  entry: './demo/index.jsx',
  output: {
    path: demo,
    publicPath: '',
    sourceMapFilename: 'sourcemaps/[file].map',
    pathinfo: true,
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    port: 36500,
    contentBase: demo,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(cwd, 'demo/index.html'),
    }),
  ],
});
