'use strict';
const Controller = require('egg').Controller;
const { Post, Get, Prefix } = require('egg-shell-decorators');
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
      showClient: { type: 'string', required: false }, // 展示终端code
      sortBy: {type: 'string', required: false}, // 排序CONDITION-QF-SORT-MR：默认排序，CONDITION-QF-SORT-XLDG：按销量从低到高，CONDITION-QF-SORT-XLGD：按销量从高到低，CONDITION-QF-SORT-JGDG:按价格从低到高,CONDITION-QF-SORT-JGGD:按价格从高到低,
      // orderBy: { type: 'string', required: false }, // 排序方式（DEFAULT_SORT默认排序、SALES_SORT销量排序、REFERENCE_PRICE_SORT参考价格排序）
      // isAsc: { type: 'boolean', required: false }, // 是否正序
      classCodes: { type: 'string', required: false }, // 分类code   多个英文逗号分隔
      areaCodes: { type: 'string', required: false }, // 城市code  多个英文逗号分隔
      needTag: { type: 'boolean', required: false }, // 是否展示标签
      needAttr: { type: 'boolean', required: false }, // 是否展示筛选、商品属性
      needSkuAttr: { type: 'boolean', required: false }, // 是否展示sku属性
      keywords: { type: 'string', required: false }, // 搜索关键词
      screenAttrIds: { type: 'array', required: false }, // 筛选标签集合
    };
    for(const k in ctx.request.body) {
      const val = ctx.request.body[k]
      if(val === 'undefined' ||
        val === undefined ||
        val === null ||
        val === 'null' ||
        val === ''
      ) {
        delete ctx.request.body[k]
      }
    }
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
        // 查询服务列表筛选项包括分类和排序列表
        const serveFilters = service.getServeFilters.getServeFilters()
        resArrs.push(serveFilters)
      }
      const data = await Promise.all(resArrs)
      if(data[0].status === 200 && data[0].data.code === 200) {
        resBody.goods = data[0].data.data
      } else {
        resBody.goods = {}
      }
      if (ctx.request.body.needTypes === 1) {
        // 需要返回筛选数据
        if(data[1] && data[1].code === 200) {
          resBody.typeData = data[1].data[0]
          resBody.sortFilter = data[1].data[1]
        } else {
          resBody.typeData = []
          resBody.sortFilter = []
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
    for(const k in ctx.request.body) {
      const val = ctx.request.body[k]
      if(val === 'undefined' ||
        val === undefined ||
        val === null ||
        val === 'null' ||
        val === ''
      ) {
        delete ctx.request.body[k]
      }
    }
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
