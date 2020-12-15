/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/productCategory')

class ProductCategoryController extends Controller {
  @Post('/v1/product_category.do')
  async category() {
    // 查询产品分类
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCode: { type: 'string', required: false }, // 广告位置编号
      isRecommend: { type: 'number', required: true }, // 1:需要推荐分类 0:不需要推荐分类
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取广告数据，若有locationCode的情况下
    const getAdvertising = service.common.banner.getAdList([ 'ad100129' ]);
    // 获取产品分类
    const getClassification = service.common.category.getProductCategory({ productTypeCode: 'PRO_CLASS_TYPE_SERVICE' });

    const reqAll = [ getClassification, getAdvertising ];
    try {
      const resData = await Promise.all(reqAll);
      let categoryList = [];
      let recommendData = []; // 广告数据
      // 产品分类总和
      if (
        resData[0].data.code === 200 &&
        resData[0].data.data &&
        Array.isArray(resData[0].data.data)
      ) {
        const cData = resData[0].data.data;
        // 获取到所有一级分类
        categoryList = cData.filter(item => {
          return item.level === 1;
        });
        // 为每一个一级分类对象添加子级分类集合变量children
        categoryList.forEach(item => {
          item.children = [];
        });
        for (let i = 0; i < cData.length; i++) {
          for (let j = 0; j < categoryList.length; j++) {
            if (cData[i].level === 2 && cData[i].parentId === categoryList[j].id) {
              categoryList[j].children.push(cData[i]);
            }
          }
        }
      }
      // 筛选没有子级分类的产品分类
      categoryList = categoryList.filter(item => {
        return item.children.length;
      });
      // 广告数据
      console.log('广告数据', resData[1]);
      if (
        resData[1].code === 200 &&
        resData[1].data
      ) {
        recommendData = resData[1].data.ad100129.sortMaterialList;
      }
      ctx.helper.success({
        ctx,
        code: 200,
        res: {
          categoryList,
          recommendData,
        },
      });
    } catch (err) {
      ctx.logger.error(err);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = ProductCategoryController;
