"use strict";
const Service = require("egg").Service;
const { productApi } = require("../../../config/serveApi/index");
class tradingProduct extends Service {
    /**
     * @Author: MaLiang
     * 获取交易推荐商品列表服务API（HTTP）
     * @locationCodeList { Array } ids 产品id集合
     * @return { Object } 返回请求结果数据
     */
    async recommendList(ids = []) {
        return new Promise(async (resolve) => {
            const { ctx, app } = this;
            const url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[1],
                productApi.getTradingListToIds
            );
            try {
                const result = await service.curl.curlPost(url, { ids });
                resolve({
                    code: result.data.code,
                    message: result.data.message,
                    data: result.data.data || [],
                });
            } catch (err) {
                ctx.logger.error(err);
                resolve(ctx.helper.errMessage(err));
            }
        });
    }
}
module.exports = tradingProduct;
