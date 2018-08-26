/**
 * Created by 30113 on 2018/6/5.
 */
const webpack = require('webpack')
const path = require('path')
let config = require('./base.js')

config.mode = 'development'
config.devServer = {
    host: 'localhost',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
        errors: true
    },
    open:true,
    historyApiFallback:true,
    proxy:{
        '/api':{
            target: 'http://localhost:9093',
            pathRewrite: {'^/api' : ''}
        }
    }
}
config.devtool = 'cheap-module-source-map'
//样式热替换必须使用style-loader
config.module.rules[1].use[0] = {
    loader:'style-loader'
}
config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new webpack.NamedModulesPlugin())
config.plugins.push(new webpack.DefinePlugin({
    'USE_MOCK':true
}))

module.exports = config