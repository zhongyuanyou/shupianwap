'use strict';
/**
 * 错误处理中间件,将项目中所有的错误信息进行包装拦截
 */
module.exports = (option, app) => {
  return async function errFilter(ctx, next) {
    try {
      await next();
    } catch (err) {
      const error = app.config.env === 'prod' ? '服务器错误,请联系管理员' : String(err);
      ctx.helper.fail({ ctx, code: 500, res: error });
    }
  };
};
