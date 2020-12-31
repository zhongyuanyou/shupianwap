/** @Author: MaLiang
 * @Date: 2020-12-03 15:11:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 15:11:00
 * @Description: wap端首页接口
 * @FilePath: /chips-wap/app/controller/home.js
 * */
'use strict';
const Controller = require('egg').Controller;
const { contentApi, productApi } = require('../../config/serveApi/index');
const { RULES } = require('../../config/constant/jyFieldRules');
const { GOODSLIST } = require('../../config/constant/defaultGoodsImg');
const { productRules } = require('../validate/home');
const { Get, Prefix, Post } = require('egg-shell-decorators');
const { BASE_CACHE_TIME } = require('../../config/constant/cacheTime');

// 获取广告列表
const getBannerList = async (ctx, service, locationCodeList) => {
  try {
    return await service.common.banner.getAdList(locationCodeList);
  } catch (error) {
    ctx.logger.error(error);
  }
};

// 获取资讯列表
const getInfoList = async (ctx, service, { limit, page }) => {
  try {
    return await service.common.content.list({ limit, page });
  } catch (error) {
    ctx.logger.error(error);
  }
};

@Prefix('/nk/home')
class homeController extends Controller {
  /**
   * 查询首页首屏数据（广告、导航）
   */
  @Post('/v1/get_home_data.do')
  async findAdNav() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCodeList: { type: 'array', required: true }, // 广告编码
      fixedNavCategoryCode: { type: 'string', required: true }, // 固定导航分类code
      fixedLimit: { type: 'integer', required: true }, // 固定导航每页条数
      fixedPage: { type: 'integer', required: true }, // 固定导航当前页
      rollNavCategoryCode: { type: 'string', required: true }, // 滚动导航分类code
      platformCode: { type: 'string', required: true }, // 平台code
      terminalCode: { type: 'string', required: true }, // 终端code
      rollLimit: { type: 'integer', required: true }, // 滚动导航每页条数
      rollPage: { type: 'integer', required: true }, // 滚动导航当前页
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取广告
    const findBanner = getBannerList(
      ctx,
      service,
      ctx.request.body.locationCodeList
    );
    const includeField =
      'id,imageUrl,navigationImageUrl,name,url,wapRoute,navigationImageUrl,navigationWay,executionParameters'; // 字段筛选过滤
    const navUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.findNav
    );
    // 获取固定导航数据
    const findFixedNav = service.curl.curlGet(navUrl, {
      categoryCode: ctx.request.body.fixedNavCategoryCode,
      platformCode: ctx.request.body.platformCode,
      terminalCode: ctx.request.body.terminalCode,
      limit: ctx.request.body.fixedLimit,
      page: ctx.request.body.fixedPage,
      includeField,
    });
    // 获取滚动导航数据
    const findRollNav = service.curl.curlGet(navUrl, {
      categoryCode: ctx.request.body.rollNavCategoryCode,
      platformCode: ctx.request.body.platformCode,
      terminalCode: ctx.request.body.terminalCode,
      limit: ctx.request.body.rollLimit,
      page: ctx.request.body.rollPage,
      includeField,
    });
    const reqArr = [findBanner, findFixedNav, findRollNav];
    try {
      const resData = await Promise.all(reqArr);
      console.log('光告：', resData[0]);
      console.log('固定', resData[1]);
      console.log('滚动', resData[2]);
      let advertising = {}; // 广告数据
      let fixedNavList = []; // 固定导航数据
      let rollNavList = []; // 滚动导航数据
      // 广告数据处理
      if (resData[0].code === 200) {
        Object.keys(resData[0].data).forEach((key) => {
          advertising[key] = resData[0].data[key].sortMaterialList;
        });
      }
      // 固定导航数据处理
      if (resData[1].code === 200) {
        fixedNavList = resData[1].data.rows;
      }
      // 滚动导航数据处理
      if (resData[2].code === 200) {
        rollNavList = resData[2].data.rows;
      }
      ctx.helper.success({
        ctx,
        code: 200,
        res: {
          advertising,
          fixedNavList,
          rollNavList,
        },
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  /**
   * 查询首页非首屏数据（站点、广告、资讯）
   */
  @Post('/v1/get_home_asyn_data.do')
  async findHomeAsynData() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCodeList: { type: 'array', required: true }, // 广告编码
      infoLimit: { type: 'integer', required: true }, // 资讯每页数量
      infoPage: { type: 'integer', required: true }, // 资讯当前页
      categoryCode: { type: 'string', required: false }, // 查询资讯的分类code
      platformCode: { type: 'string', required: true }, // 查询资讯的平台code
      terminalCode: { type: 'string', required: true }, // 查询资讯的终端code
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取站点
    const findCity = service.common.city.getSiteList();
    // 获取广告
    const findBanner = getBannerList(
      ctx,
      service,
      ctx.request.body.locationCodeList
    );
    // 获取资讯（调公用接口）
    const findInformation = getInfoList(ctx, service, {
      limit: ctx.request.body.infoLimit,
      page: ctx.request.body.infoPage,
      categoryCode: ctx.request.body.categoryCode,
      platformCode: ctx.request.body.platformCode,
      terminalCode: ctx.request.body.terminalCode,
    });

    const reqArr = [findCity, findBanner, findInformation];
    try {
      const resData = await Promise.all(reqArr);
      let cityList = []; // 站点数据
      let advertising = {}; // 广告数据
      let information = []; // 资讯数据
      // 站点数据处理
      if (resData[0].code === 200) {
        cityList = resData[0].data.cityList;
      }
      // 广告数据处理
      if (resData[1].code === 200) {
        advertising = resData[1].data;
      }
      // 资讯数据处理
      if (resData[2].code === 200) {
        information = resData[2].data.rows || [];
      }

      ctx.helper.success({
        ctx,
        code: 200,
        res: {
          cityList,
          advertising,
          information,
        },
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  /**
   * 查询站点
   */
  @Get('/v1/find_city_list.do')
  async findInfoList() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      cityName: { type: 'string', required: false }, // 站点名称
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取站点
    try {
      const resData = await service.common.city.getSiteList(ctx.query.cityName);
      ctx.helper.success({
        ctx,
        code: 200,
        res: resData.data,
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  /**
   * 查询资讯列表
   */
  @Get('/v1/find_info_list.do')
  async findInfo() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      limit: { type: 'integer', required: true }, // 每页条数
      page: { type: 'integer', required: true }, // 当前页
      categoryCode: { type: 'string', required: false }, // 查询资讯的分类code
      platformCode: { type: 'string', required: true }, // 查询资讯的平台code
      terminalCode: { type: 'string', required: true }, // 查询资讯的终端code
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    try {
      const resData = await getInfoList(ctx, service, {
        limit: ctx.query.limit,
        page: ctx.query.page,
        categoryCode: ctx.request.body.categoryCode,
        platformCode: ctx.request.body.platformCode,
        terminalCode: ctx.request.body.terminalCode,
      });
      ctx.helper.success({
        ctx,
        code: 200,
        res: {
          infoList: resData.data.rows || [],
        },
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  /**
   * 查询推荐列表
   */
  @Post('/v1/find_recom_list.do')
  async findRecomList() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const findTypeRules = {
      findType: { type: 'integer', required: true, min: 0, max: 2 }, // 查询类型：0：初始查询广告+数据字典  1：查询广告+推荐商品 2：只查推荐商品
    };
    // 参数校验
    const findTypeValiErrors = app.validator.validate(
      findTypeRules,
      ctx.request.body
    );
    // 参数校验未通过
    if (findTypeValiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: findTypeValiErrors });
      return;
    }
    // 查询推荐产品所需参数
    let params = {
      userId: ctx.request.body.userId, // 用户id
      deviceId: ctx.request.body.deviceId, // 设备id
      areaCode: ctx.request.body.areaCode, // 区域code
      sceneId: ctx.request.body.sceneId, // 场景ID
      maxsize: ctx.request.body.maxsize, // 要要推荐产品的数量
      productType: ctx.request.body.productType, // 需要推荐的产品类别
      formatId: ctx.request.body.formatId, // 产品三级类别,没有三级类别用二级类别
    };
    // 查询广告所需参数
    let locationCode = ctx.request.body.locationCode;
    let findRomReq = {};
    let productData = {
      dictData: [],
      adData: [],
      goodsList: [],
    };
    const findAdAndproduct = async () => {
      try {
        // 获取推荐产品ids
        const findRecom = service.common.recom.getRecomProductIdList(params);
        // 查询广告
        const findadData = getBannerList(ctx, service, [locationCode]);
        const resArr = await Promise.all([findadData, findRecom]);
        const adCode = ctx.request.body.locationCode;
        if (resArr[0].code === 200) {
          productData.adData = resArr[0].data[adCode]
            ? resArr[0].data[adCode].sortMaterialList
            : []; // 广告数据
        }
        findRomReq = resArr[1]; // 暂存推荐接口返回数据
      } catch (error) {
        ctx.logger.error(error);
      }
    };
    try {
      // findType === 0 初始查询广告+数据字典
      if (ctx.request.body.findType === 0) {
        // 定义参数校验规则
        const dictionaryCodeRules = {
          dictionaryCode: {
            type: 'string',
            required: true,
          }, // 查讯数据字典的code
          limit: {
            type: 'integer',
            required: true,
          },
          page: {
            type: 'integer',
            required: true,
          },
        };
        // 参数校验
        const dictionaryCodeValiErrors = app.validator.validate(
          dictionaryCodeRules,
          ctx.request.body
        );
        // 参数校验未通过
        if (dictionaryCodeValiErrors) {
          ctx.helper.fail({ ctx, code: 422, res: dictionaryCodeValiErrors });
          return;
        }

        const cacheKey = ctx.helper.cacheKey(
          ctx.method,
          ctx.path,
          ctx.request.body.dictionaryCode
        );
        // 获取缓存的数据字典数据
        const cacheData = await service.redis.get(cacheKey);
        // 命中缓存
        if (cacheData) {
          productData.dictData = cacheData;
        }

        // 未命中缓存
        if (!cacheData) {
          const sysCode = app.config.apiClient.APPID[0];
          const dict = contentApi.dataDict; // 查询字典
          const dictUrl = ctx.helper.assembleUrl(sysCode, dict);
          const codeData = await service.curl.curlGet(dictUrl, {
            code: ctx.request.body.dictionaryCode,
          });
          // 处理字典数据
          if (codeData.code === 200 && codeData.data.length) {
            const dictData = [];
            codeData.data.forEach((item) => {
              if (item.ext2.indexOf('wap') !== -1) {
                dictData.push({
                  id: item.id,
                  code: item.code,
                  name: item.name,
                  ext1: item.ext1,
                  ext2: item.ext2,
                  ext3: item.ext3,
                  ext4: item.ext4,
                  ext5: item.ext5,
                  limit: ctx.request.body.limit,
                  page: ctx.request.body.page,
                  noMore: false,
                  adData: [],
                  goodsList: [],
                });
              }
            });
            // 设置缓存数据字典数据
            service.redis.set(cacheKey, dictData, BASE_CACHE_TIME);
            productData.dictData = dictData; // 字典数据
          }
        }

        if (productData.dictData.length) {
          locationCode = productData.dictData[0].ext1; // 获取广告位code
          const findadData = await getBannerList(ctx, service, [locationCode]);
          if (findadData.code === 200) {
            productData.adData = findadData.data[locationCode]
              ? findadData.data[locationCode].sortMaterialList
              : []; // 广告数据
          }
        }
      }
      //  findType === 1 查询广告+推荐商品
      if (ctx.request.body.findType === 1) {
        // 定义参数校验规则
        const adRules = {
          locationCode: { type: 'string', required: true }, // 查询广告的位置code
          formatId: { type: 'string', required: true }, // 分类code
        };
        const adAndRocRules = Object.assign(adRules, productRules);
        // 参数校验
        const adAndRocValiErrors = app.validator.validate(
          adAndRocRules,
          ctx.request.body
        );
        // 参数校验未通过
        if (adAndRocValiErrors) {
          ctx.helper.fail({ ctx, code: 422, res: adAndRocValiErrors });
          return;
        }
        await findAdAndproduct();
      }
      // findType === 2  只查推荐商品
      if (ctx.request.body.findType === 2) {
        // 定义参数校验规则
        const rpcRules = {
          formatId: { type: 'string', required: true }, // 分类code
        };
        const nweRules = Object.assign(rpcRules, productRules);
        // 参数校验
        const rpcValiErrors = app.validator.validate(
          nweRules,
          ctx.request.body
        );
        // 参数校验未通过
        if (rpcValiErrors) {
          ctx.helper.fail({ ctx, code: 422, res: rpcValiErrors });
          return;
        }
        // 获取推荐产品ids
        findRomReq = await service.common.recom.getRecomProductIdList(params);
      }

      let classCodeList = []; // 记录每个产品的分类code,用于查询分类详情中的图片
      // 过滤交易产品属性数据
      function jyGoodsHandle(goodsList) {
        if (!goodsList || !goodsList.length) {
          return [];
        }
        const attribute = RULES[params.formatId];
        const nweGoodsList = [];
        goodsList.forEach((item) => {
          let attrArr = [];
          if (item.fieldList && item.fieldList.length && attribute) {
            attrArr = item.fieldList.filter((utm) => {
              return attribute.indexOf(utm.fieldCode) > -1;
            });
            attrArr.forEach((a, b) => {
              attrArr.splice(b, 1, a.fieldValueCn || a.fieldValue);
            });
          }
          nweGoodsList.push({
            id: item.id,
            name: item.name,
            type: item.classCodeLevelList[0] || params.formatId,
            goodsPrice: ctx.helper.priceFixed(`${item.goodsPrice}/ 100`, 2), // 处理价格
            platformPrice: ctx.helper.priceFixed(
              `${item.platformPrice}/ 100`,
              2
            ), // 处理价格
            classCode: item.classCode,
            fieldList: attrArr,
          });
          classCodeList.push(item.classCode);
        });
        return nweGoodsList;
      }

      // 从算法部获取到推荐产品id成功
      if (ctx.request.body.findType !== 0 && findRomReq.code === 200) {
        // 根据前台的分页参数，动态选取一部分id
        const start = (ctx.request.body.page - 1) * ctx.request.body.limit;
        const end = ctx.request.body.page * ctx.request.body.limit;
        const pagetionList = findRomReq.data.productInfoList.slice(start, end);
        // 根据 ids 调用产中心 查询 交易资源详情-批量
        const getRecomPro = await service.common.tradingProduct.recommendList(
          pagetionList
        );
        if (getRecomPro.code === 200) {
          productData.goodsList = jyGoodsHandle(getRecomPro.data);
          productData.describe = '推荐';
        }
      }
      // 从算法部获取到推荐产品id失败
      if (
        ctx.request.body.findType !== 0 &&
        !productData.goodsList.length &&
        ctx.request.body.page === 1
      ) {
        const sysCode = app.config.apiClient.APPID[1];
        const address = productApi.getJyServeList;
        const url = ctx.helper.assembleUrl(sysCode, address);
        // 查询产品中心交易资源搜索接口，返回搜索的产品列表作为推荐数据返给前端
        const res = await service.curl.curlPost(url, {
          classCode: ctx.request.body.formatId, // 产品类别
          start: ctx.request.body.page, // 当前页
          limit: ctx.request.body.limit, // 每页条数
          withFieldDetail: 1, // 字段详情标志,0不需要字段详情(默认) 1需要字段详情
        });
        if (res.code === 200) {
          productData.goodsList = jyGoodsHandle(res.data.records);
          productData.describe = '搜索';
        }
      }

      // 根据产品分类code查询产品分类详情(为交易产品设置图片)
      if (ctx.request.body.findType !== 0 && classCodeList.length) {
        // 数组去重
        function unique(arr) {
          // 如果新数组的当前元素的索引值 == 该元素在原始数组中的第一个索引，则返回当前元素
          return arr.filter(function (item, index) {
            return arr.indexOf(item, 0) === index;
          });
        }
        classCodeList = unique(classCodeList);
        const classDetauls = await service.common.tradingProduct.getClassfiyDetail(
          classCodeList
        );
        if (classDetauls.code === 200 && classDetauls.data.length) {
          classDetauls.data.forEach((item) => {
            productData.goodsList.forEach((key) => {
              if (item.code === key.classCode) {
                if (
                  Array.isArray(
                    item.classOperatingResponse.defaultProductFileIdUrls
                  ) &&
                  item.classOperatingResponse.defaultProductFileIdUrls.length
                ) {
                  key.defaultImg =
                    item.classOperatingResponse.defaultProductFileIdUrls[0];
                } else {
                  key.defaultImg = GOODSLIST; // 交易产品默认图
                }
              }
            });
          });
        }
      }
      ctx.helper.success({
        ctx,
        code: 200,
        res: productData,
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = homeController;
