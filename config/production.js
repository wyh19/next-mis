/**
 * Created by 30113 on 2018/6/5.
 */
let config = require('./base.js')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

config.mode = 'production'
config.devtool=false

config.plugins.push(new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),
    verbose: true
}))
config.plugins.push(new webpack.DefinePlugin({
    'USE_MOCK':true
}))

module.exports = config