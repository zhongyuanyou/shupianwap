'use strict';
module.exports = () => {
  return async function dggCache(ctx, next) {
    // 判断是否需要缓存
    if (ctx.header['x-cache-control'] !== 'cache') {
      // 不需要缓存接口数据时,直接跳过当前中间件
      return await next();
    }
    // 需要缓存接口数据
    const cacheKey = ctx.helper.cacheKey(ctx.method, ctx.path, ctx.query);
    let cacheData = null;
    cacheData = await ctx.service.redis.get(cacheKey);
    // 对需要缓存的接口进行缓存命中
    if (cacheData) {
      // 命中缓存直接响应缓存数据
      ctx.body = cacheData;
    }
    // 假如未命中缓存,进入路由句柄逻辑
    await next();
    const body = ctx.body;
    if (!body) return;
    // 响应时走的业务逻辑
    // 我们队需要缓存的数据进行redis缓存
    await ctx.service.redis.set(cacheKey, body, 60 * 60 * 24);// 缓存时间以S为单位
    ctx.body = body;

  };
};
