/**
 * Created by 30113 on 2018/6/5.
 */
let config = require('./base.js')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

config.mode = 'production'

config.plugins.push(new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),
    verbose: true
}))

module.exports = config