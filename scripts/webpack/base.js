import path from 'path';
import webpack from 'webpack';

const cwd = process.cwd();
const source = path.resolve(cwd, 'src');
const __DEV__ = process.env.NODE_ENV === 'development';
const babelrc = path.resolve(__dirname, '../babelrc.js');

/**
 * @type {webpack.Configuration}
 */
const config = {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    modules: ['node_modules', source],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // '@': source,
    },
  },
  target: 'web',
  profile: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: __DEV__,
              configFile: babelrc,
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: __DEV__,
              configFile: babelrc,
              babelrc: false,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
                esModuleInterop: false,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
    }),
  ],
  stats: {
    children: false,
    timings: true,
  },
};

export default config;
