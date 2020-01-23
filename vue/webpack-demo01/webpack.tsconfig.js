const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        ts: './src/js/test.ts'
    },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map', // 打包后是否可以定位bug
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new CleanWebpackPlugin({protectWebpackAssets: ['dist']}),
    new HtmlWebpackPlugin({
        title: 'HMR22'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
        // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
            test: /\.css$/,
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