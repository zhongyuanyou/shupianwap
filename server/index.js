// const fs = require('fs')
// const https = require('https')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // 非正式环境启动https服务
  //   if (config.dev) {
  //     // 新增 https 設定
  //     const https_options = {
  //       key: fs.readFileSync(`${__dirname}/example.com+5-key.pem`),
  //       cert: fs.readFileSync(`${__dirname}/example.com+5.pem`),
  //     }
  //     // 開啟 https server
  //     https.createServer(https_options, app).listen(port)
  //     consola.ready({
  //       message: `App running at: \n\n  - Local:   https://${host}:${port} \n  - Network:   https://${getIPAdress()}:${port}`,
  //       badge: true,
  //     })
  //     return
  //   }

  // Listen the server
  app.listen(port)
  consola.ready({
    message: `App running at: \n\n  - Local:   http://${host}:${port} \n  - Network:   http://${getIPAdress()}:${port}`,
    badge: true,
  })
}
start()

// 获取本机IP
function getIPAdress() {
  const interfaces = require('os').networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}
