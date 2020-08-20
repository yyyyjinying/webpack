/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  entry: {
    app: "./src/index.jsx",
    table1: "./src/component/autoTable/table01/index.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        // test: /\.js(\?.*)?$/i,  //测试匹配文件,
        // include: /\/includes/, //包含哪些文件
        // excluce: /\/excludes/, //不包含哪些文件
        // //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
        // //返回true以uglify块，否则返回false。
        chunkFilter: chunk => {
          // `vendor` 模块不压缩
          if (chunk.name === "vendor") {
            return false;
          }
          return true;
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: "eval",
  mode: "production",
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".json", ".scss", "css"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      component: path.resolve(__dirname, "../src/component"),
      common: path.resolve(__dirname, "../src/common"),
      utils: path.resolve(__dirname, "../src/common/utils"),
      style: path.resolve(__dirname, "../src/common/style"),
      mock: path.resolve(__dirname, "../src/mock"),
    },
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("postcss-flexbugs-fixes"),
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-cssnext")(), // css
                require("autoprefixer")(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              parser: "postcss-less", // less
              syntax: "postcss-less", // less
              ident: "postcss",
              plugins: loader => [
                require("postcss-flexbugs-fixes"),
                require("postcss-import")({ root: loader.resourcePath }),
                require("autoprefixer")(),
              ],
            },
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      NODE_ENV: "production",
    }),
  ],
});
