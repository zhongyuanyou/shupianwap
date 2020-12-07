/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
const getInformation = async function(service, bannerApi, listApi, locationCode, categoryCode, fn) {
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
    console.log(initAllRes);
    fn();
  } catch (error) {
    console.log(error);
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
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.firstScreen);
    // 获取分类
    const { status, data } = await service.curl.curlGet(
      url, {
        method: 'GET',
        data: {},
      });
    let categoryList = null;
    if (status === 200 && data.code === 200) {
      // 若获取分类请求正常返回数据
      categoryList = data.records;
      const bannerApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.advertising);
      const listApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoList);
      await getInformation(service, bannerApi, listApi, categoryList[0].code, categoryList[0].code, () => {
        console.log('11');
      });
    }
  }

  @Get('/v1/list.do')
  async list() {
    // 获取资讯列表
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      categoryCode: { type: 'string', required: false },
      keyword: { type: 'string', required: false },
      limit: { type: 'number', required: true },
      page: { type: 'number', required: true },
    };
    getValiErrors(app, ctx, rules, ctx.query);
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
        records: data.records,
        totalCount: data.data.totalCount,
      } });
    }
  }

  @Get('/v1/detail.do')
  async detail() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    const rules = {
      id: { type: 'string', required: false },
    };
    getValiErrors(app, ctx, rules, ctx.query);
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
      ctx.helper.success({ ctx, code: 200, res: {
        title: data.data.title,
        newsReadAll: data.data.newsReadAll,
        createTime: data.data.createTime,
        createrName: data.data.createrName,
        createrAvatar: data.data.createrAvatar,
        subtitle: data.data.subtitle,
        content: data.data.content,
        seoDescription: data.data.seoDescription,
        seoKeywords: data.data.seoKeywords,
        seoTitle: data.data.seoTitle,
      } });
    }
  }

  @Get('/v1/banner_information.do')
  async information() {
    // 获取每个分类第一屏
    const { ctx, service, app } = this;
    const rules = {
      categoryCode: { type: 'string', required: true },
      locationCode: { type: 'string', required: true },
    };
    getValiErrors(app, ctx, rules, ctx.query);
    // 参数校验通过,正常响应
    const { categoryCode, locationCode } = ctx.query;
    const bannerApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.advertising);
    const listApi = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.infoList);
    await getInformation(service, bannerApi, listApi, locationCode, categoryCode, () => {
      console.log('11');
    });
  }
}

module.exports = FoundController;
