/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/information')

class foundController extends Controller {
  @Get('/v1/home')
  async home() {
    // 获取首屏数据，不需要传参
    const { ctx, service } = this;
    // 获取分类
    const { status, data } = await service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/category/v1/detail.do`, {
      method: 'GET',
      data: {},
    });
    let categoryList = null;
    // 获取到分类数据后默认请求第一个分类下的广告数据
    const getBanner = service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/advertising/v1/find_advertising.do`, {
      method: 'GET',
      data: {
        locationCode: categoryList[0].code,
      },
    });
    // 获取到分类数据后默认请求第一个分类下的列表数据
    const getList = service.curl.curlGet(`${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/content/v1/find_page.do`, {
      method: 'GET',
      data: {
        categoryCode: categoryList[0].code,
        type: '资讯',
        limit: 10,
        page: 1,
        platformCode: '薯片',
      },
    });
    if (status === 200 && data.code === 200) {
      // 若获取分类请求正常返回数据
      categoryList = data.records;
      const reqAll = [ getBanner, getList ];
      try {
        const initAllRes = await Promise.all(reqAll);
        console.log(initAllRes);
      } catch (error) {
        console.log(error);
      }

    }
  }

  @Get('/v1/list')
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
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
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
        total: data.data.total,
        currentPage: data.data.currentPage,
      } });
    }
  }

  @Get('/v1/detail')
  async detail() {
    // 获取资讯详情
  }
}

module.exports = foundController;
