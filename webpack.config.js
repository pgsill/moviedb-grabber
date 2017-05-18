
var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/client/main.js',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: __dirname + '/client',
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: __dirname + '/src/static/',
    filename: 'bundle.js'
  }
}
