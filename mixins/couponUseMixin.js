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

import clone from '@/utils/clone'

export default {
  data() {
    return {
      cloneList: [], // 从父组件集成过来的优惠券列表的拷贝，方便修改
      checkedCoupon: [], // 已选择的优惠券
      ifConfirmSwitchPopupShow: false, // 确认切换的弹窗显隐
      currentTapCoupon: null, // 当前点击的优惠券
      switchPopupField: {
        type: 'functional',
        description: '您已选择最优的优惠券，确定要切换其他券吗',
        confirmButtonText: '暂时不要',
        cancelButtonText: '确定切换'
      }
    }
  },
  watch: {
    // 监听优惠券列表，若优惠券列表改变则重新克隆并初始化选中状态
    datalist: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.cloneList = clone(newVal, true);
        this.cloneList.forEach(v => {
          v.checked = false; // 初始选中状态置否
          v.composable = false; // 初始可叠加状态置否
        });
      }
    },
    show: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.checkedCoupon = this.echoSelectedCoupons
          this.checkSKUCouponComposability();
          this.settlement();
          this.$forceUpdate();

        }

      }
    }
  },
  methods: {
    // 点击优惠券时切换优惠券状态
    switchCheckedCoupon(item) {
      this.checkedCoupon.forEach(v => {
        v.checked = false;
      })
      if (
        // 如果点击已选中的，去掉选择
        this.checkedCoupon.some(v => v.couponId === item.couponId)
      ) {
        this.checkedCoupon = this.checkedCoupon.filter(v => v.couponId !== item.couponId);
      } else if (
        // 如果是点击未选中的
        [1, 2].includes(item.marketingCouponVO.useType) ||
        this.checkedCoupon.some(v => [1, 2].includes(v.marketingCouponVO.useType))
      ) {
        /*
        * 如果当前选中的优惠券是全场或者指定分类，或者当前已选择的包含全场或指定分类，
        * 则直接清空并选择当前优惠券
        * */
        this.checkedCoupon = [item];
      } else {
        /*
        * 如果当前选中的优惠券是指定商品，则看是否存在同商品的券
        * 若不存在则添加，若存在则替换
        * */
        const couponExist = this.checkedCoupon.findIndex(
          v => v.marketingCouponVO.productId === item.marketingCouponVO.productId
        )
        if (couponExist !== -1) {
          this.checkedCoupon[couponExist] = item;
        } else {
          this.checkedCoupon.push(item);
        }
      }

      this.checkedCoupon.forEach(v => {
        v.checked = true;
      })
      // 切换其他优惠券的可叠加状态
      this.checkSKUCouponComposability();
      this.$forceUpdate()
    },
    // 检查指定商品券的可叠加状态
    checkSKUCouponComposability() {
      this.cloneList.forEach(v => {
        v.composable = false;
      })
      if (
        this.checkedCoupon.length &&
        this.checkedCoupon.every(v => v.marketingCouponVO.useType === 3)) {
        const checkedSKUCouponIds = this.checkedCoupon
          .filter(v => v.marketingCouponVO.useType === 3)
          .map(v => v.marketingCouponVO.productId)
        this.cloneList
          .filter(v => v.marketingCouponVO.useType === 3)
          .forEach(v => {
            if (!checkedSKUCouponIds.includes(v.marketingCouponVO.productId)) {
              v.composable = true;
            }
          })
      }
    },
    handleSwitchCouponConfirm() {
      // 点击优惠券时切换优惠券状态
      this.switchCheckedCoupon(this.currentTapCoupon);
      this.settlement();
    }
  },
}
