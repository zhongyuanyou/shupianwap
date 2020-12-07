/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
const { infoList, infoDetail, screenData } = require('../validate/found')
let information_class = null; // 资讯分类
let information_banner = null; // 资讯banner
let information_list = null; // 资讯列表
const getInformation = async function(service, bannerApi, listApi, locationCode, categoryCode, ctx, isInit) {
  // 请求分类下的广告数据
  const getBanner = service.curl.curlGet(bannerApi, {
    method: 'GET',
    data: {
      locationCode,
    },
  });
  // 请求分类下的列表数据
  const getList = service.curl.curlGet(listApi, {
    method: 'GET',
    data: {
      categoryCode,
      type: '资讯',
      limit: 10,
      page: 1,
      platformCode: '薯片',
    },
  });
  const reqAll = [ getBanner, getList ];
  try {
    const initAllRes = await Promise.all(reqAll);
    // 广告数据处理
    if (
      initAllRes[0].code === 200 &&
      initAllRes[0].data &&
      Array.isArray(initAllRes[0].data)
    ) {
      information_banner = initAllRes[0].data;
    }
    // 资讯列表处理
    if (
      initAllRes[1].code === 200 &&
      initAllRes[1].data &&
      Array.isArray(initAllRes[1].data)
    ) {
      information_list = initAllRes[1].data;
    }
    const resData = isInit ? {
      information_class,
      information_banner,
      information_list,
    } : {
      information_banner,
      information_list,
    };
    ctx.helper.success({
      ctx,
      code: 200,
      res: resData,
    });
  } catch (error) {
    ctx.logger.error(error);
    ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
  }
};
const getValiErrors = function(app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return;
  }
};
@Prefix('/nk/information')

class FoundController extends Controller {
  @Get('/v1/home.do')
  async home() {
    // 获取首屏数据，不需要传参
    const { ctx, app, service } = this;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.findCategoryDetail);
    // 获取分类
    const { status, data } = await service.curl.curlGet(
      url, {
        method: 'GET',
        data: {
          code: ctx.query.code,
        },
      });
    if (status === 200 && data.code === 200) {
      // 若获取分类请求正常返回数据
      information_class = data.data || [];
      const bannerApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.findAdList);
      const listApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoList);
      await getInformation(service, bannerApi, listApi, information_class[0].code, information_class[0].code, ctx, true);
    }
  }

  @Get('/v1/list.do')
  async list() {
    // 获取资讯列表
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, infoList, ctx.query);
    // 参数校验通过,正常响应
    const { limit = 10, page = 1, categoryCode, keyword } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoList);
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: {
        limit,
        page,
        categoryCode,
        keyword,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {
        information_list: data.data || [],
        totalCount: data.data.totalCount,
      } });
    }
  }

  @Get('/v1/detail.do')
  async detail() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, infoDetail, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoDetail);
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: {
        id,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data});
    }
  }

  @Get('/v1/banner_information.do')
  async information() {
    // 获取每个分类第一屏
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, screenData, ctx.query);
    // 参数校验通过,正常响应
    const { categoryCode, locationCode } = ctx.query;
    const bannerApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.findAdList);
    const listApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoList);
    await getInformation(service, bannerApi, listApi, locationCode, categoryCode, ctx, false);
  }
}

module.exports = FoundController;
