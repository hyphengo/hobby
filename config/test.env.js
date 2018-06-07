'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTEXT: '"test"',
  API_HOST: '"https://test-ec-api.cocowa.com.cn/api/"',
  FETCH_SESSION: '"https://test-ec-api.cocowa.com.cn/api/session.js"',
  OAUTH_REDIRECT_URL: '"https://test-ec-api.cocowa.com.cn/api/wechat/oauth2"',
  PUBLIC_PATH: '"/"'
})
