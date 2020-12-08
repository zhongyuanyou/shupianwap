/*
 * @Author: xiao pu
 * @Date: 2020-12-04 11:15:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-07 20:18:55
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/shoppingCar.js
 */

"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");
const { contentApi, productApi } = require("./../../config/serveApi/index");

function getValiErrors(app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return true;
  }
  return false;
}

@Prefix("/yk/shoppingCar/v1")
class ShoppingCarController extends Controller {
  @Get("/list.do")
  async list() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      userId: { type: "string", required: true },
      limit: { type: "number", required: true },
      page: { type: "number", required: true },
    };

    if (getValiErrors(app, ctx, rules, ctx.query)) return;
    const listUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.shoppingCarList
    );
    const { status, data } = await service.curl.curlGet(
      listUrl,
      ctx.request.body
    );

    if (status !== 200 || data.code !== 200) {
      ctx.helper.fail({
        ctx,
        code: status,
        res: data,
        detailMessage: data.message || "请求失败",
      });
      return;
    }

    // TODO 根据list里面的sku的id, 还需要查询产品中心，相关的sku值，获取 图片，名字，价格等
    const carList = data.data.rows || [];
    const goodIds = [];
    const productIds = [];
    carList.forEach((item) => {
      const { skuId, productId } = item;
      goodIds.push(skuId);
      productIds.push(productId);
    });

    // 批量查询产品详情 http://yapi.dgg.cn/project/81/interface/api/23319
    const productDetailsUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      contentApi.productDetails
    );
    const productDetailsPromise = service.curl.curlPost(productDetailsUrl, {
      productIds,
    });

    // 批量查询商品详情 http://yapi.dgg.cn/project/81/interface/api/23320
    const goodsDetailsUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      contentApi.goodsDetails
    );
    const goodsDetailsPromise = service.curl.curlPost(goodsDetailsUrl, {
      goodsIds,
    });

    const [productDetailsResult, goodsDetailsResult] = await Promise.all([
      productDetailsPromise,
      goodsDetailsPromise,
    ]);

    if (
      productDetailsResult.status === 200 &&
      productDetailsResult.data.code === 200 &&
      goodsDetailsResult.status === 200 &&
      goodsDetailsResult.data.code === 200
    ) {
      const productDetails = productDetailsResult.data.data || [];
      const goodsDetails = goodsDetailsResult.data.data || [];

      const resData = carList.map((item) => {
        const { skuId, productId } = item || {};
        const skuDetail =
          goodsDetails.find((detail) => detail.id === skuId) || {};
        const productDetail =
          productDetails.find((detail) => detail.id === productId) || {};
        return Object.assign({}, item, skuDetail, productDetail); // TODO 后续可过滤
      });

      ctx.helper.success({
        ctx,
        code: 200,
        res: resData,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }

  @Post("/add.do")
  async add() {
    const { ctx, service, app } = this;
    const rules = {
      serviceList: {
        type: "array",
        itemType: "object",
        required: false,
        rules: {
          shopMerId: { type: "string" },
          skuId: { type: "string" },
          userId: { type: "string" },
        },
      },
      goodsNumber: { type: "number" },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.shoppingCarAdd
    );
    const { status, data = {} } = await service.curl.curlPost(
      url,
      ctx.request.body
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }

  @Get("/update.do")
  async update() {
    const { ctx, service, app } = this;
    const rules = {
      id: {
        type: "string",
        required: true,
      },
      type: ["update", "remove", "updateSkuItem", "select"], // update-修改商品数量  remove-将商品从购物车移除 updateSkuItem-修改商品sku属性 select 选中
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.shoppingCarUpdate
    );
    const { status, data = {} } = await service.curl.curlPost(
      url,
      ctx.request.body
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }

  @Post("/skuList.do")
  async skuList() {
    const { ctx, service, app } = this;
    const rules = {
      id: {
        // 产品id
        type: "string",
        required: false,
      },
      specialItemIds: {
        // 增值服务项
        type: "Array",
        required: false,
      },
      skuTypeIds: {
        // sku类型id列表
        type: "Array",
        required: false,
      },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    let { id, specialItemIds, skuTypeIds } = ctx.request.body;
    // 获取sku列表 http://yapi.dgg.cn/project/81/interface/api/15216
    if (id) {
      const productDetailUrl = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[1],
        productApi.productDetail
      );
      const { status, data } = await service.curl.curlPost(
        productDetailUrl,
        ctx.request.body
      );

      if (status !== 200 || data.code !== 200) {
        ctx.helper.fail({
          ctx,
          code: data.code,
          res: {},
        });
        return;
      }
      const { skuAttrs = [], specialItemList = [] } = data.data || {};
      skuTypeIds = skuAttrs.map((item) => item.attrId);
      specialItemIds = specialItemList.map((item) => item.serviceItemId);
    }

    // 获取sku每一类的名称 http://yapi.dgg.cn/project/81/interface/api/15280
    const skuAttrClassNameUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.skuAttrClassName
    );
    const skuAttrClassNamePromise = service.curl.curlPost(skuAttrClassNameUrl, {
      ids: skuTypeIds,
    });

    // 获取服务项列表 http://yapi.dgg.cn/project/81/interface/api/23240
    const serviceItemUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.serviceItemDetails
    );
    const serviceItemPromise = service.curl.curlPost(serviceItemUrl, {
      ids: specialItemIds,
    });

    let [skuAttrClassName, serviceItem] = await Promise.all([
      skuAttrClassNamePromise,
      serviceItemPromise,
    ]);
    if (
      skuAttrClassName.status === 200 &&
      skuAttrClassName.data.code === 200 &&
      serviceItem.status === 200 &&
      serviceItem.data.code === 200
    ) {
      // TODO 数据处理
      const data = {
        serviceItem: serviceItem.data,
        skuAttrClassName: skuAttrClassName.data,
      };
      ctx.helper.success({
        ctx,
        code: 200,
        res: data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: 400,
      res: {},
    });
  }

  @Get("/price.do")
  async price() {
    const { ctx, service, app } = this;
    const rules = {
      productId: {
        // 产品id
        type: "string",
        required: true,
      },
      attrValKey: {
        // 属性值标识组合
        type: "string",
        required: true,
      },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const productDetailUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.productDetail
    );
    const { status, data } = await service.curl.curlPost(
      productDetailUrl,
      ctx.query
    );

    if (status !== 200 || data.code !== 200) {
      ctx.helper.fail({
        ctx,
        code: data.code,
        res: {},
      });
      return;
    }

    const goodsId = data.data.id;
    const goodsPricelUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.goodsPrice
    );

    // 查询价格 http://yapi.dgg.cn/project/81/interface/api/15232
    const priceResult = await service.curl.curlPost(goodsPricelUrl, {
      goodsId,
    });
    if (priceResult.status === 200 && priceResult.data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: priceResult.data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: priceResult.status,
      res: priceResult.data,
      detailMessage: priceResult.data.message || "请求失败",
    });
  }
}

module.exports = ShoppingCarController;
