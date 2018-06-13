'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTEXT: '"test"',
  API_HOST: '"https://test-market.cocowa.com.cn/api/"',
  PUBLIC_PATH: '"/"'
})
