/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/category/v1')

class CategoryController extends Controller {
  @Get('/product_category')
  async category() {
    // 查询产品分类
  }
}

module.exports = CategoryController;
