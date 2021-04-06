const {
    resolve
} = require('path');
const webpack = require('webpack');

const vendors = ['jquery'];

module.exports = {
    entry: {
        lib: vendors
    },
    output: {
        filename: '[name].js',
        path: resolve('dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: resolve('dll/manifest.json')
        })
    ],
    mode:'production'
}