'use strict';
const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/dict');


@Prefix('/nk/goodslist')
class ContentController extends Controller {
  @Post('/v1/get_serve_list.do')
  async getServiceList() {
    const { ctx, service, app } = this;
    const resBody = {};
    // 定义参数校验规则
    const rules = {
      start: { type: 'number', required: true },
      limit: { type: 'number', required: true },
      needTypes: { type: 'number', required: true }, // 是否需要分类数据，0不需要，1需要
      showClient: { type: 'string', required: true }, // 展示终端code
      orderBy: { type: 'string', required: false }, // 排序方式（DEFAULT_SORT默认排序、SALES_SORT销量排序、REFERENCE_PRICE_SORT参考价格排序）
      isAsc: { type: 'boolean', required: false }, // 是否正序
      classCodes: { type: 'string', required: false }, // 分类code   多个英文逗号分隔
      areaCodes: { type: 'string', required: false }, // 城市code  多个英文逗号分隔
      needTag: { type: 'boolean', required: false }, // 是否展示标签
      needAttr: { type: 'boolean', required: false }, // 是否展示筛选、商品属性
      needSkuAttr: { type: 'boolean', required: false }, // 是否展示sku属性
      keywords: { type: 'string', required: false }, // 搜索关键词
      screenAttrIds: { type: 'array', required: false }, // 筛选标签集合
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    try {
      let resArrs = []
      // 请求商品数据
      const goodsList = service.goodsList.getServeGoodsList(ctx.request.body);
      resArrs.push(goodsList)
      if (ctx.request.body.needTypes === 1) {
        // 需要返回分类筛选参数
        // 获取到请求地址
        const url = ctx.helper.assembleUrl(
          app.config.apiClient.APPID[0],
          contentApi.dataDict
        );
        // 查询服务产品排序字典
        const dict = service.curl.curlAll(url, {
          method: 'GET',
          data: {
            code: 'CONDITION-QF-SORT',
          },
        });
        resArrs.push(dict)
        // 查询分类接口
        // const classify = service
        // resArrs.push(classify)
      }
      const data = await Promise.all(resArrs)
      if(data[0].status === 200 && data[0].data.code === 200) {
        resBody.goods = data[0].data.data
      } else {
        resBody.goods = {}
      }
      if (ctx.request.body.needTypes === 1) {
        // 需要返回筛选数据
        if(data[1] && data[1].status === 200 && data[1].data.code === 200) {
          resBody.sortFilter = data[1].data.data
        } else {
          resBody.sortFilter = {}
        }
        if(data[2] && data[2].status === 200 && data[2].data.code === 200) {
          resBody.typeData = data[1].data.data
        } else {
          resBody.typeData = {}
        }
      }
      if (JSON.stringify(resBody.goods) === '{}' && JSON.stringify(resBody.typeData) === '{}') {
        ctx.logger.error(data[0].status, data[1].status, data[2].status, resBody);
        ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
      } else {
        ctx.helper.success({ ctx, code: 200, res: resBody });
      }
    } catch (e) {
      ctx.logger.error(e);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  @Post('/v1/get_jy_list.do')
  async getJyList() {
    const { ctx, service, app } = this;
    const resBody = {};
    // 定义参数校验规则
    const rules = {
      start: { type: 'number', required: true },
      limit: { type: 'number', required: true },
      needTypes: { type: 'number', required: true }, // 是否需要分类数据，0不需要，1需要
      sort: { type: 'number', required: false }, // 排序 1.综合排序（默认）  2.最新发布  3.按价格从高到低  4.按价格从低到高
      classCode: { type: 'string', required: true }, // 产品分类
      withFieldDetail: { type: 'string', required: false }, // 字段详情标志,0不需要字段详情(默认) 1需要字段详情
      searchKey: { type: 'string', required: false }, // 搜索关键词
      fieldList: { type: 'array', required: false},
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    try {
      let resArrs = []
      // 请求商品数据
      const goodsList = service.goodsList.getJyGoodsList(ctx.request.body);
      resArrs.push(goodsList)
      if (ctx.request.body.needTypes === 1) {
        // 需要返回分类筛选参数
        // 查询字典
        const dict = service.getJyFilters.getJyFilters();
        resArrs.push(dict)
      }
      const data = await Promise.all(resArrs)
      console.log(data)
      if(data[0].status === 200 && data[0].data.code === 200) {
        resBody.goods = data[0].data.data
      } else {
        resBody.goods = {}
      }
      if (ctx.request.body.needTypes === 1) {
        // 需要返回筛选项
        if(data[1].code === 200) {
          resBody.filters = data[1].data
        } else {
          resBody.filters = {}
        }
      }
      if (JSON.stringify(resBody.goods) === '{}' && JSON.stringify(resBody.filters) === '{}') {
        ctx.logger.error(data[0].status, data[1].status, resBody);
        ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
      } else {
        ctx.helper.success({ ctx, code: 200, res: resBody });
      }
    } catch (e) {
      ctx.logger.error(e);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = ContentController;
