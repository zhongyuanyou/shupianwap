'use strict';
const Service = require('egg').Service;

class RedisService extends Service {
  // 写入内容到redis
  async set(key, value, seconds) {
    const { redis } = this.app;
    value = JSON.stringify(value);
    if (seconds) {
      // 设置失效时间ex:秒,px:毫秒
      await redis.set(key, value, 'ex', seconds);
    } else {
      await redis.set(key, value);
    }
  }
  // 获取redis数据
  async get(key) {
    const { redis } = this.app;
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }
  // 情况redis内容
  async flushall() {
    const { redis } = this.app;
    const res = await redis.flushall();
    return res;
  }
}
module.exports = RedisService;
