/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
// const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(
  {},
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
    resolve: {
      alias: {},
      // mainFields: ["main","style"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"], // 简化文件路径的引用
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
      new webpack.BannerPlugin({
        banner: "hello world",
      }),
      new webpack.DefinePlugin({
        // 自定义常量
        ENV: JSON.stringify("development"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../src/public"),
            to: path.resolve(__dirname, "../dist/public"),
          },
        ],
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*", "!manifest", "!manifest/*"], // **/* 删除所有文件 ！不删除
      }),
    ],
    module: {
      noParse: /jquery/, //不去解析jquery中的依赖库
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|pdf|png|svg|jpg|gif|jpeg)$/,
          exclude: /node_modules/,
          use: {
            loader: "url-loader",
            options: {
              limit: 1,
              outputPath: "img/",
              // publicPath: "http://baidu.com/img",
            },
          },
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                // @babel/preset-env 将es6转化为es5
                presets: ["@babel/preset-react", "@babel/preset-env"],
                plugins: [
                  ["@babel/plugin-proposal-decorators", { legacy: true }],
                  ["@babel/plugin-proposal-class-properties", { loose: true }],
                  ["@babel/plugin-transform-runtime"],
                ],
              },
            },
            {
              loader: "eslint-loader",
            },
          ],
          enforce: "pre", // 编译前检查
          exclude: /node_modules/, // 不检测的文件
          include: [path.resolve(__dirname, "../src")], // 指定检查的目录
        },
        {
          test: /\.css$/,
          use: [
            // 顺序问题 先右后左 先下后上
            {
              loader: "style-loader",
              options: {
                insert: function(element) {
                  // // 将css插入head 可以指定位置
                  var parent = document.querySelector("head");
                  parent.insertBefore(element, parent.firstChild);
                },
              },
            },
            {
              loader: "css-loader", // @import 语法
            },
            {
              loader: "postcss-loader", // 补充前缀浏览器兼容问题
              options: {
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")(),
                  require("cssnano")(),
                ],
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            // 顺序问题 先右后左 先下后上
            {
              loader: "style-loader",
              options: {
                insert: function(element) {
                  // // 将css插入head 可以指定位置
                  var parent = document.querySelector("head");
                  parent.insertBefore(element, parent.firstChild);
                },
              },
            },
            {
              loader: "css-loader", // @import 语法
            },
            {
              loader: "postcss-loader",
              options: {
                parser: "postcss-less",
                syntax: "postcss-less",
                ident: "postcss",
                plugins: loader => [
                  require("postcss-import")({ root: loader.resourcePath }),
                  require("autoprefixer")(),
                  require("cssnano")(),
                ],
              },
            },
            {
              loader: "less-loader", // less -> css
              options: {
                javascriptEnabled: true, // 解决less混入
              },
            },
          ],
        },
      ],
    },
  }
);
