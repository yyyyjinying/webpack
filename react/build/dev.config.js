/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "inline-source-map", // 打包后是否可以定位bug
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    open: true,
    hot: true,
    compress: true,
    port: 3030,
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".json", ".scss", "css"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      component: path.resolve(__dirname, "../src/component"),
      mock: path.resolve(__dirname, "../src/mock"),
      utils: path.resolve(__dirname, "../src/utils"),
    },
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "eslint-loader",
          },
        ],
        enforce: "pre", // 编译前检查
        exclude: /node_modules/, // 不检测的文件
        include: [path.resolve(__dirname, "../src")], // 指定检查的目录
        // options: {
        // emitError: true,
        // formatter: "stylish"
        //   formatter: require("eslint-friendly-formatter") // community formatter
        // }
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ROOT_URL': JSON.stringify("http://localhost:3030"),
    })
  ],
});
