/*
 * @Author: xiao pu
 * @Date: 2020-12-04 11:15:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-04 13:42:57
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/shoppingCar.js
 */

"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");
const { contentApi } = require("./../../config/serveApi/index");

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
    const listUrl = this.helper.assembleUrl(
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

    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
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

    const url = this.helper.assembleUrl(
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

    const url = this.helper.assembleUrl(
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
}

module.exports = ShoppingCarController;
