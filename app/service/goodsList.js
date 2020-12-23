"use strict";
const Service = require("egg").Service;
const { productApi } = require('./../../config/serveApi/index');
const { RULES } =require('./../../config/constant/jyFieldRules')
// 处理交易不同业态的属性
function resetJyField(typeCode, fieldData) {
  // 获取的规则
  const rules = RULES[typeCode]
  if (!rules) {
    return []
  } else {
    const field = fieldData.filter((item) => {
      return rules.indexOf(item.fieldCode) > -1
    })
    return field
  }
}
// 处理服务标签
function resetServeTags(tagsData, result) {
  const tagType = {}
  // console.log(tagsData);
  // console.log(result);
  tagsData.forEach((item) => {
    // 对查询到的标签数据进行分类
    if (!tagType[item.tagType]) {
      tagType[item.tagType] = []
    }
    tagType[item.tagType].push(item)
  })
  result.forEach((item) => {
    // 对商品列表标签进行分类和合并
    item.tags && item.tags.forEach((_item) => {
      // 进行id筛选
      item[_item.tagType] = tagType[_item.tagType].filter((__item) => __item.id === _item.tagId)
    })
  })
  return result
}
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
      const listUrl = ctx.helper.assembleUrl(sysCode, productApi.getServeList);
      const tagsUrl = ctx.helper.assembleUrl(sysCode, productApi.tagSearch);

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
        const result = await service.curl.curlPost(listUrl, params);
        let tagArr = []
        // console.log(result)
        let arr = []
        result.data.records.forEach((item) => {
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
          if (tags) {
            tags.forEach((item) => {
              tagArr.push(item.tagId)
            })
          }
          // tagArr.push.call(tagArr, ...tags)
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
        tagArr = [...new Set(tagArr)]
        console.log(tagArr)
        console.log(tagArr.length)
        const tagsResult = await service.curl.curlPost(tagsUrl, {tagIds: tagArr});
        let resetResult = [] // 标签
        console.log('asdssssssssss', tagsResult)
        // 这里判断标签数据是否成功返回
        if (tagsResult.code === 200 && tagsResult.data.records.length) {
          resetResult = resetServeTags(tagsResult.data.records, arr)
        } else {
          resetResult = arr
        }
        result.data.records = resetResult;
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
        // 1.综合排序（默认）  2.最新发布  3.按价格从低到高  4.按价格从高到低
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
            // 按价格从低到高
            params.orderBy = 'PRICE_SORT'
            params.isAsc = true
            break
          case 4:
            // 按价格从高到低
            params.orderBy = 'PRICE_SORT'
            params.isAsc = false
            break
        }
        if (params.platformPriceStart || params.platformPriceEnd) {
          params.platformPriceStart =
            this.ctx.helper.calculate(`${params.platformPriceStart}*100`)
          params.platformPriceEnd =
            this.ctx.helper.calculate(`${params.platformPriceEnd}*100`)
        } else {
          delete params.platformPriceStart
          delete params.platformPriceEnd
        }
        delete params.sortBy
        delete params.needTypes
        delete params.dictCode
        params.withFieldDetail = 1 // 需要属性详情
        const result = await service.curl.curlPost(url, params);
        let arr = []
        result.data.records.forEach((item) => {
          let {
            id,
            name,
            classCode,
            goodsCode,
            platformPrice,
            fieldList,
          } = item
          fieldList = resetJyField(params.classCode,  [
            {
              "goodsId": "607991998237798464",
              "goodsCode": "ZZ20201217115458",
              "fieldName": "安全生产许可证",
              "fieldCode": "safety_production_license",
              "fieldDesc": "",
              "fieldRemark": null,
              "moduleCode": "qualification_information",
              "fieldValue": "是",
              "fieldValueCn": null,
              "ext1": null,
              "ext2": null,
              "ext3": null,
              "ext4": null,
              "ext5": null,
              "resourceId": null,
              "fiedlType": "FIELD_TYPE_RADIO",
              "fieldValueList": [
                "是"
              ]
            },
            {
              "goodsId": "607991998237798464",
              "goodsCode": "ZZ20201217115458",
              "fieldName": "注册资本",
              "fieldCode": "qualification_registered_capital",
              "fieldDesc": "",
              "fieldRemark": null,
              "moduleCode": "qualification_information",
              "fieldValue": "1.0E7",
              "fieldValueCn": null,
              "ext1": null,
              "ext2": null,
              "ext3": null,
              "ext4": null,
              "ext5": null,
              "resourceId": null,
              "fiedlType": "FIELD_TYPE_TEXT",
              "fieldValueList": [
                "1.0E7"
              ]
            },
            {
              "goodsId": "607991998237798464",
              "goodsCode": "ZZ20201217115458",
              "fieldName": "注册地区",
              "fieldCode": "qualification_registration_area",
              "fieldDesc": "",
              "fieldRemark": null,
              "moduleCode": "qualification_information",
              "fieldValue": "510000,510100,510104",
              "fieldValueCn": null,
              "ext1": null,
              "ext2": null,
              "ext3": null,
              "ext4": null,
              "ext5": null,
              "resourceId": null,
              "fiedlType": "FIELD_TYPE_PROVINCE_CITY",
              "fieldValueList": [
                "510000",
                "510100",
                "510104"
              ]
            },
            {
              "goodsId": "607991998237798464",
              "goodsCode": "ZZ20201217115458",
              "fieldName": "到期时间",
              "fieldCode": "qualification_expire_date",
              "fieldDesc": "",
              "fieldRemark": null,
              "moduleCode": "qualification_information",
              "fieldValue": "1704038400000",
              "fieldValueCn": null,
              "ext1": null,
              "ext2": null,
              "ext3": null,
              "ext4": null,
              "ext5": null,
              "resourceId": null,
              "fiedlType": "FIELD_TYPE_DATE_SINGLE",
              "fieldValueList": [
                "1704038400000"
              ]
            }
          ])
          // todo platformPrice金额需要转换成元，在这里是分
          arr.push({
            id,
            name,
            classCode,
            referencePrice: platformPrice,
            fieldList,
            productNo: goodsCode,
          })
        })
        result.data.records = arr;
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = goodsListService;
