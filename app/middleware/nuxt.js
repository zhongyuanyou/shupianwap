'use strict';
const { Nuxt, Builder } = require('nuxt');
const config = require('../../nuxt.config');
module.exports = (options, app) => {
  // 实例化Nuxt对象,导入Nuxt项目相关配置
  const nuxt = new Nuxt(config);
  // 获取当前的开发环境
  const isDev = process.env.NODE_ENV !== 'production';
  // 如果是开发环境
  if (isDev) {
    // 构建项目
    new Builder(nuxt).build();
  }
  return async function(ctx, next) {
    let flag = false;
    let routerArr = [];
    if (!flag) {
      // 遍历出所有的NodeAPI路由地址
      routerArr = app.router.stack.map(el => el.path);
      flag = true;
    }
    if (routerArr.some(el => el === ctx.path)) {
      // 如果当前路由是后端路由,则不使用Nuxt,直接跳过当前中间件
      return await next();
    }
    ctx.status = 200;
    const { res, req } = ctx;
    return new Promise((resolve, reject) => {
      // 监听响应关闭和结束,假如响应结束正常结束当前处理程序
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      // 使用Nuxt进行渲染页面
      try {
        nuxt.render(req, res);
      } catch (e) {
        reject(e);
      }
    });
  };
};
