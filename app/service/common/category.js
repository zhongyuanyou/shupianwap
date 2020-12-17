'use strict';
const Service = require('egg').Service;
const { contentApi, productApi } = require('../../../config/serveApi/index');

class categoryService extends Service {
  /**
   * 获取分类数据（GET）
   * @code { Array } code 分类编码
   * @id { Array } id 分类id
   * @return { Object } 返回请求结果数据
   */
  async getCategoryDetail(code, id) {
    return new Promise(async resolve => {
      const { ctx, app } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[0],
        contentApi.findCategoryDetail
      );
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
          data: { code, id },
          timeout: 10 * 1000,
        });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  async getProductCategory(object) {
    // 获取产品分类列表
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const { code , productTypeCode } = object
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[1],
        productApi.getClassificationList
      );
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlPost(url, {
          productTypeCode,
          code
        });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = categoryService;
