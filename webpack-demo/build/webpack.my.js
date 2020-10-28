const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    home: "./src/index.js",
    other: "./src/other.js",
  },
  // entry: ["./src/index.jsx"],
  // entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"), // 必须是一个绝对路径
    // publicPath: "http://baidu.com",
  },
  // devtool: "source-map", // eval
  mode: "development", //"production",//"development", // 开发模式
  devServer: {
    // outputPath: path.join(__dirname, 'build')
    contentBase: path.resolve(__dirname, "../dist"),
    index: "home.html",
    // openPage: "home.html",
    open: true,
    port: 9080,
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
      // new CopyWebpackPlugin([
      //   {
      //     from: __dirname + "/src/components",
      //     to: __dirname + "/dist",
      //     ignore: [".*"],
      //   },
      // ]),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ protectWebpackAssets: ["dist"] }),
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
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"], // 简化文件路径的引用
  },
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
              presets: ["@babel/preset-env"],
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
