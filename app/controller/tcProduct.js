/**
 * @Description: 本模块用于交易资源详情各项数据查询
 * @author zhaoDongMing
 * @date
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { productApi } = require('./../../config/serveApi/index');
const rules = require('../validate/tcProduct');

// 经营时间转换
function businessHours(ctx, time) {
  const businessHours = ctx.helper.moment(+new Date() - (+new Date() - +new Date(time))).fromNow(true);
  return businessHours;
}
// 注册资本转换
function registCapitalFormat(ctx, capital) {
  const capitalY = ctx.helper.priceFixed(`${capital}/100`, 2);
  if (capitalY < 10000) {
    return '1万以下';
  } else if (capitalY >= 10000 && capitalY < 20000) {
    return '1-2万';
  } else if (capitalY >= 20000 && capitalY < 50000) {
    return '2-5万';
  } else if (capitalY >= 50000 && capitalY <= 100000) {
    return '5-10万';
  } else if (capitalY > 100000) {
    return '10万以上';
  }
}
// 地址转换
function addressFormat(address) {
  let addressStr = '';
  try {
    addressStr = address.split(',').join('');
  } catch (e) {
    addressStr = address;
  }
  return addressStr;
}
@Prefix('/nk/tc_product')
class TcProductController extends Controller {
  @Get('/v1/detail.do')
  async getTcProductDetail() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getTcProductDetail(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.getTcProductDetail
    );
    const {
      productId, // 产品ID
      fieldDetail = 1, // 字段详情  0不需要(默认) 1需要
      costDetail = 0, // 成本详情  0不需要(默认) 1需要
      originalData = 0, // 脱敏字段原数据  0不需要(默认) 1需要
      classifyConfig = 0, // 交易资源分类配置  0不需要(默认) 1需要
    } = ctx.query;
    const { code, message, data } = await service.curl.curlPost(url, {
      id: productId,
      fieldDetail,
      costDetail,
      originalData,
      classifyConfig,
    });
    if (code === 200) {
      // 假如不需要加载服务项目,直接返回产品详情
      const baseDataKeys = {
        'CATE-JYZY-GS': [
          'company_industry', // 行业
          'registration_time', // 经营时间
          'taxpayer_type', // 纳税类型
          'registered_capital', // 注册资本
          'bank_account_information', // 开户信息
          'registration_area', // 地址
          'business_scope', // 经营范围
        ],
        'CATE-JYZY-SB': [
          'trademark_category', // 类别
          'code', // 注册号
          'trademark_status', // 状态
          'trademark_portfolio', // 组合
          'applicable_items', // 适用项目
          'similar_group', // 类似群组
        ],
        'CATE-JYZY-ZL': [
          'patent_type', // 类型
          'code', // 专利号
          'patent_status', // 状态
          'patent_classification', // 分类
          'patent_date_of_application', // 申请日期
          'effective_date', // 有效日期
        ],
        'CATE-JYZY-ZZ': [
          'qualification_registration_area', // 地区
          'qualification_expire_date', // 到期时间
          'transfer_method', // 转让方式
          'safety_production_license', // 安许证
          'qualification_registered_capital', // 注册资本
          'qualification_type', // 资质分类
          'tax_type', // 纳税类型
        ],
      };
      /** *todo:********基本信息************/
      // 获取数据字典
      const dictCodeList = await ctx.service.findDict.findDictChild('CATE-JYZY');
      // 获取到当前分类的数据字典
      const currentDict = dictCodeList.filter(dict => dict.ext1 === data.classCodeLevelList[0]);
      // 根据获取到的数据字典,匹配到当前分类对应的数据
      const baseData = [];
      data.fieldList.forEach(item => {
        // 当前是资质时,获取到filedList中的资质信息,单独提出
        if (currentDict[0].code === 'CATE-JYZY-ZZ' && item.fieldCode === 'qualification_type') {
          data.qftDetails = item;
          return;
        }
        // 假如该字段是前端需要的自动
        if (baseDataKeys[currentDict[0].code].includes(item.fieldCode)) {
          if (item.fieldCode === 'qualification_registration_area' || item.fieldCode === 'registration_area') {
            item.fieldValueCn = addressFormat(item.fieldValueCn);
          } else if (item.fieldCode === 'registered_capital' || item.fieldCode === 'qualification_registered_capital') {
            item.fieldValueCn = registCapitalFormat(ctx, item.fieldValueCn);
          } else if (item.fieldCode === 'registration_time') {
            item.fieldValueCn = businessHours(ctx, item.fieldValueCn);
          } else if (item.fieldCode === 'qualification_expire_date') {
            item.fieldValueCn = `${item.fieldValueCn ? item.fieldValueCn : item.fieldValue}年`;
          }
          baseData.push(item);
        }
      });
      // 过滤好的交易产品属性
      data.fieldList = baseData;
      // 当前对应的数据字典信息
      data.dictCode = currentDict[0].code;
      // 处理价格
      data.platformPrice = ctx.helper.priceFixed(`${data.platformPrice}/100`, 2);
      // 响应结果数据
      ctx.helper.success({ ctx, code: 200, res: data });
    } else {
      ctx.logger.error(code, message);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = TcProductController;
