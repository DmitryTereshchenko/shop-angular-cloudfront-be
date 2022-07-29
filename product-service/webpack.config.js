const slsw = require('serverless-webpack');

module.exports = {
  context: __dirname,
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.json', '.js', '.ts'],
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use:  'babel-loader'
      },
      {
        test: /\.ts$/,
        include: __dirname,
        use: 'ts-loader'
      },
    ],
  },
};
