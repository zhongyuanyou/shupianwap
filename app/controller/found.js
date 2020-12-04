/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const getInformation = async function(service, api, locationCode, categoryCode, fn) {
  // 请求分类下的广告数据
  const getBanner = service.curl.curlGet(`${api}/crisps-cms-web-api/nk/app/advertising/v1/find_advertising.do`, {
    method: 'GET',
    data: {
      locationCode,
    },
  });
  // 请求分类下的列表数据
  const getList = service.curl.curlGet(`${api}/crisps-cms-web-api/nk/app/content/v1/find_page.do`, {
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
@Prefix('/nk/information/v1')

class FoundController extends Controller {
  @Get('/home.do')
  async home() {
    // 获取首屏数据，不需要传参
    const { ctx, service } = this;
    // 获取分类
    const { status, data } = await service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/category/v1/detail.do`, {
      method: 'GET',
      data: {},
    });
    let categoryList = null;
    if (status === 200 && data.code === 200) {
      // 若获取分类请求正常返回数据
      categoryList = data.records;
      await getInformation(service, ctx.app.config.baseUrl, categoryList[0].code, categoryList[0].code, () => {
        console.log('11');
      });
    }
  }

  @Get('/list.do')
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
    const { status, data } = await service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/content/v1/find_page.do`, {
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

  @Get('/detail.do')
  async detail() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    const rules = {
      id: { type: 'string', required: false },
    };
    getValiErrors(app, ctx, rules, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const { status, data } = await service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/content/v1/find_detail.do`, {
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

  @Get('/banner_information.do')
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
    await getInformation(service, ctx.app.config.baseUrl, locationCode, categoryCode, () => {
      console.log('11');
    });
  }
}

module.exports = FoundController;
