const path = require('path')
const webpack = require('webpack')
const dll = require('./dll')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')

module.exports = {
  entry: {
    vendor: dll.list
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../build/', '[name]-manifest.json'),
      name: '[name]'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
  ]
}
