const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// 不要妄想用import代替requrie
// production模式下，less文件在index.js中必须用requrie引入

const commonCssLoader = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../'
    }
}, 'css-loader', {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => [require('postcss-preset-env')()]
    }
}];

process.env.NODE_ENV = 'production';

module.exports = {
    entry: {
        'main':'./index.js'
    },
    output: {
        filename: 'js/bundle.[hash:5].js',
        path: resolve('dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: 'pre',
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            }]
        }, {
            oneOf: [{
                test: /\.css$/,
                use: [...commonCssLoader]
            }, {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            }, {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8 * 1024,
                        esModule: false,
                        name: 'img_[hash:5].[ext]',
                        outputPath: 'images'
                    }
                }]
            }, {
                test: /\.html$/,
                use: ['html-loader']
            }, {
                exclude: /\.(jpg|jpeg|png|gif|html|css|js|less)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'media_[hash:5].[ext]',
                        outputPath: 'media'
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }]
                        ],
                        cacheDirectory: true
                    }
                }]
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/css_[contenthash:5].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest: resolve('dll/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve('dll/lib.js')
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: resolve('dist'),
        compress: true,
        port: 3000,
        open: true,
        hot: true
    },
    devtool: 'eval-source-map',
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            // 只给出js与css文件的性能提示
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    }
}