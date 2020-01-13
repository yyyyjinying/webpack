const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    compress: true,
    port: 9000
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".js", ".json"]
  },
  module: {
    rules: []
  },
  plugins: []
})