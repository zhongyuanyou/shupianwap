/** @Author: MaLiang
 * @Date: 2020-12-12 14:27:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 14:27:00
 * @Description: wap公共接口
 * @FilePath: /chips-wap/app/controller/public.js
 * */
'use strict';

const Controller = require('egg').Controller;
const { Prefix, Post } = require('egg-shell-decorators');

@Prefix('/nk/public')
class publicController extends Controller {
    /**
     * @Author: MaLiang
     * 查询广告
     */
    @Post('/v1/find_advertising.do')
  async findAdvertising() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCodeList: { type: 'array', required: true }, // 广告位置code
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    try {
      let adList = [];
      const resData = await service.common.banner.getAdList(
        ctx.request.body.locationCodeList
      );
      if (resData.code === 200) {
        adList = resData.data;
      }
      ctx.helper.success({
        ctx,
        code: 200,
        res: adList,
      });
    } catch (error) {
      ctx.logger.error(error);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = publicController;
