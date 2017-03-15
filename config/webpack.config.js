const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

/*
 * Webpack Constants
 */
const METADATA = {
  baseUrl: '/',
};

module.exports = {
  devtool: 'cheap-module-source-map',

  target: 'node',
  // externals: helpers.nodeModules,
  externals: {
    'electron': 'commonjs electron',
  },

  entry: {
    'app-main': './src/mycounter/app/main.ts',
    'counter-window-renderer': './src/mycounter/counter-window/renderer.ts',
  },

  output: {
      path: helpers.root('bundles'),
      filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css', '.html'],
    modules: [helpers.root('src'), helpers.root('node_modules')],
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader?configFileName=' + path.join('.', 'src', 'tsconfig.json'),
      },
      { test: /\.s?css$/, loader: 'css-to-string-loader!css-loader!sass-loader' },
      { test: /\.html?$/, loader: 'html-loader' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(txt|proto)$/, loader: 'raw-loader'}
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CheckerPlugin(),
  ],
};
