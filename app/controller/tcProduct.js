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
        FL20201207080003: [
          'company_industry', // 行业
          'registration_time', // 经营时间
          'taxpayer_type', // 纳税类型
          'registered_capital', // 注册资本
          'bank_account_information', // 开户信息
          'registration_area', // 地址
          'business_scope', // 经营范围
        ],
        FL20201202065056: [
          'trademark_category', // 类别
          'code', // 注册号
          'trademark_status', // 状态
          'trademark_portfolio', // 组合
          'applicable_items', // 适用项目
          'similar_group', // 类似群组
        ],
        FL20201202065055: [ 'patent_type', // 类型
          'code', // 专利号
          'patent_status', // 状态
          'patent_classification', // 分类
          'patent_date_of_application', // 申请日期
          'effective_date', // 有效日期
        ],
        FL20201202065054: [
          'qualification_registration_area', // 地区
          'qualification_expire_date', // 到期时间
          'transfer_method', // 转让方式
          'safety_production_license', // 安许证
          'qualification_registered_capital', // 注册资本
          'qualification_type', // 资质分类
        ],
      };
      // 基本信息
      const baseData = data.fieldList.filter(item => baseDataKeys[data.classCodeLevelList[0]].includes(item.fieldCode));
      data.fieldList = baseData;
      ctx.helper.success({ ctx, code: 200, res: data });
    } else {
      ctx.logger.error(code, message);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = TcProductController;
