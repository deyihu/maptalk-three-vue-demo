module.exports = {
    // 选项...
    configureWebpack: {
        externals: {
            maptalks: 'maptalks',
            three: 'THREE',
            'stats.js': 'Stats',
            'dat.gui': 'dat'
        }
    }
}