'use strict';
/**
 * @param app 推广页所需的基础数据，今日数据，累计数据处理
 * @author tangdaibing
 * @since 2020/12/21
 */
// 获取本机IP
const getIPAdress = () => {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};
const localIp = getIPAdress();
async function setData(ctx) {
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
  // * extendAccount 代理记账
  const pageCodes = [
    {
      today: 0,
      total: 1100,
      code: 'extendBankServer',
      ratio: 0.5, // 增长系数
    },
    {
      today: 0,
      total: 26000,
      code: 'extendAccount',
      ratio: 2,
    },
  ];
  for (let i = 0; i < pageCodes.length; i++) {
    const rangeNum = Math.ceil((Math.random() * 5 + 1) * pageCodes[i].ratio);
    const Hours = new Date().getHours();
    const obj = pageCodes[i];
    const cacheKeyToday = ctx.helper.cacheKey(obj.code + 'today');
    const cacheKeyTotal = ctx.helper.cacheKey(obj.code + 'total');
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
      let toDayNum = await ctx.service.redis.get(cacheKeyToday);
      if (toDayNum) {
        toDayNum = Number(toDayNum) + rangeNum;
        toDayNum = rangeNum;
      } else toDayNum = rangeNum;
      ctx.service.redis.set(cacheKeyToday, toDayNum, app.config.redisCacheTime);
      let totalNum = await ctx.service.redis.get(cacheKeyTotal);
      if (totalNum) {
        totalNum = Number(totalNum) + rangeNum;
        totalNum = obj.total;
      } else totalNum = obj.total;
      ctx.service.redis.set(cacheKeyTotal, totalNum, app.config.redisCacheTime);
    }
  }
}
module.exports = (app) => {
  return {
    schedule: {
      interval: '10s',
      type: 'worker',
      immediate: true,
    },
    async task(ctx) {
      // console.log('eurekaInstances', ctx.app.eurekaInstances);
      const instance = ctx.helper.getCripsInstance();
      if (instance.length === 0) {
        // 启动服务时无法及时获取到节点信息
        setData(ctx);
      } else {
        if (instance.length > 0 && instance[0].instanceId === localIp) {
          setData(ctx);
        }
      }
    },
  };
};
