const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const pxtorem = require('postcss-pxtorem');

const postcssPlugins = (loader) => {
  let arr = [require('postcss-import')({ root: loader.resourcePath }), require('autoprefixer')(), require('cssnano')()];
  process.env.clientType === 'iPhone' &&
    arr.push(
      pxtorem({
        rootValue: 16, //表示根元素html的fontSize值,也可以是100,获取任意其他值
        propList: ['*'], //设置px转换成rem的属性值，*表示所有属性的px转换为rem
      }),
    );
  return arr;
};

const cssLoader = () => {
  return process.env.NODE_ENV === 'development'
    ? {
        loader: 'style-loader',
      }
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
        },
      };
};

let config = {
  entry: {},
  output: {},
  resolve: {
    alias: {},
    // mainFields: ["main","style"],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less', '.css'], // 简化文件路径的引用
    modules: ['node_modules'],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.BannerPlugin({
      banner: 'hello world',
    }),
    new webpack.DefinePlugin({
      // 自定义常量
      ENV: JSON.stringify('development'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/public'),
          to: path.resolve(__dirname, '../dist/public'),
        },
      ],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!manifest', '!manifest/*'], // **/* 删除所有文件 ！不删除
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
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // @babel/preset-env 将es6转化为es5
              presets: ['@babel/typescript', '@babel/preset-react', '@babel/preset-env'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-transform-runtime'],
                // ['@babel/proposal-class-properties'],
                ['@babel/proposal-object-rest-spread'],
              ],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
        enforce: 'pre', // 编译前检查
        exclude: /node_modules/, // 不检测的文件
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|pdf|png|svg|jpg|gif|jpeg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024, // 5kb
            name: '[name].[ext]',
            outputPath: 'img/',
            // publicPath: "http://baidu.com/img",
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          cssLoader(),
          {
            loader: 'css-loader', // @import 语法
          },
          {
            loader: 'postcss-loader', // 补充前缀浏览器兼容问题
            options: {
              ident: 'postcss',
              plugins: postcssPlugins,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          cssLoader(),
          {
            loader: 'css-loader', // @import 语法
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-less',
              syntax: 'postcss-less',
              ident: 'postcss',
              plugins: postcssPlugins,
            },
          },
          {
            loader: 'less-loader', // less -> css
            options: {
              javascriptEnabled: true, // 解决less混入
            },
          },
        ],
      },
    ],
  },
};

process.env.NODE_ENV === 'production' &&
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  );

module.exports = config;
