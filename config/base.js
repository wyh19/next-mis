/**
 * Created by 30113 on 2018/6/5.
 */
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

let config = {
    entry: {
        app: path.join(__dirname, '../src/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: "[name].[hash].js"
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['env'], "stage-0", 'react'],
                    plugins: [
                        'react-hot-loader/babel',
                        "syntax-dynamic-import",
                        'transform-decorators-legacy',
                        'lodash',
                        [
                            "import",
                            {
                                "libraryName": "antd",
                                "style": "css"
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.s?css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: 'resolve-url-loader'
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: [path.resolve(__dirname, '../node_modules/compass-mixins/lib')]
                    }
                }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 5,
                        fallback: 'file-loader',
                        name: '[name]-[hash].[ext]',
                        outputPath: 'image'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)\??.*$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'font'
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css"
        }),
        new LodashModuleReplacementPlugin(),
    ],
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "../src")
        ],
        extensions: [".js", ".jsx"],
    },
}

module.exports = config