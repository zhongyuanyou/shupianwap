'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class LoggersService extends Service {
  async list() {
    const { ctx } = this;
    const { logger } = ctx;
    try {
      const data = await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, './../../logs/DGG/egg-web.log'), (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
      return { data: data.toString() };
    } catch (err) {
      logger.error(err);
      return { data: '出错啦' };
    }
  }
}
module.exports = LoggersService;
