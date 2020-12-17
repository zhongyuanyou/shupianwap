"use strict";
const Service = require("egg").Service;
const { contentApi } = require("../../../config/serveApi/index");
class bannerService extends Service {
    /** @Author: MaLiang
     * 获取广告列表服务API（HTTP）
     * @locationCodeList { Array } locationCodeList 广告编码
     * @return { Object } 返回请求结果数据
     */
    async getAdList(locationCodeList = []) {
        return new Promise(async (resolve) => {
            const { ctx, app, service } = this;
            const adUrl = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[0],
                contentApi.findAdList
            );
            try {
                const result = await service.curl.curlPost(adUrl, {
                    locationCodeList,
                });
                const advertising = {};
                // 广告数据处理
                if (result.code === 200) {
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
