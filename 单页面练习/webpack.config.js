const {
    reslove,
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

const commonCssLoader = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../'
    }
}, 'css-laoder', {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: () => {
            require('postcss-preset-env')()
        }
    }
}];

const config = {
    entry: './main.js',
    output: {
        filename: 'js/bundle.[contenthash:5].js',
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
        }]
    }
}