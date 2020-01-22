/* eslint-disable no-undef */
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: "./src/index.jsx",
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
  mode: "production",
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".json", ".scss", "css"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      component: path.resolve(__dirname, "../src/component"),
      utils: path.resolve(__dirname, "../src/utils"),
    },
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            // options: {
            //   importLoaders: 1,
            //   modules: true,
            //   localIndexName: "[name]__[local]___[hash:base64:5]", //配置class的名字
            // },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("autoprefixer")({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9", // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009",
                }),
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
});