"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');
class getJyFiltersService extends Service {
  /**
   * 获取交易筛选数据（get）
   * @return { Object } 返回请求结果数据
   */
  getJyFilters(dictCode, classCode) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      try {
        let result = await getTypeJyFilter.call(this, dictCode, classCode)
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
// 获取所有的交易筛选项
async function getTypeJyFilter(dictCode, classCode) {
  return new Promise(async resolve => {
    const { ctx, app, service } = this;
    const sysCode = app.config.apiClient.APPID[0];
    const dictTier = contentApi.dataDictsTier; // 深层查询字典
    const dict = contentApi.dataDict; // 查询字典
    const url = ctx.helper.assembleUrl(sysCode, dictTier);
    const dictUrl = ctx.helper.assembleUrl(sysCode, dict);
    const result = {
      code: 500,
      data: {},
    }
    const jyFilters = service.curl.curlGet(url, {code: dictCode}); // 公司的筛选项字典
    const jyFilterFun = {
      async CONDITIONJYGS() {
        // 公司
        const cityList = service.common.city.getCityList(); // 获取地区数据
        const gshyCategory = service.common.category.getProductCategory({code: classCode,productTypeCode: 'PRO_CLASS_TYPE_SERVICE'}); // 公司的行业筛选项
        const res = await Promise.all([jyFilters, cityList, gshyCategory]);
        const _flag = res[0].status === 200 &&
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
          gs_dq.children = res[1].data.data; // 将地区数据和筛选合并
          gs_dq.children.unshift({ // 为地区数据添加全国选项
            name: '全国',
            code: res[1].data.data[0].pcode,
            children: [],
          })
          // 找到行业选项
          let gs_hy = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-GS-HY'
          })
          res[2].data.data.unshift({
            name: '不限',
            id: 'all',
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
        const zyhyCategory = service.common.category.getProductCategory({code: classCode,productTypeCode: 'PRO_CLASS_TYPE_SERVICE'}); // 专利的行业筛选项
        const res = await Promise.all([jyFilters, zyhyCategory]);
        console.log(res)
        const _flag = res[0].status === 200 &&
          res[1].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200
        // 找到行业选项
        if (_flag) {
          let zy_hy = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-ZY-HY'
          })
          res[1].data.data.unshift({
            name: '不限',
            id: 'all',
          })
          zy_hy.children = res[1].data.data
          result.data = res[0].data.data
          result.code = 200
        } else {
          result.data = {}
        }
        resolve(result)
      },
      async CONDITIONJYSB() {
        // 商标
        const sbflCategory = service.common.category.getProductCategory({code: classCode,productTypeCode: 'PRO_CLASS_TYPE_SERVICE'}); // 商标的分类筛选项
        const res = await Promise.all([jyFilters, sbflCategory]);
        const _flag = res[0].status === 200 &&
          res[1].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200
        // 找到行业选项
        if (_flag) {
          let sb_fl = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-SB-FL'
          })
          res[1].data.data.unshift({
            name: '不限',
            id: 'all',
          })
          sb_fl.children = res[1].data.data
          result.data = res[0].data.data
          result.code = 200
        } else {
          result.data = {}
        }
        resolve(result)
      },
      async CONDITIONJYZZ() {
        // 资质
        const cityList = service.curl.curlGet(dictUrl, {code: '2147483647'}); // 获取地区数据
        const zzlbCategory = service.common.category.getProductCategory({code: classCode,productTypeCode: 'PRO_CLASS_TYPE_SERVICE'}); // 商标的分类筛选项
        const res = await Promise.all([jyFilters, zzlbCategory, cityList]);
        const _flag = res[0].status === 200 &&
          res[1].status === 200 &&
          res[2].status === 200 &&
          res[0].data.code === 200 &&
          res[1].data.code === 200 &&
          res[2].data.code === 200
        if (_flag) {
          // 找到类别选项
          let sb_fl = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-ZZ-LB'
          })
          // 找到更多选项
          let sb_gd = res[0].data.data.find((item) => {
            return item.code === 'CONDITION-JY-ZZ-GD'
          })
          // 找到更多选项下的地区选项
          let sb_gd_dq = sb_gd.children.find((item) => {
            return item.code === 'CONDITION-JY-ZZ-GD-DQ'
          })
          res[1].data.data.unshift({
            name: '不限',
            id: 'all',
          })
          res[2].data.data.forEach((item) => {
            item.ext1 = sb_gd_dq.ext1
          })
          sb_fl.children = res[1].data.data
          sb_gd_dq.children = res[2].data.data
          result.data = res[0].data.data
          result.code = 200
        } else {
          result.data = {}
        }
        resolve(result)
      },
    }
    const handleName = dictCode.replace(/-/g, '')
    handleName && jyFilterFun[handleName] && jyFilterFun[handleName]()
  });
}
module.exports = getJyFiltersService;
