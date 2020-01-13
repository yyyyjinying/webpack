const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: {
        app: './src/index.js'
    },
    devtool: 'source-map',
    mode: "production",
    // plugins: [
    //     new UglifyJsPlugin({
    //         sourceMap: true
    //     })
    // ]
});