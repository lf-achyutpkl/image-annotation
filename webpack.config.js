var webpack = require('webpack');

var path = require('path');
var APP_PATH = path.resolve(__dirname, 'lib');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            APP_PATH + "/index.js"
        ]
    },
    output: {
        path: path.resolve(__dirname, 'examples/dist'),
        filename: "app.js"
    },
    devServer: {
        contentBase: './examples',
        inline: true,
        hot: true,
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            }
        ]
    },
    plugins: []
};