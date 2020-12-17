/**
 * @Description: 本模块用于推荐数据的查询
 * @author zhaoDongMing
 * @date 2020/12/11 11:09:42
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { algorithmApi, merchantApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/recommend');

async function getMchSettled(ctx) {
// 假如算法接口异常或者是算法没数据需要获取用户中心规划师列表兜底
  const { service } = ctx;
  const { page, limit } = ctx.query;
  const planner = await service.planner.getPlannerList({
    limit,
    page,
    status: 1,
  });
  if (planner.code === 200) {
    ctx.helper.success({ ctx, code: 200, res: planner.data });
    return;
  }
  ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
}

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
    // 先从缓存中获取推荐规划师列表
    const recommendPlanner = await ctx.service.redis.get('shupian-wap-recommend-planner-lis');
    // 获取到缓存数据
    if (recommendPlanner) {
      ctx.helper.success({ ctx, code: 200, res: {
        currentPage: page,
        limit,
        totalPage: Math.ceil(recommendPlanner.length / limit),
        totalCount: recommendPlanner.length,
        records: recommendPlanner.slice((page - 1) * limit, limit),
      } });
      return;
    }
    // 假如缓存没有数据,获取推荐算法重新查询并缓存
    // 获取到推荐规划师请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[6],
      algorithmApi.plannerRecom
    );
    const { code, data } = await service.curl.curlPost(url, {
      area,
      deviceId,
      level_2_ID,
      login_name,
      productType,
      sceneId,
      user_id,
      platform,
    });
    if (code === 200) {
      // 查询到算法规划师id查询用户规划师
      // ctx.helper.success({ ctx, code: 200, res: data.data });
      const { ctx, app, service } = this;
      const mchSettledUrl = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[5],
        merchantApi.list
      );
      // 查询出所有推荐的规划师数据信息
      const plannerList = await service.curl.curlPost(mchSettledUrl, {
        mchUserIds: data.planerInfoList,
      });
      if (plannerList.code === 200 && plannerList.data.records.length > 0) {
        try {
          // 将得到的推荐数据存入缓存一小时失效
          ctx.service.redis.set('shupian-wap-recommend-planner-list', plannerList.data, 60 * 60);
          ctx.helper.success({ ctx, code: 200, res: {
            currentPage: page,
            limit,
            totalPage: Math.ceil(plannerList.data.records.length / limit),
            totalCount: plannerList.data.records.length,
            records: plannerList.data.records.slice((page - 1) * limit, limit),
          } });
        } catch (err) {
          ctx.logger.error(err);
          // 接口报错,请求商户中心规划师列表兜底
          await getMchSettled(ctx);
          return;
        }
      } else {
        // 接口报错,请求商户中心规划师列表兜底
        await getMchSettled(ctx);
        return;
      }
    } else {
      // 接口报错,请求商户中心规划师列表兜底
      await getMchSettled(ctx);
      return;
    }
  }
}
module.exports = RecommendController;
