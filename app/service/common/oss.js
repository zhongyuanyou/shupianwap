/*
 * @Author: xiao pu
 * @Date: 2020-12-24 15:53:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 16:04:48
 * @Description: file content
 * @FilePath: /chips-wap/app/service/common/oss.js
 */

'use strict';
const Service = require('egg').Service;
const { architectureCenterApi } = require('../../../config/serveApi/index');
class ossService extends Service {
  /**
   * 获取oss存储信息（POST）
   * @data { Object } data 请求参数
   * @data { String } data.fileId 文件id
   * @return { Promise } 返回请求结果数据
   */
  async getFile({ fileId }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[7],
        architectureCenterApi.find
      );
      if (!url) {
        resolve({ ctx, code: 202, message: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlGet(url, { fileId });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * 获取oss存储信息（POST）
   * @data { Object } data 请求参数
   * @data { Array } data.fileIds 数组
   * @return { Promise } 返回请求结果数据
   */
  async getMutleFile({ fileIds }) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[7],
        architectureCenterApi.mutlefind
      );
      if (!url) {
        resolve({ ctx, code: 202, message: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlGet(url, { fileIds });
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = ossService;
