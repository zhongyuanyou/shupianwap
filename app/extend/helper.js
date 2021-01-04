'use strict';
const Crypto = require('crypto');
const _moment = require('moment');

_moment.locale('zh-cn'); // 使用中文

module.exports = {
  // redis缓存加密的key
  cacheKey(method, path, query) {
    const keyString = method + path + JSON.stringify(query);
    const md5CacheKey = Crypto.createHash('md5')
      .update(keyString)
      .digest('base64');
    return md5CacheKey;
  },
  // 网络请求状态码
  errorCode: {
    200: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
    201: '资源创建成功。客户端向服务器提供数据，服务器创建资源',
    202: '请求被接收。但处理尚未完成',
    204: '客户端告知服务器删除一个资源，服务器移除它',
    206: '请求成功。但是只有部分回应',
    400: '请求无效。数据不正确，请重试',
    401: '请求没有权限。缺少API token，无效或者超时',
    403: '用户得到授权，但是访问是被禁止的',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
    406: '请求失败。请求头部不一致，请重试',
    410: '请求的资源被永久删除，且不会再得到的',
    422: '请求失败。请验证参数',
    500: '服务器发生错误，请检查服务器',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
  },
  // 请求成功时的响应格式
  success({ ctx, code = 200, res = null }) {
    ctx.status = 200;
    ctx.body = {
      code,
      message: ctx.helper.errorCode[code],
      data: res,
    };
  },
  // 请求失败时的响应格式
  fail({ ctx, code = 500, res = null, detailMessage = '' }) {
    ctx.status = 200;
    ctx.body = {
      code,
      message: detailMessage || ctx.helper.errorCode[code],
      data: {
        error: res,
      },
    };
  },
  // 时间处理插件
  moment(date) {
    const dateInit = _moment(date);
    return dateInit;
  },
  /**
     * 获取某个可用服务,随机取
     * @param {*} instances 所有实例
     * @return {*} json
     */
  getOneInstanceFromAll(instances) {
    if (instances != null) {
      const upInstances = [];
      for (const i of instances) {
        if (i.status.toUpperCase() === 'UP') {
          upInstances.push(i);
        }
      }
      if (upInstances.length > 0) {
        const instanceIndex =
                    upInstances.length === 1
                      ? 0
                      : Date.now() % upInstances.length;
        return upInstances[instanceIndex];
      }
      return '';
    }
    return '';
  },
  /** Thanks to  coordinator-node-client */
  /**
     * 根据实例获取一个完整的ip方式的服务地址。
     * @param {*} instance  app的实例。
     * @return {string}  url地址,包括协议，ip和端口。例如:http://192.168.1.100:8080。
     */
  getServerPath(instance) {
    let url = '';
    const http = 'http://';
    const https = 'https://';
    if (instance) {
      if (instance.port && instance.port['@enabled'] === 'true') {
        url = http + instance.ipAddr + ':' + instance.port.$;
      } else if (
        instance.securePort &&
                instance.securePort['@enabled'] === 'true'
      ) {
        url = https + instance.ipAddr + ':' + instance.securePort.$;
      }
    }
    return url;
  },
  getUrl(instancesName) {
    const { ctx, app } = this;
    // 检测有是否传入实例Name
    if (
      instancesName &&
            app.config.apiClient.APPID.indexOf(instancesName) === -1
    ) {
      const err = new Error('请使用正确的appName获取节点');
      ctx.logger.error(err);
      throw err;
    }
    // 根据实例Name获取实例下的节点信息
    const appInstances = app.eurekaInstances[instancesName];
    // 从实例列表中获取一个节点
    const ins = this.getOneInstanceFromAll(appInstances);
    // 获取节点的网络地址
    const serverUrl = this.getServerPath(ins);
    return serverUrl;
  },
  /**
     * 将Egg的curl错误提示转换为项目统一的标准错误对象。
     * @param {Object} err  错误对象。
     * @return {Object}  错误信息对象。例如:{code: '404',message: '域名不存在',data: '域名不存在',}。
     */
  errMessage(err) {
    switch (err.code) {
      case 'ECONNRESET':
        return {
          code: '501',
          message:
                        '服务端主动断开 socket 连接，导致 HTTP 请求链路异常',
          data: '服务端主动断开 socket 连接，导致 HTTP 请求链路异常',
        };
      case 'ECONNREFUSED':
        return {
          code: '406',
          message: '请求的 url 所属 IP 或者端口无法连接成功,请确保IP或者端口设置正确',
          data: '请求的 url 所属 IP 或者端口无法连接成功,请确保IP或者端口设置正确',
        };
      case 'ENOTFOUND':
        return {
          code: '404',
          message: `${err.path}域名不存在`,
          data: `${err.path}域名不存在`,
        };
      default:
        return {
          code: '404',
          message: `${err.path}域名不存在`,
          data: `${err.path}域名不存在`,
        };
    }
  },
  /**
     * 请求api接口组装
     * @param {Object}
     * @param.name: String config文件中APPID下对应的项目实例名称
     * @param.path: String 请求路径
     * @return {String}  完整的api接口
     */
  assembleUrl(sysCode = null, path = '') {
    const { ctx } = this;
    const host = ctx.helper.getUrl(sysCode);
    return `${host}${path}`;
  },
  /**
   * 精度计算
   */
  calculate(input) {
    const f = {
      add: '+',
      sub: '-',
      div: '/',
      mlt: '*',
      mod: '%',
      exp: '^',
      lk: '(',
      rk: ')',
    };
    f.ooo = [
      [
        [ f.mlt ],
        [ f.div ],
        [ f.mod ],
        [ f.exp ],
      ],
      [
        [ f.add ],
        [ f.sub ],
        [ f.lk ],
        [ f.rk ],
      ],
    ];

    input = input.replace(/[^0-9%^*\/\-+.]/g, ''); // 清除不必要的字符
    let output;
    for (let i = 0, n = f.ooo.length; i < n; i++) {

      // 正则表达式，用于查找浮点数或整数之间的操作符
      const re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
      re.lastIndex = 0; // 采取预防措施，重新启动pos
      // 循环时仍然需要计算优先级
      while (re.test(input)) {
        // console.log('RegExp.$1, RegExp.$2, RegExp.$3', RegExp.$1, RegExp.$2, RegExp.$3)
        output = operation(+RegExp.$1, RegExp.$2, +RegExp.$3);
        if (isNaN(output) || !isFinite(output)) { return output; } // 如果不是数字就退出
        input = input.replace(re, output);
      }
    }
    return output;

    function isInteger(num) {
      // 判断一个数字是否为整数
      return Math.floor(num) === num;
    }
    function toInteger(floatNum) {
      // 将一个浮点数转换成整数，返回整数和倍数
      const ret = { times: 1, num: 0 };
      // 是整数
      if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret;
      }
      const strfi = floatNum + '';
      // 查找小数点的下标
      const dotPos = strfi.indexOf('.');
      // 获取小数的位数
      const len = strfi.substr(dotPos + 1).length;
      // Math.pow(10,len)指定10的len次幂。
      const time = Math.pow(10, len);

      // 将浮点数转化为整数
      const intNum = parseInt(floatNum * time + 0.5, 10);
      ret.times = time;
      ret.num = intNum;
      return ret;
    }
    function operation(a, op, b) {
      const o1 = toInteger(a);
      const o2 = toInteger(b);
      const n1 = o1.num;
      const n2 = o2.num;
      const t1 = o1.times;
      const t2 = o2.times;
      const max = t1 > t2 ? t1 : t2;
      let result = null;
      // eslint-disable-next-line default-case
      switch (op) {
        case f.add:
          if (t1 === t2) {
            result = n1 + n2;
          } else if (t1 > t2) {
            result = n1 + n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) + n2;
          }
          return result / max;
          // eslint-disable-next-line no-unreachable
          break;
        case f.sub:
          if (t1 === t2) {
            result = n1 - n2;
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2);
          } else {
            result = n1 * (t2 / t1) - n2;
          }
          return result / max;
          // eslint-disable-next-line no-unreachable
          break;
        case f.mlt:
          result = (n1 * n2) / (t1 * t2);
          return result;
          // eslint-disable-next-line no-unreachable
          break;
        case f.div:
          // result = (n1 / n2) / (t2 / t1);
          let _t1 = 0,
            _t2 = 0,
            r1,
            r2;
          try { _t1 = a.toString().split('.')[1].length; } catch (e) { }
          try { _t2 = b.toString().split('.')[1].length; } catch (e) { }
          r1 = Number(a.toString().replace('.', ''));
          r2 = Number(b.toString().replace('.', ''));
          result = (r1 / r2) * Math.pow(10, _t2 - _t1);
          return result;
          // eslint-disable-next-line no-unreachable
          break;
        case f.mod:
          result = (n1 / n2) % (t2 / t1);
          return result;
          // eslint-disable-next-line no-unreachable
          break;
        case f.exp:
          return Math.pow(n1 / max, n2 / max);
          // eslint-disable-next-line no-unreachable
          break;
      }
    }
  },
  /**
   * 进度计算后保留指定小数位数,返回字符串
   * @param.num: String config文件中APPID下对应的项目实例名称
   * @param.bit: String 请求路径
   * @return {String}
   */
  priceFixed(num, bit) {
    let numObj = Number(0);
    if (Number(this.calculate(num))) {
      numObj = Number(this.calculate(num));
    }
    return numObj.toFixed(bit);
  },
  /**
   * 获取薯片平台下的所有节点
   */
  getCripsInstance() {
    const { app } = this;
    const upInstances = [];
    if (app.eurekaInstances) {
      const instances = app.eurekaInstances['crisps-app-wap-bff-api'];
      if (instances && instances.length > 0) {
        for (const i of instances) {
          if (i.status.toUpperCase() === 'UP') {
            upInstances.push(i);
          }
        }
      }
      return upInstances;
    }
  },
};
