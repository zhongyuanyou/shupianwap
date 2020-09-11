'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const { type, query } = ctx.query;
    // if (type === 'baidu') {
    //   ctx.redirect(`https://www.baidu.com?q=${query}`);
    // } else {
    //   ctx.redirect(`http://cn.bing.com/search?q=${query}`);
    // }
    ctx.body = this.app.config.mytest;
  }
}

module.exports = HomeController;
