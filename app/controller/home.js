/** @Author: MaLiang
 * @Date: 2020-12-03 15:11:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 15:11:00
 * @Description: wap端首页接口
 * @FilePath: /chips-wap/app/controller/home.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { Get, Prefix } = require("egg-shell-decorators");

/**
 * 查询首页首屏数据（广告、导航）
 */
@Prefix("/nk/home")
class homeController extends Controller {
    @Get("/v1/get_home.do")
    async findAdNav() {
        const { ctx, service } = this;
        // // 定义参数校验规则
        // const rules = {
        //     locationCode: { type: "array", required: true }, // 广告编码
        //     categoryCode: { type: "string", required: true }, // 分类编码
        //     platformCode: { type: "string", required: true }, // 平台code
        // };
        // // 参数校验
        // const valiErrors = app.validator.validate(rules, ctx.query);
        // // 参数校验未通过
        // if (valiErrors) {
        //     ctx.helper.fail({ ctx, code: 422, res: valiErrors });
        //     return;
        // }
        // 获取广告
        const findBanner = service.curl.curlPost(
            "/crisps-cms-web-api/nk/app/advertising/v1/find_advertising_list.do",
            {
                method: "POST",
            }
        );
        // 获取导航
        const findNav = service.curl.curlGet(
            "/crisps-cms-web-api/nk/app/navigation/v1/find_page.do",
            {
                method: "GET",
            }
        );

        const reqArr = [findBanner, findNav];
        const resData = await Promise.all(reqArr);
        console.log(11, resData);

        // function check() {
        //     const reqArr = [findBanner, findNav];
        //     const resData = await Promise.all(qeqArr);
        //     if (Array.isArray(resData) && resData.length === reqArr.length) {
        //         for (var i = 0; i < resData.length; i++) {
        //             if (resData[i].code !== 200 || !resData[i].code) {
        //                 console.log("出错");
        //                 return;
        //             }
        //         }
        //     } else {
        //         console.log("出错");
        //         return;
        //     }
        // }
    }
}

module.exports = homeController;
