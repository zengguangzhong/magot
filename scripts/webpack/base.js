import path from 'path';
import webpack from 'webpack';
import babelrc from './babelrc';

const cwd = process.cwd();
const source = path.resolve(cwd, 'src');
const __DEV__ = process.env.NODE_ENV === 'development';

/**
 * @type {webpack.Configuration}
 */
const config = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    modules: ['node_modules', source],
    extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    alias: {
      // '@': source,
    },
  },
  target: 'web',
  profile: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: __DEV__,
              ...babelrc,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ __DEV__ })],
};

export default config;
