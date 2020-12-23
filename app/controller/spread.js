'use strict';
/**
 * @author tangdaibing
 * @since 2020/12/18
 * @param productType 产品类型 服务类型
 * @param pageCode 聚合页编码
 * extendBankServer 银行服务
 * extendBussineWithdraw 工商注销
 * extendSealEngraving 印章刻制
 * extendTaxPlanning 税务筹划
 * extendSysAuth 体系认证
 * extendBussineReg 工商注册
 * extendLicence 许可证
 * extendBussineChange 工商变更
 * extendNetWorkQualifications 互联网资质
 * extendBussineHome 工商首页
 * extendAccount 代理记账
 * @param locations 广告位置集合
 * @param showNum 是否展示今日数据累计数据
 */
const Controller = require('egg').Controller;
const adRes = require('../data/adData');
const productRes = require('../data/product');
const {
  Get,
  Post,
  Prefix,
} = require('egg-shell-decorators');
const {
  contentApi,
} = require('../../config/serveApi/index');
@Prefix('/nk/spread')
class SpreadController extends Controller {
  @Get('/v1/list.do')
  async list() {
    const { ctx, app, service } = this;
    const rules = {
      productType: { type: 'string', required: false },
      pageCode: { type: 'string', required: true },
      locations: { type: 'array', required: false },
      showNum: { type: 'boolean', required: false },
    };
    // 进行参数校验
    const valiErrors = app.validator.validate(
      rules,
      ctx.query
    );
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 广告物料数据
    // let adList=[]
    // const adUrl = ctx.helper.assembleUrl(
    //   app.config.apiClient.APPID[0],
    //   contentApi.findAdList
    // );
    // if (ctx.query.locations) {
    //   const { data, status } = await service.curl.curlPost(
    //     adUrl,
    //     {
    //       locationCode: ctx.query.locations,
    //     }
    //   );
    //   if (status === 200 && data.code === 200) {
    //     adList =
    //       data.data.length > 10
    //         ? data.data.splice(0, 3)
    //         : data.data;
    //   }
    // } else {
    //   adList = [];
    // }

    // 产品详情
    // const productObj = {
    //   id: '',
    //   name: '',
    //   referencePrice: '', // 参考价格（元）
    //   operating: {
    //     showName: '', // 前端展示名称
    //     slogan: '', // 广告语
    //     productDescribe: '', // 产品说明
    //     defaultSales: '', // 基础销量
    //     actualSales: '', // 实际销量
    //     actualViews: '', // 实际浏览量
    //   },
    // };

    // 批量查询产品详情
    // const productIds = ['cp00001', 'cp00002', 'cp00003'];
    // const productDetailsUrl = ctx.helper.assembleUrl(
    //   app.config.apiClient.APPID[1],
    //   contentApi.productDetails
    // );
    // const prodoctRes = await service.curl.curlPost(
    //   productDetailsUrl,
    //   {
    //     productIds,
    //     needOperating: true,
    //   }
    // );
    // let productDetails;
    // if (
    //   prodoctRes.status === 200 &&
    //   prodoctRes.code === 200
    // ) {
    //   productDetails = prodoctRes.data;
    // } else {
    //   productDetails = [];
    // }
    // 广告物料数据模拟
    const adList = adRes.data.filter(item => {
      return item.pageCode === ctx.query.pageCode;
    });
    const plannerRes = await service.curl.curlPost(
      'http://172.16.132.35:1553/planner/recommend',
      {
        designerIds: '3879830#202254#9635931#10862#10970',
        formatType:
          ctx.query.pageCode === 'extendAccount'
            ? '会计'
            : '工商',
        maxsize: 10,
      }
    );
    console.log('plannerRes', plannerRes);
    let planlerList = [];
    if (
      plannerRes.status === 200 &&
      (plannerRes.data.code === 0 ||
        plannerRes.data.code === 200)
    ) {
      planlerList = plannerRes.data.data;
    }
    let products = [];
    if (productRes.code === 200) {
      products = productRes.data;
    }
    // 产品数据
    for (let i = adList.length - 1; i >= 0; i--) {
      for (
        let j = adList[i].sortMaterialList.length - 1;
        j >= 0;
        j--
      ) {
        for (
          let k =
            adList[i].sortMaterialList[j].materialList
              .length - 1;
          k >= 0;
          k--
        ) {
          for (let m = products.length - 1; m >= 0; m--) {
            const obj1 =
              adList[i].sortMaterialList[j].materialList[k];
            if (obj1.productId === products[m].id) {
              obj1.productDetail = products[m];
            }
          }
        }
      }
    }
    // 今日数据，累计数据
    const nums = {};
    if (
      ctx.query.pageCode === 'extendAccount' ||
      ctx.query.pageCode === 'extendBankServer'
    ) {
      const cacheKeyToday = ctx.helper.cacheKey(
        ctx.query.pageCode + 'today'
      );
      nums.todayNum = await ctx.service.redis.get(
        cacheKeyToday
      );
      const cacheKeyTotal = ctx.helper.cacheKey(
        ctx.query.pageCode + 'total'
      );
      nums.totalNum = await ctx.service.redis.get(
        cacheKeyTotal
      );
    }
    const res = {};
    if (nums.totalNum) {
      res.nums = nums;
    }
    res.adList = adList;
    res.planlerList = planlerList;
    ctx.helper.success({
      ctx,
      code: 200,
      res,
    });
  }
}

module.exports = SpreadController;
