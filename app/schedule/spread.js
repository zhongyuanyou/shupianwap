'use strict';
module.exports = app => {
  return {
    schedule: {
      interval: '60s',
      type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的。
      immediate: true, // 启动时立即执行一次
    },
    // * extendBankServer 银行服务
    // * extendBussineWithdraw 工商注销
    // * extendSealEngraving 印章刻制
    // * extendTaxPlanning 税务筹划
    // * extendSysAuth 体系认证
    // * extendBussineReg 工商注册
    // * extendLicence 许可证
    // * extendBussineChange 工商变更
    // * extendNetWorkQualifications 互联网资质
    // * extendBussineHome 工商首页
    // * extendAccout 代理记账
    async task(ctx) {
      const pageCodes = [
        {
          today: 0,
          total: 1100,
          code: 'extendBankServer',
          ratio: 1.2, // 增长系数
        },
        {
          today: 0,
          total: 641012,
          code: 'extendAccout',
          ratio: 1.5,
        },
      ];
      for (let i = 0; i < pageCodes.length; i++) {
        const rangeNum = Math.ceil(
          (Math.random() * 2 + 1) * pageCodes[i].ratio
        );
        const Hours = new Date().getHours();
        const obj = pageCodes[i];
        const cacheKeyToday = ctx.helper.cacheKey(
          obj.code + 'today'
        );
        const cacheKeyTotal = ctx.helper.cacheKey(
          obj.code + 'total'
        );
        if (Hours >= 0 && Hours < 9) {
          // 凌晨至早上9点不更新累计数据
          if (Hours === 0) {
            // 凌晨初始化今日数据
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
          } else toDayNum = rangeNum;
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
      }
    },
  };
};
