"use strict";
module.exports = {
    // 首页推荐产品校验规则
    productRules: {
        userId: { type: "string", required: false }, // 用户id
        deviceId: { type: "string", required: true }, // 设备ID（用户唯一标识）
        formatId: { type: "string", required: false }, // 业态ID（首页等场景不需传，如其他场景能获取到必传）
        areaCode: { type: "string", required: true }, // 区域编码
        sceneId: { type: "string", required: true }, // 场景ID
        storeId: { type: "string", required: false }, // 商户ID(首页等场景不需传，如其他场景能获取到必传)
        productId: { type: "string", required: false }, // 产品ID（首页等场景不需传，如其他场景能获取到必传）
        productType: { type: "string", required: false }, // 产品一级类别（首页等场景不需传，如其他场景能获取到必传）
        title: { type: "string", required: false }, // 产品名称（产品详情页传、咨询页等）
        maxsize: { type: "integer", required: true }, // 要求推荐产品的数量
        platform: { type: "string", required: true }, // 平台（app,m,pc）
        limit: { type: "integer", required: true }, // 分页条数
        page: { type: "integer", required: true }, // 当前页
    },
};
