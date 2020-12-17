'use strict';
const path = require('path');
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  const envConfig = require('./envConfig')(appInfo);
  const { config, userConfig } = envConfig;
  config.xtransit = {
    server: 'ws://192.168.254.210:9090/',
    appId: 2,
    appSecret: 'e1e7ef49d45b34d3601930e3e68b100d',
    errors: [
      path.join(appInfo.root, 'logs/local/common-error.log'),
      path.join(appInfo.root, 'logs/unittest/common-error.log'),
      path.join(appInfo.root, 'logs/prod/common-error.log'),
    ],
  };
  // 修改服务favicon
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, './../client/static/favicon.ico')),
  };
  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: process.env.http_proxy,
      },
    };
  }
  const http = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-User-Agent': '4b43c3f3-d817-4576-95b1-ad8519a2f14e',
      }
    },
    timeout: 10000
  };
  return {
    ...config,
    ...userConfig,
    http,
  };
};
