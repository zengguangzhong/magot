import path from 'path';
import webpackMerge from 'webpack-merge';
import baseConfig from './base';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const cwd = process.cwd();
const release = path.resolve(cwd, 'release');

export default webpackMerge(baseConfig, {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  output: {
    path: release,
    filename: '[name].[hash:10].js',
    chunkFilename: '[name].[hash:10].chunk.js',
    library: 'magot',
    libraryTarget: 'umd',
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            warnings: false,
            // eslint-disable-next-line @typescript-eslint/camelcase
            drop_console: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].[hash:10].css',
      chunkFilename: '[id].[hash:10].css',
    }),
  ],
});
