const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        // app: './src/index.js',
        // print: './src/js/print.js'
        app: './src/js/test.ts'
    },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map', // 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    // new CleanWebpackPlugin({protectWebpackAssets: ['dist']}),
    new HtmlWebpackPlugin({
        title: 'HMR'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // mode: "production",
  module: {
    rules: [
        // {
        //   // include: path.resolve("src/js"),   有疑问
        //   sideEffects: true
        // },
        { 
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "awesome-typescript-loader"
              }
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
              'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
              'xml-loader'
            ]
        }
    ]
 }
};