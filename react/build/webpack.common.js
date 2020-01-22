/* eslint-disable no-undef */
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
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json", ".css"],
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
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // modules: true,
              // localIndexName: "[name]__[local]__[hash:base64:5]", //配置class的名字
            },
          },
          {
            loader: "postcss-loader",
            options: {
              parser: 'postcss-less',
              syntax: "postcss-less",
              ident: "postcss",
              plugins: (loader) => [
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
                require('postcss-import')({ root: loader.resourcePath }),
                require('cssnano')()
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
