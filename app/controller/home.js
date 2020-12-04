/** @Author: MaLiang
 * @Date: 2020-12-03 15:11:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 15:11:00
 * @Description: wap端首页接口
 * @FilePath: /chips-wap/app/controller/home.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { Get, Prefix, Post } = require("egg-shell-decorators");

/**
 * 查询首页首屏数据（广告、导航）
 */
@Prefix("/nk/home")
class homeController extends Controller {
    @Post("/v1/get_home_data.do")
    async findAdNav() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            fixedNavCategoryCode: { type: "string", required: true }, // 固定导航分类编码
            fixedNavPlatformCode: { type: "string", required: true }, // 固定导航平台code
            rollNavCategoryCode: { type: "string", required: true }, // 滚动导航分类编码
            rollNavPlatformCode: { type: "string", required: true }, // 滚动导航平台code
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取广告
        const findBanner = service.curl.curlPost(
            "/crisps-cms-web-api/nk/app/advertising/v1/find_advertising_list.do",
            {
                method: "POST",
                data: {
                    locationCodeList: ctx.query.locationCodeList,
                },
            }
        );
        const includeField = "id,imageUrl,name,url,wapRoute"; // 字段筛选过滤
        // 获取固定导航数据
        const findFixedNav = service.curl.curlGet(
            "/crisps-cms-web-api/nk/app/navigation/v1/find_page.do",
            {
                method: "GET",
                data: {
                    categoryCode: ctx.query.fixedNavCategoryCode,
                    platformCode: ctx.query.fixedNavPlatformCode,
                    includeField,
                },
            }
        );
        // 获取滚动导航数据
        const findRollNav = service.curl.curlGet(
            "/crisps-cms-web-api/nk/app/navigation/v1/find_page.do",
            {
                method: "GET",
                data: {
                    categoryCode: ctx.query.rollNavCategoryCode,
                    platformCode: ctx.query.rollNavPlatformCode,
                    includeField,
                },
            }
        );
        const reqArr = [findBanner, findFixedNav, findRollNav];
        try {
            const resData = await Promise.all(reqArr);
            const advertising = {}; // 广告数据
            const fixedNavList = []; // 固定导航数据
            const rollNavList = []; // 滚动导航数据
            // 广告数据处理
            if (
                resData[0].code === 200 &&
                resData[0].data &&
                Array.isArray(resData[0].data)
            ) {
                resData[0].data.forEach((item) => {
                    advertising[item.locationCode] = item;
                });
            }
            // 固定导航数据处理
            if (resData[1].code === 200 && resData[1].data) {
                fixedNavList = resData[1].data;
            }
            // 滚动导航数据处理
            if (resData[2].code === 200 && resData[2].data) {
                rollNavList = resData[2].data;
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
}

module.exports = homeController;
