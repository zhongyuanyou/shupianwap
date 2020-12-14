"use strict";
const Service = require("egg").Service;
const { contentApi } = require("../../../config/serveApi/index");
class cityService extends Service {
    /**
     * 获取站点列表服务API（HTTP）
     * @locationCodeList { String } cityName 市名称，模糊匹配
     * @return { Object } 返回请求结果数据
     */
    async getSiteList(cityName = "") {
        return new Promise(async (resolve) => {
            const { ctx, app } = this;
            const url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[0],
                contentApi.findSiteList
            );
            try {
                ctx.headers["X-User-Agent"] =
                    "4b43c3f3-d817-4576-95b1-ad8519a2f14e";
                const result = await ctx.curl(url, {
                    // 必须指定 method
                    method: "GET",
                    // 默认将网管处理后的headers给后端服务
                    headers: ctx.headers,
                    // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                    dataType: "json",
                    data: {
                        cityName,
                    },
                    timeout: 10 * 1000,
                });
                resolve({
                    code: result.data.code,
                    message: result.data.message,
                    data: result.data.data.cityList || [],
                });
            } catch (err) {
                ctx.logger.error(err);
                resolve(ctx.helper.errMessage(err));
            }
        });
    }

  /**
   * 获取所有地区数据（get）
   * @return { Object } 返回请求结果数据
   */
  async getCityList() {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      try {
        const sysCode = app.config.apiClient.APPID[0];
        const address = contentApi.dataDictsTier;
        const url = ctx.helper.assembleUrl(sysCode, address);
        if (!url) {
          resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
        }
        const result = await service.curl.curlGet(url, {code: 'PRO_TRADING_GOODS_TYPE'});
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = cityService;
