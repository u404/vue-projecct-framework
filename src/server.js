const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const proxy = require('http-proxy-middleware')

const config = require('./server-config')

const resolve = file => path.resolve(__dirname, file)

const app = express()

// 代理映射
const proxyTable = config.proxyTable
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxy(options.filter || context, options))
})

// favicon
app.use(favicon(resolve('./resources/img/favicon.ico')))

// 暴露静态资源
const staticPath = (path, cache) => express.static(resolve(path), {
  maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.use('/resources', staticPath('./resources', true))

// 如果没有用户特殊的内容，那么启用微型缓存来优化性能，如果有用户特殊的部分，那么，根据请求的url来判断是否缓存内容
app.use(microcache.cacheSeconds(1, req => config.useMicroCache && req.originalUrl))

app.get('/', function (req, res) {
  res.sendFile(resolve('./index.html'))
})

app.listen(config.port, function () {
  console.log('server start at ' + config.port)
})
