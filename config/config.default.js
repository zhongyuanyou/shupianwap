'use strict';

const path = require('path');
// 获取本机IP
function getIPAdress() {
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
}

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
  config.middleware = [ 'nuxt', 'gzip', 'errFilter', 'dggCache' ];
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };
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
      host: '192.168.254.211', // IP地址
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
  // 熔断配置
  config.circuitBreaker = {
    timeout: 30000, // If our function takes longer than 30 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the breaker
    resetTimeout: 30000, // After 30 seconds, try again.
  };
  // 多进程增强模式apiclient配置
  config.apiClient = {
    // 通过egg apiclient 完成对微服务信息的订阅功能
    subMap: {
      // 自定义foo，作为在service中获取订阅信息的key值
      foo: {
        // bar 是你需要订阅的微服务的vipAddress，一般和app name相同
        // 填写后agent会在registryUpdated事件触发时更新微服务实例信息，并发布给各个follwer
        dataId: 'bar',
      },
    },
  };
  // eureka配置
  config.eureka = {
    client: {
      // instance信息不是必须的，如果你清楚知道自己将要部署的服务信息，可以自行填写，
      // 如果是部署在docker中，需要自行填写，
      // 否则，应用会读取服务器信息以及egg应用的启动信息自动填写配置
      instance: {
        instanceId: `${getIPAdress()}:7001`,
        app: 'chips-wap',
        hostName: getIPAdress(),
        ipAddr: getIPAdress(),
        // preferIpAddress: true, // default is false and host will be used.
        // homePageUrl: 'http://127.0.0.1:7001/info',
        statusPageUrl: `http://${getIPAdress()}:7001/info`,
        // healthCheckUrl: 'http://127.0.0.1:7001/info',
        port: {
          $: 7001,
          '@enabled': 'true',
        },
        // Important, otherwise spring-apigateway cannot find instance of node-rest
        vipAddress: 'chips-wap',
        // secureVipAddress: 'chips-wap',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        fetchRegistry: true,
        host: '192.168.254.27',
        port: 39817,
        servicePath: '/eureka/apps/',
        // serviceUrls: {
        //   default: [
        //     'http://127.0.0.1:3000/eureka/apps/',
        //     'http://127.0.0.2:3000/eureka/apps/',
        //   ],
        // },
        ssl: false,
        useDns: false,
        fetchMetadata: false,
        preferIpAddress: true,
        // maxRetries: 0,
      },
    },
  };
  // 在此处添加个人配置
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
