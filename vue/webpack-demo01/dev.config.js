const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    app: './src/js/greeter'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})