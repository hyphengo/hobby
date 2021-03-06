'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONTEXT: '"dev"',
  API_HOST: '"/"',
  FETCH_SESSION: '"/api/session.js"',
  PUBLIC_PATH: '"/"'
})
