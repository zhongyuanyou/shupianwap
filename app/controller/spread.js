'use strict';
/**
 * @author tangdaibing
 * @since 2020/12/18
 * @param productType 产品类型 服务类型
 * @param pageCode 聚合页编码
 * @param locations 广告位置集合
 * @param showNum 是否展示今日数据累计数据
 * @param baseTodayNum 基础今日数据
 */
const Controller = require('egg').Controller;
const {
  Get,
  Post,
  Prefix,
} = require('egg-shell-decorators');
const {
  contentApi,
} = require('../../config/serveApi/index');
@Prefix('/nk/spread')
class DemoController extends Controller {
  @Post('/v1/list.do')
  async list() {
    const { ctx, app, service } = this;
    const rules = {
      productType: { type: 'string', required: true },
      pageCode: { type: 'string', required: true },
      locations: { type: 'array', required: true },
      showNum: { type: 'boolean', required: false },
      baseTodayNum: { type: 'number', required: false },
    };
    // 进行参数校验
    const valiErrors = app.validator.validate(
      rules,
      ctx.request.body
    );
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const adUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.findAdList
    );
    let adList = [];
    if (ctx.request.body.locations) {
      const { data, status } = await service.curl.curlPost(
        adUrl,
        {
          locationCode: ctx.request.body.locations,
        }
      );
      ctx.logger.info('广告物料返回', data);
      if (status === 200 && data.code === 200) {
        adList = data.data;
      }
    }
    const nums = {};
    if (
      ctx.request.body.showNum &&
      ctx.request.body.baseTodayNum &&
      ctx.request.body.pageCode
    ) {
      // 需要缓存接口数据
      const cacheKeyToday = ctx.helper.cacheKey(
        ctx.request.body.pageCode + 'today'
      );
      const cacheData = await ctx.service.redis.get(
        cacheKeyToday
      );
      console.log('todayNum', cacheData);
      nums.todayNum = cacheData;
      // 需要缓存接口数据
      const cacheKeyTotal = ctx.helper.cacheKey(
        ctx.request.body.pageCode + 'total'
      );
      const total = await ctx.service.redis.get(
        cacheKeyTotal
      );
      nums.totalNum = total;
    }
    // // 批量查询产品详情 http://yapi.dgg.cn/project/81/interface/api/23319
    // const productDetailsUrl = ctx.helper.assembleUrl(
    //   app.config.apiClient.APPID[1],
    //   contentApi.productDetails
    // );
    // const productDetailsPromise = service.curl.curlPost(productDetailsUrl, {
    //   productIds,
    // });
    ctx.helper.success({
      ctx,
      code: 200,
      res: {
        nums,
        adList,
      },
    });
  }
}

module.exports = DemoController;
