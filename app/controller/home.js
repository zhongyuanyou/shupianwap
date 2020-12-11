/** @Author: MaLiang
 * @Date: 2020-12-03 15:11:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 15:11:00
 * @Description: wap端首页接口
 * @FilePath: /chips-wap/app/controller/home.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { contentApi } = require("../../config/serveApi/index");
const { Get, Prefix, Post } = require("egg-shell-decorators");

// 获取广告列表
const getBannerList = async (ctx, service, locationCodeList) => {
    try {
        return await service.common.banner.getAdList(locationCodeList);
    } catch (error) {
        ctx.logger.error(error);
    }
};

// 获取资讯列表
const getInfoList = async (ctx, service, { limit, page }) => {
    try {
        return await service.common.content.list({ limit, page });
    } catch (error) {
        ctx.logger.error(error);
    }
};

// 交易资源搜索
const getJyproList = async (ctx, service, params) => {
    try {
        return await service.goodsList.getJyGoodsList(params);
    } catch (error) {
        ctx.logger.error(error);
    }
};

// 获取推荐商品列表+广告
const getRecommendProList = async (ctx, service, recomAdCode) => {
    try {
        const ids = [123, 456, 789]; // 推荐商品id 暂时写死
        // 定义参数校验规则
        const rules = {
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
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        const params = {
            userId: ctx.request.body.userId,
            deviceId: ctx.request.body.deviceId,
            areaCode: ctx.request.body.areaCode,
            sceneId: ctx.request.body.sceneId,
            maxsize: ctx.request.body.maxsize,
        };
        // 获取推荐产品
        const findRecom = await service.common.recom.getRecomProductIdList(
            params
        );
        console.log(88, findRecom);

        const getRecomPro = service.common.tradingProduct.recommendList(ids);
        const adList = service.common.banner.getAdList([recomAdCode]);

        const resData = await Promise.all([adList, getRecomPro]);
        let recommendData = {};
        if (resData[0].code === 200) {
            recommendData.adList = resData[0].data;
        }
        if (resData[1].code === 200) {
            recommendData.adList = resData[1].data;
        }
        return recommendData;
    } catch (error) {
        ctx.logger.error(error);
    }
};

@Prefix("/nk/home")
class homeController extends Controller {
    /**
     * 查询首页首屏数据（广告、导航）
     */
    @Post("/v1/get_home_data.do")
    async findAdNav() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            fixedNavCategoryCode: { type: "string", required: true }, // 固定导航分类code
            fixedNavPlatformCode: { type: "string", required: true }, // 固定导航平台code
            fixedLimit: { type: "integer", required: true }, // 固定导航每页条数
            fixedPage: { type: "integer", required: true }, // 固定导航当前页
            rollNavCategoryCode: { type: "string", required: true }, // 滚动导航分类code
            rollNavPlatformCode: { type: "string", required: true }, // 滚动导航平台code
            rollLimit: { type: "integer", required: true }, // 滚动导航每页条数
            rollPage: { type: "integer", required: true }, // 滚动导航当前页
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取广告
        const findBanner = getBannerList(
            ctx,
            service,
            ctx.request.body.locationCodeList
        );
        const includeField = "id,imageUrl,name,url,wapRoute"; // 字段筛选过滤
        const navUrl = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findNav
        );
        // 获取固定导航数据
        const findFixedNav = service.curl.curlGet(navUrl, {
            categoryCode: ctx.request.body.fixedNavCategoryCode,
            platformCode: ctx.request.body.fixedNavPlatformCode,
            limit: ctx.request.body.fixedLimit,
            page: ctx.request.body.fixedPage,
            includeField,
        });
        // 获取滚动导航数据
        const findRollNav = service.curl.curlGet(navUrl, {
            categoryCode: ctx.request.body.rollNavCategoryCode,
            platformCode: ctx.request.body.rollNavPlatformCode,
            limit: ctx.request.body.rollLimit,
            page: ctx.request.body.rollPage,
            includeField,
        });
        const reqArr = [findBanner, findFixedNav, findRollNav];
        try {
            const resData = await Promise.all(reqArr);
            let advertising = {}; // 广告数据
            let fixedNavList = []; // 固定导航数据
            let rollNavList = []; // 滚动导航数据
            // 广告数据处理
            if (resData[0].code === 200) {
                advertising = resData[0].data;
            }
            // 固定导航数据处理
            if (resData[1].data.code === 200) {
                fixedNavList = resData[1].data.data;
            }
            // 滚动导航数据处理
            if (resData[2].data.code === 200) {
                rollNavList = resData[2].data.data;
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    advertising,
                    fixedNavList,
                    rollNavList,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
    /**
     * 查询首页非首屏数据（站点、广告、资讯、推荐交易商品）
     */
    @Post("/v1/get_home_asyn_data.do")
    async findHomeAsynData() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            infoLimit: { type: "integer", required: true }, // 资讯每页数量
            infoPage: { type: "integer", required: true }, // 资讯当前页
            recomAdCode: { type: "string", required: true }, // 推商品模块广告位code
            categoryCode: { type: "string", required: false }, // 查询资讯的分类code
            platformCode: { type: "string", required: true }, // 查询资讯的平台code
            terminalCode: { type: "string", required: true }, // 查询资讯的终端code
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取站点
        const findCity = service.common.city.getSiteList();
        // 获取广告
        const findBanner = getBannerList(
            ctx,
            service,
            ctx.request.body.locationCodeList
        );
        // 获取资讯（调公用接口）
        const findInformation = getInfoList(ctx, service, {
            limit: ctx.request.body.infoLimit,
            page: ctx.request.body.infoPage,
            categoryCode: ctx.request.body.categoryCode,
            platformCode: ctx.request.body.platformCode,
            terminalCode: ctx.request.body.terminalCode,
        });

        // 获取推荐列表数据
        const getRecomList = getRecommendProList(
            ctx,
            service,
            ctx.request.body.recomAdCode
        );

        const reqArr = [findCity, findBanner, findInformation, getRecomList];
        try {
            const resData = await Promise.all(reqArr);
            let cityList = []; // 站点数据
            let advertising = {}; // 广告数据
            let information = {}; // 资讯数据
            let recommendData = {}; // 推荐数据
            // 站点数据处理
            if (resData[0].code === 200) {
                cityList = resData[0].data;
            }
            // 广告数据处理
            if (resData[1].code === 200) {
                advertising = resData[1].data;
            }
            // 资讯数据处理
            if (resData[2].data.code === 200) {
                information.rows = resData[2].data.data.rows || [];
                information.total = resData[2].data.data.total;
                information.currentPage = resData[2].data.data.currentPage;
                information.totalPage = resData[2].data.data.totalPage;
            }
            // 资讯数据处理
            recommendData = resData[3];
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    cityList,
                    advertising,
                    information,
                    recommendData,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }

    /**
     * 查询站点
     */
    @Get("/v1/find_city_list.do")
    async findInfoList() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            cityName: { type: "string", required: false }, // 站点名称
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.query);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取站点
        try {
            const resData = await service.common.city.getSiteList(
                ctx.query.cityName
            );
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    cityList: resData.data,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }

    /**
     * 查询资讯列表
     */
    @Get("/v1/find_info_list.do")
    async findInfo() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            limit: { type: "integer", required: true }, // 每页条数
            page: { type: "integer", required: true }, // 当前页
            categoryCode: { type: "string", required: false }, // 查询资讯的分类code
            platformCode: { type: "string", required: true }, // 查询资讯的平台code
            terminalCode: { type: "string", required: true }, // 查询资讯的终端code
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.query);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        try {
            const resData = await getInfoList(ctx, service, {
                limit: ctx.query.limit,
                page: ctx.query.page,
                categoryCode: ctx.request.body.categoryCode,
                platformCode: ctx.request.body.platformCode,
                terminalCode: ctx.request.body.terminalCode,
            });
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    infoList: resData.data.data.rows,
                    total: resData.data.data.total,
                    currentPage: resData.data.data.currentPage,
                    totalPage: resData.data.data.totalPage,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }

    /**
     * 查询推荐列表
     */
    @Post("/v1/find_recom_list.do")
    async findRecomList() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
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
            locationCode: { type: "string", required: true }, // 查询广告的位置code
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        const params = {
            userId: ctx.request.body.userId,
            deviceId: ctx.request.body.deviceId,
            areaCode: ctx.request.body.areaCode,
            sceneId: ctx.request.body.sceneId,
            maxsize: ctx.request.body.maxsize,
        };
        try {
            // 获取推荐产品ids
            const findRecom = service.common.recom.getRecomProductIdList(
                params
            );
            let reqArr = [findRecom];
            // 若用户查询的是第一页，需返回广告数据
            if (ctx.request.body.page === 1) {
                // 查询广告
                const findBanner = getBannerList(ctx, service, [
                    ctx.request.body.locationCode,
                ]);
                reqArr.push(findBanner);
            }

            const resArr = await Promise.all(reqArr);

            let productData = {
                goodsList: [],
            }; // 推荐数据

            // 获取广告数据成功
            if (ctx.request.body.page === 1 && resArr[1].code === 200) {
                productData.adData = resArr[1].data;
            }

            // 从算法部获取到推荐产品id成功
            if (resArr[0].code === 200) {
                // 根据前台的分页参数，动态选取一部分id
                const start =
                    (ctx.request.body.page - 1) * ctx.request.body.limit;
                const end = ctx.request.body.page * ctx.request.body.limit;
                const pagetionList = resArr[0].data.productInfoList.slice(
                    start,
                    end
                );
                // 根据 ids 调用产中心 查询 交易资源详情-批量
                const getRecomPro = await service.common.tradingProduct.recommendList(
                    pagetionList
                );
                if (getRecomPro.code === 200) {
                    productData.goodsList = getRecomPro.data || [];
                }
            }
            // 从算法部获取到推荐产品id失败
            if (!productData.length && ctx.request.body.page === 1) {
                // 查询产品中心交易资源搜索接口，返回搜索的产品列表作为推荐数据返给前端
                const res = await getJyproList(ctx, service, {
                    classCode: ctx.request.body.productType, // 产品类别
                    start: ctx.request.body.page, // 当前页
                    limit: ctx.request.body.limit, // 每页条数
                });
                if (res.data.code === 200) {
                    productData.goodsList = ras.data.data || [];
                }
            }

            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    recommendData: productData,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = homeController;
