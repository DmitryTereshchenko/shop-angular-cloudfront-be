const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: slsw.lib.entries,
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.json', '.js', '.ts'],
  },
  mode: 'development',
  target: 'node',
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: __dirname,
        use: 'ts-loader'
      },
    ],
  },
};
