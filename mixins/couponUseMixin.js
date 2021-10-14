/*
* 提交、确认订单页面选择优惠券弹窗组件mixin
* 最后编辑：2021-10-14 田宇豪 双11优惠券需求
* 提出来方便以后自主下单使用
* 使用限制：marketingCouponLogList[0].marketingCouponVO.useType，int，1.全场通用 2.限制分类 3.限制商品
* 发券方：marketingCouponLogList[0].marketingCouponVO.belongType，string，COUPON_DISCOUNT:平台优惠券，BUSINESS_COUPON:商户优惠券
*
* 同一个订单，只能使用全场通用/限制分类/限制商品中的一种
* 全场通用和限制分类优惠券在同一订单中只能使用一张
* 限制商品优惠券同一订单可以使用多张，但是针对订单中的同一商品的只能使用一张
* */
/*
&.composable {
  // 可叠加右标
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/33w6tcfd0xu0000.png');
}
**/

export default {
  data() {
    return {
      checkedCoupon: []
    }
  },
  methods: {
    switchCheckedCoupon(item) {

      this.checkedCoupon.forEach(v => { v.checked = 0 })
      // 如果点击已选中的，去掉选择
      if  (this.checkedCoupon.some(v => v.couponId === item.couponId)) {
        this.checkedCoupon = this.checkedCoupon.filter(v => {
          v.checked = 0
          return v.couponId !== item.couponId
        })
        this.checkedCoupon.forEach(v => { v.checked = 1 })
        return
      }
      // 如果是点击未选中的
      if (
        [1, 2].includes(item.marketingCouponVO.useType) ||
        this.checkedCoupon.some(v => [1, 2].includes(v.marketingCouponVO.useType))
      ) {
        /*
        * 如果当前选中的优惠券是全场或者指定分类，或者当前已选择的包含全场或指定分类，
        * 则直接清空并选择当前优惠券
        * */
        this.checkedCoupon = [item]
      } else {
        /*
        * 如果当前选中的优惠券是指定商品，则去掉当前
        * */
        const couponExist = this.checkedCoupon.findIndex(
          v => v.marketingCouponVO.productId === item.marketingCouponVO.productId
        );
        if (couponExist !== -1) {
          this.checkedCoupon[couponExist] = item;
        } else {
          this.checkedCoupon.push(item)
        }
      }
      this.checkedCoupon.forEach(v => { v.checked = 1 })
    }
  }
}
