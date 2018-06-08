/**
 * @file index.js
 * @author lihuanji
 *
 * mock 入口
 */
const express = require('express')
const router = express.Router()

router.options('*', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'TOKEN, Content-Type')
  res.end()
})

router.get('/api/session.js', (req, res) => {
  setTimeout(() => {
    res.json(require('./data/session.json'))
  }, 1000)
})
router.get('/api/wxsession.js', (req, res) => {
  setTimeout(() => {
    res.json(require('./data/wxsession.json'))
  }, 500)
})
router.get('/home/loadNewHome', (req, res) => {
  setTimeout(() => {
    res.json(require('./data/home.json'))
  }, 500)
})
router.get('/product/searchCategories', (req, res) => {
  setTimeout(() => {
    res.json(require('./data/searchCategories.json'))
  }, 500)
})


module.exports = router
