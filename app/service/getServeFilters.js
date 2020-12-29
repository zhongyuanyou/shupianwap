"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');

function categoryHandle(arr) {
  let arr1 = []
  let arr2 = []
  // 找出层级为1的分类
  arr1 = arr.filter((item) => {
    return item.level === 1
  })
  // 找出层级为2的分类
  arr2 = arr.filter((item) => {
    return item.level === 2
  })
  // Todo 2级分类需要添加不限数据

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
        const sortDict = await service.curl.curlGet(url, {code: 'CONDITION-QF-SORT'});
        const serviceCategory = await service.common.category.getProductCategory({productTypeCode: 'PRO_CLASS_TYPE_SERVICE', needTwo: 1 });
        // console.log('sortDict', sortDict)
        // console.log('serviceCategory', serviceCategory)
        if (
          /*sortDict.status === 200 &&
          serviceCategory.status === 200 &&*/
          sortDict.code === 200 &&
          serviceCategory.code === 200
        ) {
          // 处理服务分类，重组数据
          const arr = categoryHandle(serviceCategory.data)
          result.data = [arr, sortDict.data]
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
