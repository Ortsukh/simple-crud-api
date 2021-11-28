
const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
    target: "node",
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
    },
    plugins: [
        new Dotenv()
      ],
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/
        }]
    },
    resolveLoader: {
        modules: [
            __dirname + '/node_modules'
        ]
    }
}