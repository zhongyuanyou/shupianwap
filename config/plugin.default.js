'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 参数验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 启用redis插件,并指定使用的包名
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
