/**
 * @Description: 本模块用于推荐数据的查询
 * @author zhaoDongMing
 * @date 2020/12/11 11:09:42
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { algorithmApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/recommend');

@Prefix('/nk/recommend')
class RecommendController extends Controller {
  // 推荐规划师
  @Get('/v1/planner.do')
  async recommendPlanner() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getRecommendPlanner(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[6],
      algorithmApi.plannerRecom
    );
    const {
      area,
      deviceId,
      level_2_ID,
      login_name,
      productType,
      sceneId,
      user_id,
      platform,
      page,
      limit,
    } = ctx.query;
    const { status, data } = await service.curl.curlPost(url, {
      area,
      deviceId,
      level_2_ID,
      login_name,
      productType,
      sceneId,
      user_id,
      platform,
    });
    if (status === 200 && data.code === 200) {
      // 假如不需要加载服务项目,直接返回产品详情
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

}
module.exports = RecommendController;
