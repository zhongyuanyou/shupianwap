/*
 * @Author: xiao pu
 * @Date: 2020-12-11 14:34:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-25 16:32:39
 * @Description: file content
 * @FilePath: /chips-wap/app/service/planner.js
 */

'use strict';
const Service = require('egg').Service;
const { merchantApi } = require('./../../config/serveApi/index');
class plannerService extends Service {
  /**
   * 获取规划师列表（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.addressIds 地址数组
   * @return { Promise } 返回请求结果数据
   */
  async getPlannerList({
    plannerName,
    regionDto,
    userCenterIds = [],
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
        resolve({ ctx, code: 202, message: '缺少后端服务请求API路径' });
      }
      try {
        const listParams = {
          userCenterIds,
          searchKey: plannerName,
          regionDto,
          mchUserIds,
          status,
          limit,
          start: page,
          findType: 1, // 1 查询所有的服务商和消化商，排除运营商
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
        merchantApi.tagList
      );
      if (!url) {
        resolve({ ctx, code: 202, message: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlPost(url, {
          // TODO: 测试
          // mchUserIds: ['607990864366434868', '607990967445645276'],
          mchUserIds,
          number: 5,
          mchBusinessEnum: 'FIRST_TYPE', // FIRST_TYPE: 一级分类,  SECOND_TYPE: 二级分类,  THIRD_TYPE:三级分类,   PRODUCT_BUSINESS_TYPE:产品或者服务项目
        });

        if (result.code !== 200) {
          resolve(result);
          return;
        }

        const recodes = result.data || [];
        const formatData = mchUserIds.map((id) => {
          const matched = recodes.find((item) => {
            const { mchUserId } = item || {};
            return mchUserId === id;
          });
          let tagNameList = [];
          if (matched) {
            const { details } = matched;
            if (Array.isArray(details)) {
              tagNameList = details.map((item) => item.name);
            }
          }
          return {
            mchUserId: id,
            tagNameList,
          };
        });

        resolve(
          Object.assign(result, {
            data: formatData,
          })
        );
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
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const addressIdsStr = JSON.stringify(addressIds);
        const result = await service.curl.curlPost(url, addressIdsStr);
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 获取规划师头像（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.mchUserIds 规划师id数组
   * @return { Promise } 返回请求结果数据
   */
  async getPlannerImgList({ mchUserIds = [] }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[5],
        merchantApi.getAvatarIds
      );
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlPost(url, {
          keyType: 'MCH_USER_HEAD',
          filePath: true,
          codes: mchUserIds,
        });
        if (result.code !== 200) {
          resolve(result);
          return;
        }
        const { data } = result;
        const formatData = mchUserIds.map((id) => {
          let img = '';
          if (Array.isArray(data)) {
            const matched = data.find((item) => {
              const { code } = item || {};
              return code === id;
            });
            img = matched ? matched.filePath : '';
          }
          return {
            mchUserId: id,
            img,
          };
        });
        resolve(
          Object.assign(result, {
            data: formatData,
          })
        );
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  // 合并 办公地址，标签，图片等数据 到规划师列表
  mergeAdTagImgTolist(targetArray, adArray, tagArray, imgArray) {
    if (
      !Array.isArray(targetArray) ||
      !Array.isArray(adArray) ||
      !Array.isArray(adArray) ||
      !Array.isArray(imgArray)
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
      const matchImg =
        imgArray.find((imgItem) => imgItem.mchUserId === item.mchUserId) || {};
      const img = matchImg.filePath || '';
      return Object.assign({}, item, { officeAddress, tagList, img });
    });
  }
}
module.exports = plannerService;
