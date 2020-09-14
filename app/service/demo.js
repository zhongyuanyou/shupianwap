'use strict';
const Service = require('egg').Service;

class DemoService extends Service {
  async list(id) {
    return { id, userList: [{ name: '唐牧', age: 18 }, { name: '马莉', age: 21 }] };
  }
}
module.exports = DemoService;
