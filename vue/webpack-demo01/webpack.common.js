const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // app: './src/index.js',
    // print: './src/js/print.js'
    common: './src/index.js'
  },
  devtool: 'inline-source-map', // 打包后是否可以定位bug
  plugins: [
    new CleanWebpackPlugin({protectWebpackAssets: ['dist']}),
    new HtmlWebpackPlugin({
        title: 'HMR22'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify("dddddd"),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object")
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
        // {
        //   // include: path.resolve("src/js"),   有疑问
        //   sideEffects: true
        // },
        {
          test: /\.(js|ts)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { 
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: "awesome-typescript-loader"
              }
          ]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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