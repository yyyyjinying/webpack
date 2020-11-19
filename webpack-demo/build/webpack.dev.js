/* eslint-disable no-undef */
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(
  {
    entry: {
      home: "./src/index.jsx",
      // home: "./src/index.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist"),
      // library: "[name]",
      // libraryTarget: "var", // commonjs cmd
      // publicPath: "http://baidu.com",
    },
    mode: "development", //"production",//"development", // 开发模式
    devServer: {
      // outputPath: path.join(__dirname, 'build')
      contentBase: path.resolve(__dirname, "../dist"),
      index: "home.html",
      // openPage: "home.html",
      open: true,
      port: 9089,
      compress: true,
      host: "0.0.0.0",
      hot: true,
      watchOptions: {
        ignored: /node_modules/, // 监听过多文件会占用cpu、内存，so，可以忽略掉部分文件
        aggregateTimeout: 200, // 默认200，文件变更后延时多久rebuild
        poll: false, // 默认false，如果不采用watch，那么可以采用poll（轮询）
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "webpack-test",
        template: "./src/index.html",
        filename: "home.html",
        chunks: ["home"],
        // minify: {
        //   removeEmptyAttributes: true,
        //   collapseWhitespace: true,
        // },
        // hash: true,
      }),
    ],
  },
  common
);
