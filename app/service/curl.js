'use strict';
const Service = require('egg').Service;
class CurlService extends Service {
  /**
   * 调用curlGet服务API（HTTP）
   * @param { String } url API路径
   * @param { Object } params 请求参数
   * @return { Object } 返回请求结果数据
   */
  async curlGet(url = '', params = {}) {
    return new Promise(async resolve => {
      const { ctx } = this;
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 忽略fegin校验条件
        ctx.headers['X-User-Agent'] = '4b43c3f3-d817-4576-95b1-ad8519a2f14e';
        const result = await ctx.curl(url, {
          // 必须指定 method
          method: 'GET',
          // 默认将网管处理后的headers给后端服务
          headers: ctx.headers,
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType: 'json',
          data: params,
          timeout: 10 * 1000,
        });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 调用curlPost服务API（HTTP）
   * @param { String } url API路径
   * @param { Object } data 请求参数
   * @return { Object } 返回请求结果数据
   */
  curlPost(url = '', data = {}) {
    return new Promise(async resolve => {
      const { ctx } = this;
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 忽略fegin校验条件
        ctx.headers['X-User-Agent'] = '4b43c3f3-d817-4576-95b1-ad8519a2f14e';
        const result = await ctx.curl(url, {
          // 必须指定 method
          method: 'POST',
          // 默认将网管处理后的headers给后端服务
          headers: ctx.headers,
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType: 'json',
          data,
          timeout: 10 * 1000,
          // 忽略证书
          // rejectUnauthorized: false,
        });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 调用curlAll服务API（HTTP）
   * @param { String } url API路径
   * @param { Object } options curl的配置信息
   * @return { Object } 返回请求结果数据
   */
  async curlAll(url = '', options = {}) {
    return new Promise(async resolve => {
      const { ctx } = this;
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 忽略fegin校验条件
        ctx.headers['X-User-Agent'] = '4b43c3f3-d817-4576-95b1-ad8519a2f14e';
        const {
          // 必须指定 method
          method = 'GET',
          // 默认将网管处理后的headers给后端服务
          headers = ctx.headers,
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType = 'json',
          data = {},
          timeout = 10 * 1000,
        } = options;
        const result = await ctx.curl(url, {
          method,
          dataType,
          data,
          headers,
          timeout,
        });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = CurlService;
