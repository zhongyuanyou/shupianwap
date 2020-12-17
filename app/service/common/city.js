"use strict";
const Service = require("egg").Service;
const { contentApi } = require("../../../config/serveApi/index");
class cityService extends Service {
    /** @Author: MaLiang
     * 获取站点列表服务API（HTTP）
     * @locationCodeList { String } cityName 市名称，模糊匹配
     * @return { Object } 返回请求结果数据
     */
    async getSiteList(cityName = "") {
        return new Promise(async (resolve) => {
            const { ctx, app, service } = this;
            const url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[0],
                contentApi.findSiteList
            );
            try {
                const result = await service.curl.curlGet(url, { cityName });
                resolve(result);
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
        return new Promise(async (resolve) => {
            const { ctx, app, service } = this;
            try {
                const sysCode = app.config.apiClient.APPID[0];
                const address = contentApi.dataDictsTier;
                const url = ctx.helper.assembleUrl(sysCode, address);
                if (!url) {
                    resolve({ ctx, code: 202, res: "缺少后端服务请求API路径" });
                }
                const result = await service.curl.curlGet(url, {
                    code: "2147483647",
                });
                resolve(result);
            } catch (err) {
                ctx.logger.error(err);
                resolve(ctx.helper.errMessage(err));
            }
        });
    }
}
module.exports = cityService;
