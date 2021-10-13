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
    refConfig: {
      tradeType: 'PRO_PRE_ASK',
    }, // 销售商品配置信息
    salesGoodsTags: [], // 销售商品标签集合
  },
})
export const mutations = {
  SET_SELLING_GOODS_DETAIL(state, object) {
    console.log('设置详情2',object.id)
    state.sellingGoodsData = object
  },
  // 更新优惠券状态
  SET_SELLING_COUPONLIST(state, info) {
    console.log(info.cid, info.couponStatus)
    const newCouponList = state.sellingGoodsData.couponList.map((item) => {
      if (item.id === info.cid) {
        item.couponStatus = info.couponStatus || 2
      }
      return item
    })
    state.sellingGoodsData.couponList = newCouponList
  },
}
export const actions = {
  setServiceGoodsDetail({ commit }, data) {
    console.log('设置详情')
    commit('SET_SELLING_GOODS_DETAIL', data)
  },
}
