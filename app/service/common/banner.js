"use strict";
const Service = require("egg").Service;
const { contentApi } = require("../../../config/serveApi/index");
class bannerService extends Service {
    /**
     * 获取广告列表服务API（HTTP）
     * @locationCodeList { Array } locationCodeList 广告编码
     * @return { Object } 返回请求结果数据
     */
    async getAdList(locationCodeList = []) {
        return new Promise(async (resolve) => {
            const { ctx, app } = this;
            const adUrl = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[0],
                contentApi.findAdList
            );
            console.log(adUrl);
            try {
                ctx.headers["X-User-Agent"] =
                    "4b43c3f3-d817-4576-95b1-ad8519a2f14e";
                const result = await ctx.curl(adUrl, {
                    // 必须指定 method
                    method: "GET",
                    // 默认将网管处理后的headers给后端服务
                    headers: ctx.headers,
                    // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
                    dataType: "json",
                    data: {
                        locationCodeList,
                    },
                    timeout: 10 * 1000,
                });
                console.log(result);
                const advertising = {};
                // 广告数据处理
                if (
                    result.code === 200 &&
                    result.data &&
                    Array.isArray(result.data)
                ) {
                    result.data.forEach((item) => {
                        advertising[item.locationCode] = item;
                    });
                }
                resolve({
                    code: result.code,
                    message: result.message,
                    data: advertising,
                });
            } catch (err) {
                ctx.logger.error(err);
                resolve(ctx.helper.errMessage(err));
            }
        });
    }
}
module.exports = bannerService;
