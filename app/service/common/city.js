"use strict";
const Service = require("egg").Service;
const { contentApi } = require("../../../config/serveApi/index");
class siteService extends Service {
    /**
     * 获取城市列表服务API（HTTP）
     * @locationCodeList { String } cityName 市名称，模糊匹配
     * @return { Object } 返回请求结果数据
     */
    async getCityList(cityName = "") {
        return new Promise(async (resolve) => {
            const { ctx, app } = this;
            const url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[0],
                contentApi.findCityList
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
                +resolve(ctx.helper.errMessage(err));
            }
        });
    }
}
module.exports = siteService;
