/**
 * @Description: 本模块用于服务商品详情各项数据查询
 * @author zhaoDongMing
 * @date
*/
'use strict';
const Controller = require('egg').Controller;
const { Post, Get, Prefix } = require('egg-shell-decorators');
const { productApi, contentApi } = require('./../../config/serveApi/index');
const rules = require('../validate/scProduct');

@Prefix('/nk/sc_product')
class ScProductDetailsController extends Controller {
  // 获取服务产品详情
  @Post('/v1/detail.do')
  async getScProductDetail() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductDetail(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const detailUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.productDetail
    );
    // 发送httpClient请求
    const scProParams = Object.assign({}, ctx.request.body);
    // 删除商品ID
    delete scProParams.commodityId;
    // 删除是否加载服务项目
    delete scProParams.serviceItem;
    const { status, data } = await service.curl.curlPost(detailUrl, scProParams);
    if (status === 200 && data.code === 200) {
      // 假如不需要加载服务项目,直接返回产品详情
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务产品服务项
  @Get('/v1/service_Items.do')
  async getScProductServiceItems() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductServiceItem(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.serviceItemList
    );
    const { status, data } = await service.curl.curlPost(url, ctx.query);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务产品属性
  @Get('/v1/attr_list.do')
  async getScProductAttrList() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductAttrList(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.skuAttrClassName
    );
    const { status, data } = await service.curl.curlPost(url, ctx.query);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务产品站点数据（当前产品可以销售的城市）
  @Get('/v1/site_list.do')
  async getScProductSiteList() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductSite(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到产品中心请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.getProGroupByPutAway
    );
    // 获取到CMS请求的Url
    const siteListUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.findCityList
    );
    // 获取到上架产品组的产品和产品对应的站点code
    const { status, data } = await service.curl.curlPost(url, ctx.query);
    if (status === 200 && data.code === 200) {
      // 根据获取到所有站点数据
      // 获取redis中缓存的站点信息
      let cityList = await ctx.service.redis.get('cityList');
      // 假如redis未查询到站点信息,需要再次查询站点信息
      if (!cityList) {
        const cityListResult = await service.curl.curlGet(siteListUrl);
        if (cityListResult.status === 200 && cityListResult.data.code === 200) {
          // 不适用await不需要让写redis阻塞响应
          // 格式化站点数据
          const siteList = {};
          // 将城市数据的code作为key存储在对象中
          cityListResult.data.data.cityList.forEach(item => {
            siteList[item.code] = item;
          });
          // 将全国地区存储到站点对象中
          siteList[cityListResult.data.data.national.code] = cityListResult.data.data.national;
          cityList = siteList;
          // 默认缓存站点数据一个小时
          ctx.service.redis.set('cityList', siteList, 60 * 60);
        } else {
          ctx.logger.error(status, data);
          ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
          // 未获取到站点信息直接返回错误,停止当前程序执行
          return;
        }
      }
      // 得到站点信息后获取区域code对应的站点名称
      const scProSite = [];
      data.data.forEach((item, idx) => {
        if (cityList[item.areaCode]) {
          data.data[idx].areaName = cityList[item.areaCode].name;
          scProSite.push(data.data[idx]);
        }
      });
      ctx.helper.success({ ctx, code: 200, res: scProSite });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务资源
  @Post('/v1/service_resource.do')
  async getServiceResource() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getServiceResource(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到产品中心请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.getServiceResource
    );
    // 获取到上架产品组的产品和产品对应的站点code
    const {
      classCode,
      searchKey,
      goodsNo,
      goodsPriceStart,
      goodsPriceEnd,
      fieldList = [],
      withFieldFlg,
      orderBy,
      isAsc,
      page = 1,
      limit = 10,
    } = ctx.request.body;
    const { status, data } = await service.curl.curlPost(url, {
      classCode,
      searchKey,
      goodsNo,
      goodsPriceStart,
      goodsPriceEnd,
      fieldList,
      withFieldFlg,
      orderBy,
      isAsc,
      start: page,
      limit,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = ScProductDetailsController;