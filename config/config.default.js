'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 用于cookie签名密钥，应更改为您自己的密钥并保持安全
  config.keys = appInfo.name + '_1599699446500_2481';

  // 在此处添加中间件配置
  config.middleware = [ 'nuxt' ];
  // 关闭跨域校验(注意:默认开启的话,跨域调用API必须进行token校验)
  config.security = {
    csrf: false,
  };
  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, 'DGG-web.log'),
    ],
    // 设置日志文件需要切割的大小(kb为单位),超过配置大小(2GB),就会进行切割
    // 设置了按文件大小切割后,按时间切割的日子文件将不生效,都会安装文件大小切割
    maxFileSize: 2 * 1024 * 1024 * 1024,
  };
  // 在此处添加个人配置
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
