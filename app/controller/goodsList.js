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
      const goodsList = service.goodsList.getGoodsList(ctx.request.body);
      resArrs.push(goodsList)
      if (ctx.request.body.needTypes === 1) {
        // 需要返回分类筛选参数
        // 获取到请求地址
        const url = ctx.helper.assembleUrl(
          app.config.apiClient.APPID[0],
          contentApi.dataDict
        );
        // 发送httpClient请求
        const dict = service.curl.curlAll(url, {
          method: 'GET',
          data: {
            code: 'CRISPS_SUBJECTS',
          },
        });
        resArrs.push(dict)
      }
      const data = await Promise.all(resArrs)
      if(data[0].status === 200 && data[0].data.code === 200) {
        resBody.goods = data[0].data.data
      } else {
        resBody.goods = {}
      }
      if (ctx.request.body.needTypes === 1) {
        if(data[1].status === 200 && data[1].data.code === 200) {
          resBody.typeData = data[1].data.data
        } else {
          resBody.typeData = {}
        }
      }
      if (JSON.stringify(resBody.goods) === '{}' && JSON.stringify(resBody.typeData) === '{}') {
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
