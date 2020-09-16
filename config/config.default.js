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
  config.cluster = {
    listen: {
      port: 7000,
      hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    },
  };
  // 在此处添加中间件配置
  config.middleware = [ 'nuxt', 'errFilter', 'dggCache' ];
  // 关闭跨域校验(注意:默认开启的话,跨域调用API必须进行token校验)
  config.security = {
    csrf: false,
  };
  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, 'DGG-web.log'),
    ],
    // 设置日志文件需要切割的大小(kb为单位),超过配置大小(2GB),就会进行切割
    // 设置了按文件大小切割后,按时间切割的日志文件的配置将不生效,都会安装文件大小切割
    maxFileSize: 2 * 1024 * 1024 * 1024,
  };
  // redis集群配置
  config.redis = {
    client: {// 可以配置多Redis节点
      host: '127.0.0.1', // IP地址
      port: '6379', // 端口号
      family: 'root', // 用户名
      password: '', // 用户密码
      db: 0, // 数据库名称,redis默认16个数据库0-16
      weakDependent: true,
    },
    // redis集群配置
    // client: {
    // cluster: true, // 是否启动集群
    // nodes: [{// 可以配置多Redis节点
    //   host: '127.0.0.1', // IP地址
    //   port: '6379', // 端口号
    //   family: 'root', // 用户名
    //   password: '', // 用户密码
    //   db: 'db', // 数据库名称,redis默认16个数据库0-16
    // }],
    // },
  };
  // 在此处添加个人配置
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
