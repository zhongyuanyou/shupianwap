'use strict';
module.exports = app => {
  return {
    schedule: {
      interval: '10s', // 20秒间隔
      type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
      immediate: true, // 启动时立即执行一次
    },
    async task(ctx) {
      const pageCodes = [
        { today: 100, total: 1100, code: 'page1' },
        { today: 100, total: 1300, code: 'page2' },
        { today: 100, total: 1400, code: 'page3' },
        { today: 100, total: 1500, code: 'page4' },
      ];
      const rangeNum = Math.ceil(Math.random() * 15);
      const Hours = new Date().getHours();
      const obj = pageCodes[0];
      const cacheKeyToday = ctx.helper.cacheKey(
        obj.code + 'today'
      );
      const cacheKeyTotal = ctx.helper.cacheKey(
        obj.code + 'total'
      );
      if (Hours < 24 && Hours > 9) {
        // 凌晨至早上9点不更新累计数据
        if (Hours === 1) {
          // 凌晨1点初始化今日数据
          ctx.service.redis.set(
            cacheKeyToday,
            obj.today,
            app.config.redisCacheTime
          );
        }
      } else {
        let toDayNum = await ctx.service.redis.get(
          cacheKeyToday
        );
        if (toDayNum) {
          toDayNum = Number(toDayNum) + rangeNum;
        } else toDayNum = obj.today;
        ctx.service.redis.set(
          cacheKeyToday,
          toDayNum,
          app.config.redisCacheTime
        );
        let totalNum = await ctx.service.redis.get(
          cacheKeyTotal
        );
        if (totalNum) {
          totalNum = Number(totalNum) + rangeNum;
        } else totalNum = obj.total;
        ctx.service.redis.set(
          cacheKeyTotal,
          totalNum,
          app.config.redisCacheTime
        );
      }
    },
  };
};
