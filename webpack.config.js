var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test : /\.(js)$/, use: 'babel-loader' }, //use babel loader for all js files
            { test: /\.css$/, use : ['style-loader', 'css-loader'] }
        ]
    },
    devServer:{
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin ({
        template: 'app/index.html'
    })]
}