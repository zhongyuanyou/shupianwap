"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');

function categoryHandle(arr) {
  let arr1 = []
  let arr2 = []
  arr1 = arr.filter((item) => {
    return item.level === 1
  })
  arr2 = arr.filter((item) => {
    return item.level === 2
  })
  arr1.forEach((item) => {
    item.children = arr2.filter((i) => {
      return item.id === i.parentId
    })
  })
  return arr1
}
class getServeFiltersService extends Service {
  /**
   * 获取服务筛选数据（get）
   * @return { Object } 返回请求结果数据
   */
  async getServeFilters() {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      try {
        let result = {
          code: 500,
          data: [],
        }
        const sysCode = app.config.apiClient.APPID[0];
        const address = contentApi.dataDictsTier;
        const url = ctx.helper.assembleUrl(sysCode, address);
        if (!url) {
          resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
        }
        // 查询服务产品排序字典
        const sortDict = service.curl.curlAll(url, {
          method: 'GET',
          data: {
            code: 'CONDITION-QF-SORT',
          },
        });
        const serviceCategory = service.common.category.getProductCategory('PRO_CLASS_TYPE_SERVICE');
        const res = await Promise.all([serviceCategory, sortDict])
        if (
          res[0].status === 200 &&
          res[1].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200
        ) {
          // 处理服务分类，重组数据
          const arr = categoryHandle(res[0].data.data)
          result.data = [arr, res[1].data.data]
          result.code = 200
        } else {
          result.data = []
        }
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = getServeFiltersService;
