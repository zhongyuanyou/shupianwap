"use strict";
const Service = require("egg").Service;
const { productApi } = require('./../../config/serveApi/index');
class goodsListService extends Service {
  /**
   * 获取服务商品数据（POST）
   * @data { Object } data 请求参数
   * @return { Object } 返回请求结果数据
   */
  async getServeGoodsList(data) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[1];
      const address = productApi.getServeList;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        let params = JSON.parse(JSON.stringify(data))
        switch(params.sortBy) {
          case 'CONDITION-QF-SORT-MR':
            params.orderBy = 'DEFAULT_SORT' // 默认排序
            params.isAsc = true
            break
          case 'CONDITION-QF-SORT-XLDG': // 按销量从低到高
            params.orderBy = 'SALES_SORT' // 销量排序
            params.isAsc = true // 默认排序
            break
          case 'CONDITION-QF-SORT-XLGD': // 按销量从高到低
            params.orderBy = 'SALES_SORT' // 销量排序
            params.isAsc = false
            break
          case 'CONDITION-QF-SORT-JGDG': // 按价格从低到高
            params.orderBy = 'REFERENCE_PRICE_SORT' // 价格排序
            params.isAsc = true
            break
          case 'CONDITION-QF-SORT-JGGD': // 按价格从高到低
            params.orderBy = 'REFERENCE_PRICE_SORT' // 价格排序
            params.isAsc = false
            break
        }
        delete params.needTypes
        delete params.needGoodsList
        delete params.sortBy
        const result = await service.curl.curlPost(url, params);
        // console.log(result)
        let arr = []
        result.data.data.records.forEach((item) => {
          let {
            id,
            name,
            salesSum,
            classCode,
            className,
            referencePrice,
            tags,
            clientDetails,
            productDescription,
            productNo,
          } = item
          // todo referencePrice金额需要转换成元，在这里是分
          arr.push({
            id,
            name,
            salesSum,
            classCode,
            className,
            referencePrice,
            tags,
            clientDetails,
            productDescription,
            productNo,
          })
        })
        result.data.data.records = arr;
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  /**
   * 获取交易商品数据（POST）
   * @data { Object } data 请求参数
   * @return { Object } 返回请求结果数据
   */
  async getJyGoodsList(data) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[1];
      const address = productApi.getJyServeList;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 1.综合排序（默认）  2.最新发布  3.按价格从高到低  4.按价格从低到高
        let params = JSON.parse(JSON.stringify(data))
        switch(params.sortBy) {
          case 1:
            // 综合排序（默认）
            params.orderBy = 'DEFAULT_SORT' // 默认排序
            params.isAsc = true // 升序排序
            break
          case 2:
            // 最新发布
            params.orderBy = 'CREATE_TIME_SORT'
            params.isAsc = false // 降序排序
            break
          case 3:
            // 按价格从高到低
            params.orderBy = 'PRICE_SORT'
            params.isAsc = false
            break
          case 4:
            // 按价格从低到高
            params.orderBy = 'PRICE_SORT'
            params.isAsc = true
            break
        }
        delete params.needTypes
        delete params.dictCode
        const result = await service.curl.curlPost(url, params);
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = goodsListService;
