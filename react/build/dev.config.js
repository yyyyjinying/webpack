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
    host: "0.0.0.0",
    headers: {
      "X-foo": "112233",
    },
    overlay: true,
    stats: "errors-only",
    proxy: {
      "/api": {
        target: "http://news.baidu.com", // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/api": "", // 重写路径
        },
      },
      "/origin": {
        target: "http://localhost:3045/", // 目标接口的域名
        // secure: true,  // https 的时候 使用该参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/origin": "", // 重写路径
        },
      },
    },
    historyApiFallback: {
      // 使用正则来匹配路由
      rewrites: [
        { from: /^\/user/, to: "/index.html" },
        { from: /^\/home/, to: "/home.html" },
      ],
    },
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".json",
      ".scss",
      ".less",
      ".css",
    ],
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
      
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.ROOT_URL": JSON.stringify("http://localhost:3030"),
      "process.env.MOCK_URL": JSON.stringify("https://easy-mock.com"),
    }),
  ],
});
