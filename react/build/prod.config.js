/* eslint-disable no-undef */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: './src/index.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        // test: /\.js(\?.*)?$/i,  //测试匹配文件,
        // include: /\/includes/, //包含哪些文件
        // excluce: /\/excludes/, //不包含哪些文件
        // //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。 
        // //返回true以uglify块，否则返回false。
        chunkFilter: (chunk) => {
          // `vendor` 模块不压缩
          if (chunk.name === 'vendor') {
            return false;
          }
          return true;
        }
      })  
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts", ".json", ".scss", "css"],
    alias: {
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      utils: path.resolve(__dirname, '../src/utils'),
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
              loader: "babel-loader"
            }
        ]
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   use:[
      //       {
      //         loader: 'eslint-loader'
      //       }
      //   ],
      //   enforce: "pre", // 编译前检查
      //   exclude: /node_modules/, // 不检测的文件
      //   include: [path.resolve(__dirname, '../src')], // 指定检查的目录
      //   options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
      //       formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      //   }
      // }
    ]
  },
  plugins: []
})