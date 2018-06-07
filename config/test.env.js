'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTEXT: '"test"',
  API_HOST: '"https://xx.xx.xx/api/"',
  FETCH_SESSION: '"https://xx.xxx.cn/session.js"',
  OAUTH_REDIRECT_URL: '"https://xx.xxx.cn/wechat/oauth2"',
  PUBLIC_PATH: '"/"'
})
