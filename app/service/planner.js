/*
 * @Author: xiao pu
 * @Date: 2020-12-11 14:34:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-14 14:59:48
 * @Description: file content
 * @FilePath: /chips-wap/app/service/planner.js
 */

"use strict";
const Service = require("egg").Service;
const { merchantApi } = require("./../../config/serveApi/index");
class goodsListService extends Service {
  /**
   * 获取规划师列表（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.addressIds 地址数组
   * @return { Promise } 返回请求结果数据
   */
  async getPlannerList({
    plannerName,
    regionDto,
    mchUserIds = [],
    status,
    sort,
    limit,
    page,
  }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[5],
        merchantApi.list
      );
      if (!url) {
        resolve({ ctx, code: 202, res: "缺少后端服务请求API路径" });
      }
      try {
        const listParams = {
          searchKey: plannerName,
          regionDto,
          mchUserIds,
          status,
          limit,
          start: page,
        };
        if (sort) Object.assign(listParams, { [sort.sortType]: sort.value });
        const result = await service.curl.curlPost(url, listParams);
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 获取获取规划师授权业务数据（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.mchUserIds 规划师id组
   * @return { Promise } 返回请求结果数据
   */
  async getCategoryList({ mchUserIds }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[5],
        merchantApi.categoryList
      );
      if (!url) {
        resolve({ ctx, code: 202, res: "缺少后端服务请求API路径" });
      }
      try {
        const result = await service.curl.curlPost(url, {
          // TODO: 测试
          mchUserIds: ["607990864366434868", "607990967445645276"],
          // mchUserIds,
          statusParamCode: "ENABLE", // 查询状态码 DISABLE禁用 ，ENABLE启用，默认查询所有
          limit: mchUserIds.length * 3, // 做多查 3条
          start: 1,
        });

        const { data = {}, status } = result;
        if (status !== 200 || data.code !== 200) {
          resolve(result);
          return;
        }

        const dataResult = data.data || {};
        const recodes = dataResult.records || [];
        const formateData = mchUserIds.map((id) => {
          const tagNameList = recodes.reduce((accumulator, current) => {
            const { mchUserId, firstTypeName } = current; // 获取 第一类的名字
            // 正式逻辑
            // if (id === mchUserId && !accumulator.includes(firstTypeName)) {
            //   accumulator.push(firstTypeName);
            // }
            //TODO 测试逻辑
            if (!accumulator.includes(firstTypeName)) {
              accumulator.push(firstTypeName);
            }
            return accumulator;
          }, []);
          return {
            mchUserId: id,
            tagNameList,
          };
        });

        resolve({
          status,
          data: Object.assign({}, data, { data: formateData }),
        });
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 获取规划师地址（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.addressIds 地址数组
   * @return { Promise } 返回请求结果数据
   */
  async getAddressList({ addressIds = [] }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[5],
        merchantApi.addressList
      );
      if (!url) {
        resolve({ ctx, code: 202, res: "缺少后端服务请求API路径" });
      }
      try {
        const result = await service.curl.curlPost(url, addressIds);
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  // 合并 办公地址，标签，图片等数据 到规划师列表
  mergeAdTagImgTolist(targetArray, adArray, tagArray) {
    if (
      !Array.isArray(targetArray) ||
      !Array.isArray(adArray) ||
      !Array.isArray(adArray)
    ) {
      return [];
    }

    return targetArray.map((item) => {
      if (!item) return;
      const officeAddress =
        adArray.find((adItem) => adItem.id === item.officeAddressId) || {};
      const matchTag =
        tagArray.find((tagItem) => tagItem.mchUserId === item.mchUserId) || {};
      const tagList = matchTag.tagNameList || [];
      return Object.assign({}, item, { officeAddress, tagList });
    });
  }
}
module.exports = goodsListService;
