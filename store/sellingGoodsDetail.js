/**
 * @Description: 销售商品详情
 * @author: zhaoDongMing
 * @date: 2021/3/31
 */
export const state = () => ({
  sellingGoodsData: {
    id: null,
    goodsNo: null,
    name: null,
    classCode: null,
    classCodeName: null,
    classCodeLevel: null,
    classCodeLevelName: null,
    salesPrice: '0.00',
    salesVolume: null,
    status: null,
    salesGoodsSubVos: [], // 销售商品包含基础商品列表集合
    salesGoodsOperatings: {
      clientDetails: [],
      productDescribe: null,
    }, // 运营信息
    couponList: [], // 优惠券集合
    planner: null, // 钻展位规划师
    goodsImgs: null, // 销售商品图片
    refConfig: null, // 销售商品配置信息
    salesGoodsTags: [], // 销售商品标签集合
  },
})
export const mutations = {
  SET_SELLING_GOODS_DETAIL(state, object) {
    state.sellingGoodsData = object
  },
  // 修改优惠券状态
  SET_SELLING_COUPONLIST(state, cid) {
    debugger
    const newCouponList = state.sellingGoodsData.salesGoodsTags.map((item) => {
      if (item.id === cid) {
        item.couponStatus = 2
      }
      return item
    })
    state.sellingGoodsData.salesGoodsTags = newCouponList
  },
}
