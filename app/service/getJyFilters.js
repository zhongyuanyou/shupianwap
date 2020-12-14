"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');
class getJyFiltersService extends Service {
  /**
   * 获取交易筛选数据（get）
   * @return { Object } 返回请求结果数据
   */
  getJyFilters(dictCode) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      try {
        let result =await getTypeJyFilter.call(this, 'CONDITION-JY-GS')
        console.log(result)
        // ctx.logger.info(res[2])
        /*if (
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
        }*/
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
// 获取所有的交易筛选项
async function getTypeJyFilter(dictCode) {
  return new Promise(async resolve => {
    const { ctx, app, service } = this;
    const sysCode = app.config.apiClient.APPID[0];
    const address = contentApi.dataDictsTier;
    const url = ctx.helper.assembleUrl(sysCode, address);
    const result = {
      code: 500,
      data: {},
    }
    const jyFilterFun = {
      async CONDITIONJYGS() {
        // 公司
        const jyFilters = service.curl.curlGet(url, {code: dictCode}); // 公司的筛选项字典
        const cityList = service.common.city.getCityList(); // 获取地区数据
        const gshyCategory = service.common.category.getProductCategory({code: 'FL20201207080003',productTypeCode: 'PRO_CLASS_TYPE_SERVICE'}); // 公司的行业筛选项
        const res = await Promise.all([jyFilters, cityList, gshyCategory]);
        let _flag = res[0].status === 200 &&
          res[1].status === 200 &&
          res[2].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200 &&
          res[2].data.code === 200
        // console.log(res)
        if (_flag) {
          // 找到地区选项
          let gs_dq = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-GS-DQ'
          })
          // 找到行业选项
          let gs_hy = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-GS-HY'
          })
          gs_dq.children = res[1].data.data; // 将地区数据和筛选合并
          gs_dq.children.unshift({ // 为地区数据添加全国选项
            name: '全国',
            code: res[1].data.data[0].pcode,
            children: [],
          })
          gs_hy.children = res[2].data.data; // 将行业数据与筛选合并
          result.data = res[0].data.data
          result.code = 200
        } else {
          result.data = {}
        }
        resolve(result)
      },
      async CONDITIONJYZY() {
        // 专利
      },
      async CONDITIONJYSB() {
        // 商标
      },
      async CONDITIONJYZZ() {
        // 资质
      },
    }
    const handleName = dictCode.replace(/-/g, '')
    handleName && jyFilterFun[handleName] && jyFilterFun[handleName]()
  });
}

function resetJyFilter() {

}
module.exports = getJyFiltersService;
