'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // 用于cookie签名密钥，应更改为您自己的密钥并保持安全
  config.keys = appInfo.name + '_1599699446500_2481';

  config.mytest = '本地测试';
  // 在此处添加个人配置
  const userConfig = {
    // myAppName: 'egg',
    // redis默认缓存数据的时长(S秒),开发环境1小时
    redisCacheTime: 60 * 5,
  };

  return {
    ...config,
    ...userConfig,
  };
};
