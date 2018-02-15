var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.resolve(__dirname, 'client/build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, '/client/'),
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
