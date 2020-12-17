"use strict";
const Service = require("egg").Service;
const { algorithmApi } = require("../../../config/serveApi/index");
class cityService extends Service {
    /**
     * @Author: MaLiang
     * 获取推荐产品id列表API（HTTP）
     * @params { Object }
     * @params.userId { string } 用户id 非必须
     * @params.deviceId { string } 设备ID 必须
     * @params.formatId { string } 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传） 非必须
     * @params.areaCode { string }  区域编码  必须
     * @params.sceneId { string }  场景ID  必须
     * @params.storeId { string }  商户ID(只有规划师主页才传)  非必须
     * @params.productId { string }  产品ID（产品详情页必传） 非必须
     * @params.productType { string }  产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传） 非必须
     * @params.title { string }  产品名称（产品详情页传、咨询页等） 非必须
     * @params.platform { string }  平台（如：app,m,pc） 非必须
     * @params.maxsize { integer }  要求推荐产品的数量 必须
     * @return { Object } 返回请求结果数据
     */
    async getRecomProductIdList(params) {
        return new Promise(async (resolve) => {
            const { ctx, app, service } = this;
            try {
                const key =
                    params.deviceId +
                    params.userId +
                    params.areaCode +
                    params.productType +
                    params.formatId;
                // 通过用户唯一标识从redis获取推荐产品ids
                const cacheProductIds = await service.redis.get(key);
                if (cacheProductIds && cacheProductIds.code === 200) {
                    resolve(cacheProductIds);
                } else {
                    const url = ctx.helper.assembleUrl(
                        app.config.apiClient.APPID[6],
                        algorithmApi.productRecom
                    );
                    const result = await service.curl.curlPost(url, params);
                    if (result.data.code === 200) {
                        const overdueTime = 60 * 60; // 过期时间(1小时)
                        // 缓存数据
                        service.redis.set(key, result.data, overdueTime);
                    }
                    resolve(result.data);
                }
            } catch (err) {
                ctx.logger.error(err);
                resolve(ctx.helper.errMessage(err));
            }
        });
    }
}
module.exports = cityService;
