const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    // 选项...
    configureWebpack: {
        externals: {
            maptalks: 'maptalks',
            three: 'THREE',
            'stats.js': 'Stats',
            'dat.gui': 'dat',
            'lz-string': 'LZString'
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/assets'), to: path.join(__dirname, './dist/assets') }
            ])
        ]
    }
}