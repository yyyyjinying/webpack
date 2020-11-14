/* eslint-disable no-undef */
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.my.js");
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
      port: 9080,
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
