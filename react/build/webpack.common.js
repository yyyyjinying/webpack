/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map", // 打包后是否可以定位bug
  plugins: [
    new CleanWebpackPlugin({ protectWebpackAssets: ["dist"] }),
    new HtmlWebpackPlugin({
      title: "react",
      template: "./src/index.html",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"],
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
        // options: {
        // emitError: true,
        // formatter: "stylish"
        //   formatter: require("eslint-friendly-formatter") // community formatter
        // }
      },
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery",
          },
          {
            loader: "expose-loader",
            options: "$",
          },
        ],
      },
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
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')(),
                require('autoprefixer')({browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8']}),
                require('cssnano')()
              ]
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              parser: "postcss-less",
              syntax: "postcss-less",
              ident: "postcss",
              plugins: loader => [
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
                require("postcss-import")({ root: loader.resourcePath }),
                require("cssnano")(),
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
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
      {
        test: /\.(csv|tsv)$/,
        exclude: /node_modules/,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/,
        exclude: /node_modules/,
        use: ["xml-loader"],
      },
    ],
  },
};
