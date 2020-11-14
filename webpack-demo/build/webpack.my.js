// const webpack = require("webpack");
// const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {},
  output: {},
  plugins: [
    // new webpack.BannerPlugin({
    //   banner: "hello world",
    // }),
    // new webpack.DefinePlugin({
    //   // 自定义常量
    //   ENV: JSON.stringify("development"),
    // }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../src/public"),
    //       to: path.resolve(__dirname, "../dist/public"),
    //     },
    //   ],
    // }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ["**/*", "!manifest", "!manifest/*"], // **/* 删除所有文件 ！不删除
    // }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  module: {
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
        test: /\.css$/,
        use: [
          // 顺序问题 先右后左 先下后上
          process.env.NODE_ENV === "development"
            ? {
                loader: "style-loader",
                options: {
                  insert: function(element) {
                    // // 将css插入head 可以指定位置
                    var parent = document.querySelector("head");
                    parent.insertBefore(element, parent.firstChild);
                  },
                },
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../",
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
          process.env.NODE_ENV === "development"
            ? {
                loader: "style-loader",
                options: {
                  insert: function(element) {
                    // // 将css插入head 可以指定位置
                    var parent = document.querySelector("head");
                    parent.insertBefore(element, parent.firstChild);
                  },
                },
              }
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../",
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
};
