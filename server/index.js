const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('src/index.html', {
  cache: false
})

let app = express()

const development = process.env.NODE_ENV

console.log('development', process.env.API_PROXY)

if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api': '/'
      }
    })
  )
} else {
  app.use(
    '/api',
    proxy({
      target: process.env.API_PROXY
    })
  )
}

app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))
