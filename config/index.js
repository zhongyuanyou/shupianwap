const defaults = require('./config.default')
const development = require('./config.development')
const release = require('./config.release')
const production = require('./config.production')
const beta = require('./config.beta')
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
const BASE = {
  // 开发、测试环境
  development,
  // 预发布环境
  release,
  // 生产环境
  production,
  // 预发布
  beta,
}
module.exports = Object.assign(defaults, BASE[DGG_SERVER_ENV])
