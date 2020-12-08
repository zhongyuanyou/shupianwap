"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');
class getJyFiltersService extends Service {
  /**
   * 获取交易筛选数据（get）
   * @return { Object } 返回请求结果数据
   */
  async getJyFilters() {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.dataDictsTier;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const result = {
          code: 500,
          data: null,
        }
        const jyFilters = service.curl.curlGet(url, {code: 'CONDITION-JY'});
        const cityList = service.common.city.getCityList();
        const res = await Promise.all([jyFilters, cityList])
        ctx.logger.info(res)
        if (
          res[0].status === 200 &&
          res[1].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200
        ) {
          // 找到公司选项
          let gs = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-GS'
          })
          // 找到地区选项
          let gs_dq = gs.children.find((item) => {
            return item.code === 'CONDITION-JY-GS-DQ'
          })
          gs_dq.children = res[1].data.data
          gs_dq.children.unshift({
            name: '全国',
            code: res[1].data.data[0].pcode,
            children: [],
          })
          result.code = 200
          result.data = res[0].data.data
        } else {
          result.data = {}
        }
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

}
module.exports = getJyFiltersService;
