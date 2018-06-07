var express = require('express')
var path = require('path')
var fallback = require('express-history-api-fallback')
var app = express()
var root = path.join(__dirname, '../dist')

app.use(express.static(root))
app.use(fallback('index.html', { root: root }))

app.listen(3000)
