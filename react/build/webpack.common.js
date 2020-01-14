const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map', // 打包后是否可以定位bug
  plugins: [
    new CleanWebpackPlugin({protectWebpackAssets: ['dist']}),
    new HtmlWebpackPlugin({
        title: 'react',
        template:'./src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx','.ts','.tsx', '.scss','.json','.css']
  },
  module: {
    rules: [     
        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            ]
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            exclude: /node_modules/,
            use: [
              'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude: /node_modules/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            exclude: /node_modules/,
            use: [
              'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            exclude: /node_modules/,
            use: [
              'xml-loader'
            ]
        }
    ]
  }
};