/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
// const common = require("./webpack.my.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(
  {},
  {
    entry: {

      react: ["react", "react-dom"],

      home: "./src/index.jsx",
      // home: "./src/index.js",
      other: "./src/other.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist"),
      library: "[name]",
      libraryTarget: "var", // commonjs cmd
      // publicPath: "http://baidu.com",
    },
    mode: "production", //"production",//"development", // 开发模式
    resolve: {
      alias: {},
      // mainFields: ["main","style"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"], // 简化文件路径的引用
      modules: ["node_modules"],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          // 压缩js 必须先es6-> es5转化否则无法执行 @babel/preset-env
          sourceMap: true,
          cache: true, // 缓存
          parallel: true,
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
        new OptimizeCSSAssetsPlugin(), // 压缩css
      ],
    },
    plugins: [
      new CleanWebpackPlugin({ protectWebpackAssets: ["dist"] }),
      new CopyPlugin({
        patterns: [
          // {
          //   from: path.resolve(__dirname, "./manifest"),
          //   to: path.resolve(__dirname, "../dist/manifest"),
          // },  
          {
            from: path.resolve(__dirname, "../src/doc"),
            to: path.resolve(__dirname, "../dist/doc"),
          },
        ],
      }),
      // new webpack.DllReferencePlugin({
      //   manifest: path.resolve(__dirname, "../dist/manifest", "manifest.json"),
      // }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.BannerPlugin({ // 版权
        banner: "hello world",
      }),
      new webpack.DefinePlugin({ // 自定义常量
        ENV: JSON.stringify("production"),
      }),

      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
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
      new HtmlWebpackPlugin({
        title: "webpack-test",
        template: "./src/index.html",
        filename: "other.html",
        chunks: ["home", "other"],
        // minify: {
        //   removeEmptyAttributes: true,
        //   collapseWhitespace: true,
        // },
        // hash: true,
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
            //   {
            //     loader: "style-loader",
            //     options: {
            //       insert: function(element) { // // 将css插入head 可以指定位置
            //           var parent = document.querySelector('head');
            //           parent.insertBefore(element, parent.firstChild);
            //       }
            //     }
            //  },
            {
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
            //   {
            //     loader: "style-loader",
            //     options: {
            //       insert: function(element) { // // 将css插入head 可以指定位置
            //           var parent = document.querySelector('head');
            //           parent.insertBefore(element, parent.firstChild);
            //       }
            //     }
            //  },
            {
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
  }
);
