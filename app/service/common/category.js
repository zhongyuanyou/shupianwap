'use strict';
const Service = require('egg').Service;
const { contentApi, productApi } = require('../../../config/serveApi/index');

class categoryService extends Service {
  /**
   * @author xyg
   * 获取分类数据（GET）
   * @code { Array } code 分类编码
   * @id { Array } id 分类id
   * @return { Object } 返回请求结果数据
   */
  async getCategoryDetail(code, id) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[0],
        contentApi.findCategoryDetail
      );
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 忽略fegin校验条件
        const result = await service.curl.curlGet(url, { code, id });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  /**
   * @author xyg
   * 获取产品分类数据（GET）
   * @object { object } object 分类c参数
   * @return { Object } 返回请求结果数据
   */
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
