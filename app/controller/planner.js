/*
 * @Author: xiao pu
 * @Date: 2020-12-04 10:54:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-11 16:48:07
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/planner.js
 */
"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");

const { merchantApi } = require("./../../config/serveApi/index");

const getValiErrors = function (app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return true;
  }
  return false;
};

@Prefix("/nk/planner/v1")
class PlannerController extends Controller {
  @Post("/list.do")
  async list() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      userId: { type: "string", required: false }, // 查找我的规划师有用
      plannerName: { type: "string", required: false },
      regionDto: {
        type: "object",
        required: false,
        rule: {
          codeState: [1, 2, 3], // 经营区域Code类型  1省  2市 3区
          regions: { type: "array", required: false }, // 经营区域Code
        },
      },
      sort: {
        type: "object",
        required: false,
        rule: {
          value: [1, 2], // 1升序   2降序
          sortType: ["pointSort", "reputationSort", "payNumSort"], // 积分排序 好评率排序 成交次数排序
        },
      },
      status: { type: "number", required: false }, // 在职状态(-1全部 0禁用/小黑屋 1启用 3离职）
      limit: { type: "number", required: true },
      page: { type: "number", required: true },
    };

    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const {
      userId,
      plannerName,
      regionDto,
      sort,
      status = -1,
      limit,
      page,
    } = ctx.request.body;

    //TODO 有userID 先查大数据获取
    let mchUserIds = [];
    if (userId) {
      mchUserIds = ["607991207963818368"];
    }

    // 先查询列表
    if (sort) Object.assign(listParams, { [sort.sortType]: sort.value });
    const listResult = await service.planner.getPlannerList({
      plannerName,
      regionDto,
      mchUserIds,
      status,
      sort,
      limit,
      page,
    });
    if (listResult.status !== 200 || listResult.data.code !== 200) {
      ctx.helper.fail({
        ctx,
        code: listResult.status,
        res: data,
        detailMessage: listResult.data.message || "请求失败",
      });
      return;
    }

    const listData = listResult.data.data || {};
    const listRecords = listData.records || [];

    // 办公地址
    const addressIds = listRecords.map((item) => item.officeAddressId);
    const addressResultPromise = service.planner.getAddressList({ addressIds });
    // 标签
    const listMchUserIds = listRecords.map((item) => item.mchUserId);
    const categoryResultPromise = service.planner.getCategoryList({
      mchUserIds: listMchUserIds,
    });

    // // TODO再并发请求 照片
    const [addressResult, categoryResult] = await Promise.all([
      addressResultPromise,
      categoryResultPromise,
    ]);

    if (
      addressResult.status === 200 &&
      addressResult.data.code === 200 &&
      categoryResult.status === 200 &&
      categoryResult.data.code === 200
    ) {
      const adRes = addressResult.data.data || [];
      const tagRes = categoryResult.data.data || [];
      const res = service.planner.mergeAdTagImgTolist(
        listRecords,
        adRes,
        tagRes
      );
      ctx.helper.success({
        ctx,
        code: 200,
        res,
      });
      return;
    }

    ctx.helper.fail({
      ctx,
      code: 500,
      res: {},
      detailMessage: "请求失败",
    });
  }

  @Get("/detail.do")
  async detail() {
    const { ctx, service, app } = this;
    const rules = {
      id: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;
    const { id } = ctx.query;
    // 查询详情
    const detailUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[5],
      merchantApi.detail
    );
    const detailResultPromise = service.curl.curlGet(detailUrl, {
      mchUserId: id,
    });

    // 积分排名查询
    const rankUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[5],
      merchantApi.rank
    );
    const rankResultPromise = await service.curl.curlPost(rankUrl, {
      mchUserId: id,
    });

    const categoryResultPromise = service.planner.getCategoryList({
      mchUserIds: [id],
    });

    const [detailResult, rankResult, categoryResult] = await Promise.all([
      detailResultPromise,
      rankResultPromise,
      categoryResultPromise,
    ]);

    // TODO 请求头像图片接口(前端统一规则)
    if (
      detailResult.status === 200 &&
      detailResult.data.code === 200 &&
      rankResult.status === 200 &&
      rankResult.data.code === 200 &&
      categoryResult.status === 200 &&
      categoryResult.data.code === 200
    ) {
      const detailRes = detailResult.data.data || {};
      const rankRes = rankResult.data.data || {};
      const categoryRes = categoryResult.data.data || {};
      const tagList = categoryRes[0].tagNameList;

      ctx.helper.success({
        ctx,
        code: 200,
        res: Object.assign({}, detailRes, rankRes, { tagList }),
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: 500,
      res: {},
      detailMessage: "请求失败",
    });
  }

  @Get("/tel.do")
  async getTel() {
    const { ctx, service, app } = this;
    const rules = {
      id: { type: "string", required: true },
      sensitiveInfoType: { type: "string", required: false },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;
    const { id, sensitiveInfoType = "MCH_USER" } = ctx.query;
    // 查询详情
    const sensitiveUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[5],
      merchantApi.sensitiveInfo
    );
    const { data, status } = await service.curl.curlPost(sensitiveUrl, {
      id,
      sensitiveInfoType, // 预约人手机号:APPOINTMENT 商户用户手机号: MCH_USER 商户超管手机号：MCH_ADMIN_USER 商户法人身份证号：MCH_LEGAL_PERSON_CARD_NO 联系人手机号: MCH_LINK_MAN 用户的身份证号码: MCH_USER_PERSON_CARD_NO
    });

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
      code: data.code || status,
      res: data,
      detailMessage: "请求失败",
    });
  }
}

module.exports = PlannerController;
