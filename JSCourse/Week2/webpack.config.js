var path = require('path');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');

var config = {
    entry: './src',               // entry point
    output: {                     // output folder
        path: './dist',           // folder path
        filename: 'maze-app.js'     // file name
    },
    resolve: {
        root: [SRC, NODE_MODULES],                  // root folders for Webpack resolving, so we can now call require('greet')
        alias: {
        'actions': path.join(SRC, 'actions/'),    // sample alias, calling require('actions/file') will resolve to ./src/actions/file.js
        }   
    },
    module: {
    loaders: [
        {
            test: /\.js$/,
            loaders: ['babel']      // note that specifying 'babel' or 'babel-loader' is equivalent for Webpack
        },
        {
            test: /\.css$/,
            loaders: ['style', 'css'] // Note that the order is important here, it means that 'style-loader' will be applied to the ouput of 'css-loader'
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file?name=public/images/[name].[ext]'
        }
        ]
    }
}
module.exports = config;