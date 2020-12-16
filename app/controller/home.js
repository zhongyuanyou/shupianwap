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
const { productRules } = require("../validate/home");
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
        const includeField =
            "id,imageUrl,navigationImageUrl,name,url,wapRoute,navigationImageUrl,navigationWay,executionParameters"; // 字段筛选过滤
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
                Object.keys(resData[0].data).forEach((key) => {
                    advertising[key] = resData[0].data[key].sortMaterialList;
                });
            }
            // 固定导航数据处理
            if (resData[1].data.code === 200) {
                fixedNavList = resData[1].data.data.rows;
            }
            // 滚动导航数据处理
            if (resData[2].data.code === 200) {
                rollNavList = resData[2].data.data.rows;
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
     * 查询首页非首屏数据（站点、广告、资讯）
     */
    @Post("/v1/get_home_asyn_data.do")
    async findHomeAsynData() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            infoLimit: { type: "integer", required: true }, // 资讯每页数量
            infoPage: { type: "integer", required: true }, // 资讯当前页
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

        const reqArr = [findCity, findBanner, findInformation];
        try {
            const resData = await Promise.all(reqArr);
            console.log(resData[0].code, resData[1].code, resData[2].data.code);
            let cityList = []; // 站点数据
            let advertising = {}; // 广告数据
            let information = {}; // 资讯数据
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
                information = resData[2].data.data.rows || [];
            }

            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    cityList,
                    advertising,
                    information,
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
                    infoList: resData.data.data.rows || [],
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
            findType: { type: "integer", required: true, min: 0, max: 2 }, // 查询类型：0：初始查询广告+数据字典+推荐商品  1：查询广告+推荐商品 2：只查推荐商品
        };
        const nweRules = Object.assign(rules, productRules);
        // 参数校验
        const valiErrors = app.validator.validate(nweRules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 查询推荐产品所需参数
        let params = {
            userId: ctx.request.body.userId, // 用户id
            deviceId: ctx.request.body.deviceId, // 设备id
            areaCode: ctx.request.body.areaCode, // 区域code
            sceneId: ctx.request.body.sceneId, // 场景ID
            maxsize: ctx.request.body.maxsize, // 要要推荐产品的数量
            productType: ctx.request.body.productType, // 需要推荐的产品类别
            formatId: ctx.request.body.formatId, // 产品三级类别,没有三级类别用二级类别
        };
        // 查询广告所需参数
        let locationCode = ctx.request.body.locationCode;
        let findRomReq = {};
        let productData = {};
        const findAdAndproduct = async () => {
            try {
                // 获取推荐产品ids
                const findRecom = service.common.recom.getRecomProductIdList(
                    params
                );
                // 查询广告
                const findadData = getBannerList(ctx, service, [locationCode]);
                const resArr = await Promise.all([findadData, findRecom]);
                if (resArr[0].code === 200) {
                    productData.adData = resArr[0].data; // 广告数据
                }
                findRomReq = resArr[1]; // 暂存推荐接口返回数据
            } catch (error) {
                ctx.logger.error(error);
            }
        };
        try {
            // 初始查询广告+数据字典+推荐商品
            if (ctx.request.body.findType === 0) {
                // 查询数据字典
                const sysCode = app.config.apiClient.APPID[0];
                const dict = contentApi.dataDict; // 查询字典
                const dictUrl = ctx.helper.assembleUrl(sysCode, dict);
                const codeData = await this.ctx.http.get(dictUrl, {
                    code: ctx.request.body.dictionaryCode,
                });
                // 处理字典数据
                if (codeData.code === 200) {
                    const dictData = [];
                    codeData.data.forEach((item) => {
                        if (item.ext2.indexOf("wap") !== -1) {
                            dictData.push({
                                id: item.id,
                                code: item.code,
                                name: item.name,
                                ext1: item.ext1,
                                ext2: item.ext2,
                                ext3: item.ext3,
                                ext4: item.ext4,
                                ext5: item.ext5,
                                adData: [],
                                goodsList: [],
                            });
                        }
                    });
                    productData.dictData = dictData; // 字典数据
                    params.formatId = productData.dictData[0].ext3; // 获取产品分类编码
                    locationCode = productData.dictData[0].ext1; // 获取广告位code
                    await findAdAndproduct();
                }
            }
            // 查询广告+推荐商品
            if (ctx.request.body.findType === 1) {
                // 定义参数校验规则
                const rules = {
                    locationCode: { type: "string", required: true }, // 查询广告的位置code
                    formatId: { type: "string", required: true }, // 分类code
                };
                // 参数校验
                const valiErrors = app.validator.validate(
                    rules,
                    ctx.request.body
                );
                // 参数校验未通过
                if (valiErrors) {
                    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
                    return;
                }
                await findAdAndproduct();
            }
            // 只查推荐商品
            if (ctx.request.body.findType === 2) {
                // 定义参数校验规则
                const rules = {
                    formatId: { type: "string", required: true }, // 分类code
                };
                // 参数校验
                const valiErrors = app.validator.validate(
                    rules,
                    ctx.request.body
                );
                // 参数校验未通过
                if (valiErrors) {
                    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
                    return;
                }
                // 获取推荐产品ids
                findRomReq = await service.common.recom.getRecomProductIdList(
                    params
                );
            }

            // 从算法部获取到推荐产品id成功
            if (findRomReq.code === 200) {
                // 根据前台的分页参数，动态选取一部分id
                const start =
                    (ctx.request.body.page - 1) * ctx.request.body.limit;
                const end = ctx.request.body.page * ctx.request.body.limit;
                const pagetionList = findRomReq.data.productInfoList.slice(
                    start,
                    end
                );
                // 根据 ids 调用产中心 查询 交易资源详情-批量
                const getRecomPro = await service.common.tradingProduct.recommendList(
                    pagetionList
                );
                if (getRecomPro.code === 200) {
                    productData.goodsList = getRecomPro.data || [];
                    productData.describe = "推荐";
                }
            }
            // 从算法部获取到推荐产品id失败
            if (
                !productData.goodsList.length &&
                ctx.request.body.findType !== 2
            ) {
                // 查询产品中心交易资源搜索接口，返回搜索的产品列表作为推荐数据返给前端
                const res = await getJyproList(ctx, service, {
                    classCode: ctx.request.body.productType, // 产品类别
                    start: ctx.request.body.page, // 当前页
                    limit: ctx.request.body.limit, // 每页条数
                });
                if (res.data.code === 200) {
                    productData.goodsList =
                        res.data.data.length || res.data.data.records;
                    productData.describe = "搜索";
                }
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: productData,
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = homeController;
