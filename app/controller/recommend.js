/**
 * @Description: 本模块用于推荐数据的查询
 * @author zhaoDongMing
 * @date 2020/12/11 11:09:42
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const {
  algorithmApi,
  merchantApi,
  productApi,
} = require('./../../config/serveApi/index');
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
async function resDefaultObj(ctx) {
// 接口报错,请求商户中心规返回空数据
  const { limit, page, sceneId } = ctx.query;
  // 先从缓存中获取推荐产品列表
  const recommendProduct = await ctx.service.redis.get(sceneId);
  // 获取到缓存数据
  if (recommendProduct) {
    await ctx.helper.success({
      ctx,
      code: 200,
      res: {
        currentPage: page,
        limit,
        totalPage: Math.ceil(recommendProduct.length / limit),
        totalCount: recommendProduct.length,
        records: recommendProduct.slice((page - 1) * limit, limit * page),
      },
    });
    return;
  }
  await ctx.helper.success({
    ctx,
    code: 200,
    res: {
      currentPage: page,
      limit,
      totalPage: 0,
      totalCount: 0,
      records: [],
    },
  });
  return;
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
    const recommendPlanner = await ctx.service.redis.get(sceneId);
    // 获取到缓存数据
    if (recommendPlanner) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: {
          currentPage: page,
          limit,
          totalPage: Math.ceil(recommendPlanner.records.length / limit),
          totalCount: recommendPlanner.records.length,
          records: recommendPlanner.records.slice((page - 1) * limit, limit * page),
        },
      });
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
          ctx.service.redis.set(sceneId, plannerList.data, 60 * 60);
          ctx.helper.success({
            ctx,
            code: 200,
            res: {
              currentPage: page,
              limit,
              totalPage: Math.ceil(plannerList.data.records.length / limit),
              totalCount: plannerList.data.records.length,
              records: plannerList.data.records.slice(
                (page - 1) * limit,
                limit * page
              ),
            },
          });
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
  // 推荐产品
  @Get('/v1/product.do')
  async recommendProduct() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getRecommendProduct(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const {
      searchType,
      userId,
      deviceId,
      formatId,
      areaCode,
      sceneId,
      storeId,
      productId,
      productType,
      title,
      platform,
      page,
      limit,
    } = ctx.query;

    // 假如缓存没有数据,获取推荐算法重新查询并缓存
    // 获取到推荐产品请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[6],
      algorithmApi.productRecom
    );
    const { code, message, data } = await service.curl.curlPost(url, {
      userId,
      deviceId,
      formatId,
      areaCode,
      sceneId,
      storeId,
      productId,
      productType,
      title,
      platform,
    });
    if (code === 200) {
      if (data.productInfoList.length < 1) {
        // 兜底
        await resDefaultObj(ctx);
        return;
      }
      let productUrl = null;
      const params = {};
      // 1是交易
      if (searchType === 1) {
        productUrl = ctx.helper.assembleUrl(
          app.config.apiClient.APPID[1],
          productApi.getTradingListToIds
        );
        params.fieldDetail = 1;
        params.ids = data.productInfoList;
      //  2是服务
      } else {
        productUrl = ctx.helper.assembleUrl(
          app.config.apiClient.APPID[1],
          productApi.productDetails
        );
        params.productIds = data.productInfoList;
        params.needRefConfig = false;
      }

      // 查询出所有推荐的规划师数据信息
      const productList = await service.curl.curlPost(productUrl, params);
      if (productList.code === 200 && productList.data.length > 0) {
        try {
          // 获取显示标签
          const tagsKeys = {
            FL20201207080003: [
              'company_industry', // 公司行业
              'taxpayer_type', // 纳税类型
              'registered_capital', // 注册资本
              'registration_time', // 注册时间
            ],
            FL20201202065056: [
              'trademark_type', // 商标分类
              'similar_group', // 组合类型
            ],
            FL20201202065055: [
              'patent_type', // 专利类型
              'patent_industry', // 专利行业
              'patent_status', // 状态
            ],
            FL20201202065054: [
              'qualification_registration_area', // 区域
              'qualification_expire_date', // 到期时间
              'safety_production_license', // 安许证
              'qualification_registered_capital', // 注册资本
            ],
          };
          // 将得到的推荐数据存入缓存一小时失效
          const productListData = productList.data;
          if (searchType === 1) {
            // 推荐产品需要展示的属性字段
            productListData.forEach((list, index) => {
              productListData[index].fieldList = list.fieldList.filter(item => {
                if (list.classCodeLevelList && tagsKeys[list.classCodeLevelList[0]]) {
                  return tagsKeys[list.classCodeLevelList[0]].includes(item.fieldCode);
                }
                return false;
              });
            });
          }
          const limitProductData = [ ...productListData ].slice((page - 1) * limit, page * limit);
          ctx.helper.success({
            ctx,
            code: 200,
            res: {
              currentPage: page,
              limit,
              totalPage: Math.ceil(productListData.length / limit),
              totalCount: productListData.length,
              records: limitProductData,
            },
          });
          ctx.service.redis.set(sceneId, productListData);
          return;
        } catch (err) {
          ctx.logger.error(err);
          // 兜底
          await resDefaultObj(ctx);
          return;
        }
      } else {
        // 兜底
        await resDefaultObj(ctx);
        return;
      }
    } else {
      ctx.logger.error(code, message);
      // 兜底
      await resDefaultObj(ctx);
      return;
    }
  }
}
module.exports = RecommendController;
