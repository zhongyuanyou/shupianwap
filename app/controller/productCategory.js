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
    const getClassification = service.common.category.getProductCategory(
      { productTypeCode: 'PRO_CLASS_TYPE_SERVICE', needTwo: 1 }
    );
    // 获取交易分类
    const getClassifyTrading = service.common.category.getProductCategory(
      { productTypeCode: 'PRO_CLASS_TYPE_TRANSACTION' }
    );
    const reqAll = [ getClassification, getClassifyTrading, getAdvertising ];
    try {
      const resData = await Promise.all(reqAll);
      let categoryList = [];
      let recommendData = []; // 广告数据
      let jyCategoryList = []; // 交易分类集合
      let cpRecList = []; // 产品的推荐分类数据
      let jyRecList = []; // 交易的推荐分类数据
      // 服务产品分类总和
      if (
        resData[0].code === 200 &&
        resData[0].data &&
        Array.isArray(resData[0].data)
      ) {
        const cData = resData[0].data;
        // 获取到所有产品一级分类
        categoryList = cData.filter(item => {
          return item.level === 1 && item.status;
        });
        // 为您推荐产品分类
        // 判断是否有为您推荐的分类数据
        cpRecList = cData.filter(item => {
          return item.recommended === 1;
        });
        if (!categoryList.length || (categoryList[0].name !== '为您推荐' && cpRecList.length)) {
          categoryList.unshift({ name: '为您推荐', id: '' });
        }
        // 为每一个一级分类对象添加子级分类集合变量children
        categoryList.forEach(item => {
          item.children = [];
        });
        // 若有为您推荐数据
        if (categoryList[0].name === '为您推荐') {
          categoryList[0].children = cpRecList;
        }
        for (let i = 0; i < cData.length; i++) {
          for (let j = 0; j < categoryList.length; j++) {
            if (cData[i].level === 2 && cData[i].parentId === categoryList[j].id && cData[i].status) {
              categoryList[j].children.push(cData[i]);
            }
          }
        }
      }
      // 交易产品分类总和
      if (
        resData[1].code === 200 &&
        resData[1].data &&
        Array.isArray(resData[1].data)
      ) {
        const jData = resData[1].data;
        // 获取到所有交易一级分类
        jyCategoryList = jData.filter(item => {
          return item.level === 1 && item.status;
        });
        // 为您推荐产品分类
        // 判断是否有为您推荐的分类数据
        jyRecList = jData.filter(item => {
          return item.recommended === 1;
        });
        if (!categoryList.length || (categoryList[0].name !== '为您推荐' && jyRecList.length)) {
          categoryList.unshift({ name: '为您推荐', id: '' });
        }
        // 为每一个一级分类对象添加子级分类集合变量children
        jyCategoryList.forEach(item => {
          item.children = [];
        });
        // 若有为您推荐数据
        if (categoryList[0].name === '为您推荐') {
          categoryList[0].children = jyRecList;
        }
        // categoryList = categoryList.concat(jyCategoryList);
        for (let i = 0; i < jData.length; i++) {
          for (let j = 0; j < jyCategoryList.length; j++) {
            if (jData[i].level === 2 && jData[i].parentId === jyCategoryList[j].id && jData[i].status) {
              jyCategoryList[j].children.push(jData[i]);
            }
          }
        }
        const jyInfo = { name: '交易产品', id: '', isJY: true, children: jyCategoryList };
        categoryList.push(jyInfo);
      }
      // 筛选没有子级分类的产品分类
      categoryList = categoryList.filter(item => {
        return item.children.length;
      });
      // 广告数据
      if (
        resData[2].code === 200 &&
        resData[2].data
      ) {
        recommendData = resData[2].data && resData[2].data.ad100129 ? resData[2].data.ad100129.sortMaterialList : [];
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
