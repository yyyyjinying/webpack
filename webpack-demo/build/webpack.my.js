const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
      app: "./src/index.jsx",
    },
    output: {
      filename: "bundle.[hash:8].js",
      path: path.resolve(__dirname, "../dist"), // 必须是一个绝对路径
    },
    mode: "production",//"development", // 开发模式 
    devServer: {
      contentBase: path.resolve(__dirname, "../dist"),
      open: true,
      port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack-test",
            template: "./src/index.html",
            filename: "index.html",
            minify: {
                removeEmptyAttributes: true,
                collapseWhitespace: true,
            },
            hash: true 
        }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"],// 简化文件路径的引用
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: "babel-loader",
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
          use: [ // 顺序问题 先右后左 先下后上
            { 
              loader: "style-loader",
              options: {
                insert: function(element) { // // 将css插入head 可以指定位置
                    var parent = document.querySelector('head');
                    parent.insertBefore(element, parent.firstChild);
                }
              }
           },
            {
              loader: "css-loader", // @import 语法 
            },
            {
              loader: "postcss-loader", // 补充前缀浏览器兼容问题
              options: {
                ident: "postcss",
                plugins: (loader) => [
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
          use: [ // 顺序问题 先右后左 先下后上
            { 
              loader: "style-loader",
              options: {
                insert: function(element) { // // 将css插入head 可以指定位置
                    var parent = document.querySelector('head');
                    parent.insertBefore(element, parent.firstChild);
                }
              }
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
      ]
    }
  };