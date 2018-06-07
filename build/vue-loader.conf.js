'use strict'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

const baseConfig = {
  loaders: merge(
    utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    {
      ts: ['babel-loader', 'ts-loader', 'tslint-loader'],
      tsx: 'babel-loader!ts-loader'
    }
  ),

  // Mobile only
  postcss: [
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 8',
        'iOS >= 8',
        'Android >= 4'
      ]
    }),
    // require('postcss-px2rem')({
    //   remUnit: 75,
    //   baseDpr: 2
    // })
  ],
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
  // 添加开启 TSLint 进行预处理
  // ts: ['babel-loader', 'ts-loader', 'tslint-loader']
}

module.exports = baseConfig
