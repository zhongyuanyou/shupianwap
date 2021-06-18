<template>
  <div class="container">
    <div
      v-if="sellingGoodsData.salesPrice !== '0.00'"
      class="cell"
      @click="couponShow"
    >
      <div class="cell_left">
        <div class="label">优惠</div>
        <div class="content">
          <template v-if="vouchers">
            <span class="tag">领券</span>
            <span class="hide">{{ vouchers }}</span>
          </template>
          <div v-else class="not_vouchers">暂无可用优惠券</div>
        </div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <!--    多个服务商品时不显示SKU-->
    <div
      v-if="goodsSubDetailsName.length === 1 && skuResult.length > 0"
      class="cell"
      @click="openSku"
    >
      <div class="cell_left">
        <div class="label">选择</div>
        <div class="content">
          <span class="hide">{{
            goodsSubDetailsName[0]['goodsSubDetailsName']
          }}</span>
        </div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <div v-if="serviceTag && serviceTag.length > 0" class="cell">
      <div class="cell_left">
        <div class="label">保障</div>
        <div class="content">
          <span
            v-for="(item, index) in serviceTag.slice(0, 3)"
            :key="index"
            class="item"
            :class="index === 2 ? 'last-item' : ''"
            >{{ item.title }}</span
          >
        </div>
      </div>
      <!-- <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" /> -->
    </div>
    <sp-popup
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ maxHeight: '1067px' }"
    >
      <p class="popup_title">优惠</p>
      <p class="p1">优惠预估</p>
      <p class="p2">
        使用以下优惠券后预估价<span>{{ couponPreferentialLine }}元</span>
      </p>
      <div class="popup_box">
        <p class="vouchers_box_title">可领取优惠券</p>
        <div class="vouchers_box">
          <div class="vouchers_list">
            <div
              v-for="item in coupon"
              :key="item.id"
              :class="{
                vouchers_item: true,
                over: item.couponStatus == 1,
                receive: item.couponStatus == 2,
              }"
            >
              <div class="vouchers_item_left">
                <div class="amount">{{ item.reducePrice }}</div>
                <div class="conditions">满{{ item.fullPrice }}元可用</div>
              </div>
              <div class="vouchers_item_right">
                <div class="vouchers_title">{{ item.couponName }}</div>
                <div class="vouchers_desc">
                  {{
                    item.useType == 1
                      ? '全品类通用'
                      : item.useType == 2
                      ? '限定部分类别产品使用'
                      : '置顶产品使用'
                  }}
                </div>
                <div class="vouchers_date">
                  {{ item.serviceLife }}
                </div>
                <div
                  class="vouchers_bt"
                  @click="getCoupons(item.id, item.couponStatus)"
                >
                  {{
                    item.couponStatus == 1
                      ? '已领完'
                      : item.couponStatus == 2
                      ? '已领取'
                      : '立即领取'
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="vouchers_tips">
            上述优惠预估仅为系统初步预估，不代表最终价格，请以订单实际价格为准。
          </div>
        </div>
      </div>
    </sp-popup>
    <sp-popup
      v-model="skuShow"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '0.4rem 0.4rem' }"
    >
      <div class="sku_box">
        <div class="goods_info">
          <sp-image
            width="1.8rem"
            height="1.8rem"
            fit="cover"
            lazy-load
            :src="imgFileIdPaths[0]"
          />
          <div class="goods_info_right">
            <!--            0.00元的商品显示面议-->
            <div class="price">
              {{
                sellingGoodsData.salesPrice !== '0.00'
                  ? sellingGoodsData.salesPrice
                  : '面议'
              }}
              <span v-if="sellingGoodsData.salesPrice !== '0.00'">元</span>
            </div>
            <div class="code">编号 {{ sellingGoodsData.goodsNo }}</div>
          </div>
        </div>
        <div class="attrs_box">
          <div v-for="item in skuResult" :key="item.id" class="attrs_item">
            <!--            属性名称-->
            <div class="attrs_item_title">{{ item.name }}</div>
            <!--            属性值-->
            <div
              v-for="child in item.attrValList"
              :key="child.id"
              class="attrs_item_value"
            >
              {{ child.name }}
            </div>
          </div>
        </div>
      </div>
    </sp-popup>
    <sp-popup
      v-model="safeguardShow"
      title="平台保障"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '25px 20px' }"
    >
      <sp-safeguard :options="serviceTag" success></sp-safeguard>
    </sp-popup>
  </div>
</template>

<script>
import { Cell, Popup, Safeguard, Image } from '@chipspc/vant-dgg'
import { coupon, productDetailsApi } from '@/api'
import imHandle from '~/mixins/imHandle'
// 数组排序
function xier(arr) {
  let interval = parseInt(arr.length / 2) // 分组间隔设置
  while (interval > 0) {
    for (let i = 0; i < arr.length; i++) {
      let n = i
      while (
        arr[n].reducePrice <
          (arr[n - interval] ? arr[n - interval].reducePrice : -1) &&
        n > 0
      ) {
        const temp = arr[n]
        arr[n] = arr[n - interval]
        arr[n - interval] = temp
        n = n - interval
      }
    }
    interval = parseInt(interval / 2)
  }
  return arr
}
export default {
  name: 'VouchersSelect',
  components: {
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Safeguard.name]: Safeguard,
    [Image.name]: Image,
  },
  mixins: [imHandle],
  data() {
    return {
      type: 1, // 1 加入购物车、立即购买  2 加入购物车  3 立即购买
      vouchers: '',
      show: false,
      skuShow: false,
      safeguardShow: false,
      num: 1,
      couponPreferentialLine: 0.0, // 优惠后的金额
      imgFileIdPaths: [
        'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
      ], // 商品图片
      skuResult: [], // sku
    }
  },
  computed: {
    sellingGoodsData() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    serviceTag() {
      const salesGoodsTags =
        this.$store.state.sellingGoodsDetail.sellingGoodsData.salesGoodsTags
      console.log('salesGoodsTags', salesGoodsTags)
      let serviceTag = []
      if (salesGoodsTags) {
        // 产品中心605版本筛选服务标签 code DSJTC20210514000043
        serviceTag = salesGoodsTags
          .filter((item) => {
            return item.categoryCode === 'DSJTC20210514000042'
          })
          .map((item) => {
            return {
              text: item.ext1 || item.ext2 || item.ext3,
              title: item.tagValueName,
              icon: 'sp-iconfont sp-iconfont-security2',
            }
          })
      }
      console.log('serviceTag', serviceTag)
      return serviceTag
    },
    // 优惠券列表
    coupon() {
      const list = []
      const couponList =
        this.$store.state.sellingGoodsDetail.sellingGoodsData.couponList

      console.log('couponList', couponList)
      try {
        for (let i = 0; i < couponList.length; i++) {
          const matchServiceLife = couponList[i].serviceLife.match('-')
          if (matchServiceLife) {
            let time1 = couponList[i].serviceLife.slice(
              matchServiceLife.index + 1
            )
            time1 = new Date(time1)
            const time2 = new Date()
            if (time1.getTime() >= time2.getTime()) {
              list.push(couponList[i])
            }
          } else {
            list.push(couponList[i])
          }
        }
      } catch (error) {
        console.log(error)
      }

      return list
    },
    //  服务商品的SKU集合
    goodsSubDetailsName() {
      //  基础商品
      const salesGoodsSubVos =
        this.$store.state.sellingGoodsDetail.sellingGoodsData.salesGoodsSubVos
      // 找出服务商品
      const serviceGoods = salesGoodsSubVos.map((item) => {
        if (item.goodsType === 'PRO_CLASS_TYPE_SERVICE') {
          return item
        }
      })
      return serviceGoods
    },
  },
  mounted() {
    this.couponPreferential()
    this.getSellingImg() // 获取商品图片
    //  当只有一个服务产品时获取SKU
    if (this.goodsSubDetailsName.length === 1) {
      this.getServiceAttr(this.goodsSubDetailsName[0])
    }
  },
  methods: {
    // 获取商品图片
    getSellingImg() {
      // 获取商品图片集合
      this.imgFileIdPaths = this.sellingGoodsData.salesGoodsOperatings
        .clientDetails.length
        ? this.sellingGoodsData.salesGoodsOperatings.clientDetails[0]
            .imgFileIdPaths
        : []
      // 返回图片地址集合
    },
    // 打开优惠券领取弹窗
    couponShow() {
      if (this.vouchers) {
        this.show = true
      }
    },
    // 计算优惠后的价格
    couponPreferential() {
      const sellingGoodsData =
        this.$store.state.sellingGoodsDetail.sellingGoodsData
      // 找出有效优惠券
      const couponList = sellingGoodsData.couponList.filter(
        (item) => item.couponStatus === 0 || item.couponStatus === 2
      )
      if (couponList.length < 1) {
        this.vouchers = null
      } else {
        // 根据优惠金额对优惠券排序
        const sortcouponList = xier(couponList)
        //  取最大优惠金额
        const salesPrice =
          sellingGoodsData.salesPrice -
          sortcouponList[sortcouponList.length - 1]
        const salesPriceRes = salesPrice >= 0 ? salesPrice : 0
        this.couponPreferentialLine = salesPriceRes.toFixed(2)
        //  组装优惠券提示信息
        const info1 = sortcouponList[sortcouponList.length - 1]
        const info2 = sortcouponList[sortcouponList.length - 2]
        const vouchers1 = `满${info1.fullPrice}减${info1.reducePrice}`
        if (!info2) {
          this.vouchers = vouchers1
          return
        }
        this.vouchers = `${vouchers1}, 满${info2.fullPrice}减${info2.reducePrice}`
      }
    },
    // 领取优惠券
    async getCoupons(id, status) {
      // 点击立即购买
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        if (status === 0) {
          const params = {
            couponId: id,
          }
          coupon
            .receiveCoupon({ axios: this.$axios }, params)
            .then((res) => {
              this.$xToast.success('优惠券领取成功')
              this.$store.commit(
                'sellingGoodsDetail/SET_SELLING_COUPONLIST',
                id
              )
            })
            .catch((err) => {
              console.log(err)
              this.$xToast.warning(err.message || '优惠券领取失败，请稍后重试')
            })
        }
      }
    },
    // 打开服务标签
    safeguardIsShow() {
      if (this.serviceTag.length > 0) {
        this.safeguardShow = true
      } else {
        this.$xToast.warning('没有更多内容')
      }
    },
    openSku() {
      this.skuShow = true
    },
    //  获取SKU属性
    async getServiceAttr(goodsSubDetailsName) {
      if (goodsSubDetailsName.goodsSubDetailsName.length < 1) {
        this.skuResult = []
        return
      }
      try {
        const skuResult = await this.$axios.post(
          productDetailsApi.findServiceAttr,
          {
            productId: goodsSubDetailsName.productId,
            attrName: goodsSubDetailsName.goodsSubDetailsName,
          }
        )
        if (skuResult.code === 200) {
          this.skuResult = skuResult.data
        } else {
          throw skuResult.message
        }
      } catch (err) {
        this.$xToast.error(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  ::v-deep.sp-popup--round {
    border-radius: 24px 24px 0px 0px;
  }
  ::v-deep.sp-safeguard__title {
    max-width: none;
  }
  font-family: PingFang SC;
  font-weight: 400;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  .cell {
    padding: 0 40px 0 39px;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    &:last-child {
      border-bottom: none;
    }
    &_left {
      display: flex;
      align-items: center;
      flex: 1;
      .label {
        color: #999999;
        font-size: 26px;
        margin-right: 40px;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        // align-items: center;
        // flex: 1;
        max-width: 550px;
        color: #222222;
        font-size: 26px;
        height: 35px;
        overflow: hidden;
        .tag {
          display: inline-block;
          width: 60px;
          height: 32px;
          line-height: 32px;
          background-color: #feefef;
          color: #f1524e;
          font-size: 22px;
          text-align: center;
          margin-right: 9px;
        }
        // .hide {
        //   width: 432px;
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
        // }
        .not_vouchers {
          color: #cccccc;
        }
        .item {
          margin-right: 32px;
          &::before {
            content: '1';
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #cccccc;
            color: #cccccc;
            font-size: 16px;
            margin-right: 12px;
          }
          &:nth-child(2)::before {
            content: '2';
          }
          &:nth-child(3)::before {
            content: '3';
          }
        }
        .last-item {
          margin-right: 0;
        }
      }
    }
  }
  .sku_box {
    .goods_info {
      display: flex;
      &_right {
        margin-left: 24px;
        padding-top: 20px;
        .price {
          color: #ec5330;
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 18px;
          span {
            font-size: 22px;
          }
        }
        .code {
          color: #999999;
          font-size: 24px;
        }
      }
    }
    .attrs_box {
      .attrs_item {
        font-size: 0;
        padding-bottom: 32px;
        border-bottom: 1px solid #f4f4f4;
        &_title {
          color: #222222;
          font-size: 28px;
          font-weight: bold;
          margin: 32px 0 30px;
        }
        &_value {
          display: inline-block;
          padding: 0 27px;
          min-width: 156px;
          height: 64px;
          font-size: 26px;
          color: #4974f5;
          text-align: center;
          line-height: 64px;
          border: 1px solid #4974f5;
          background-color: rgba(73, 116, 245, 0.08);
          border-radius: 4px;
        }
      }
    }
    .buy_num_box {
      padding: 32px 0;
      border-bottom: 1px solid #f4f4f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buy_num_title {
        color: #222222;
        font-size: 28px;
        font-weight: bold;
      }
      .count_box {
        display: flex;
        height: 64px;
        background-color: #f8f8f8;
        .count_reduce {
          position: relative;
          width: 72px;
          &::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 31px;
            width: 24px;
            height: 3px;
            background-color: #cdcdcd;
          }
        }
        .count {
          width: 96px;
          color: #222222;
          font-size: 30px;
          font-weight: bold;
          text-align: center;
          line-height: 64px;
          margin: 0 2px;
        }
        .count_add {
          position: relative;
          width: 72px;
          &::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 31px;
            width: 24px;
            height: 3px;
            background-color: #cdcdcd;
          }
          &::after {
            content: '';
            position: absolute;
            left: 35px;
            top: 20px;
            width: 3px;
            height: 24px;
            background-color: #cdcdcd;
          }
        }
      }
    }
    .cart_buy_box {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      line-height: 100px;
      .bt {
        width: 327px;
        border-radius: 8px;
        background-color: #fe8c29;
      }
      .buy {
        background-color: #ec5330;
      }
      .width100 {
        width: 100%;
      }
    }
  }
  .popup_title {
    color: #222222;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding: 48px 0;
  }
  ::v-deep.sp-popup__close-icon--top-right {
    top: 56px;
    right: 40px;
  }
  .p1 {
    color: #222222;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 24px;
    padding: 0 40px;
  }
  .p2 {
    color: #222222;
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 32px;
    padding: 0 40px;
    span {
      color: #ec5330;
    }
  }
  .popup_box {
    padding: 0 40px;
    overflow-y: auto;
    position: relative;

    .vouchers_box {
      max-height: 820px;
      padding-bottom: 54px;
      &_title {
        padding-top: 30px;
        color: #222222;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .vouchers_list {
        .vouchers_item {
          display: flex;
          margin-bottom: 20px;
          width: 670px;
          height: 216px;
          padding-bottom: 4px;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/f5p8bx9q4oo0000.png?x-oss-process=image/resize,m_fill,w_670,h_212,limit_0');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &_left {
            width: 200px;
            padding-top: 30px;
            text-align: center;
            .amount {
              font-size: 72px;
              color: #ffffff;
              font-family: Bebas;
              margin-bottom: 20px;
            }
            .conditions {
              color: #ffffff;
              font-size: 24px;
              padding-left: 10px;
              padding-right: 10px;
            }
          }
          &_right {
            /*flex: 1;*/
            position: relative;
            padding-left: 24px;
            padding-top: 30px;
            width: 462px;
            padding-right: 32px;
            .vouchers_title {
              color: #222222;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .vouchers_desc {
              color: #555555;
              font-size: 24px;
              width: 251px;
              line-height: 32px;
              min-height: 56px;
              margin-bottom: 10px;
            }
            .vouchers_date {
              color: #999999;
              font-size: 20px;
            }
            .vouchers_bt {
              position: absolute;
              top: 79px;
              right: 32px;
              width: 140px;
              height: 54px;
              text-align: center;
              line-height: 54px;
              color: #ffffff;
              font-size: 24px;
              border-radius: 27px;
              background-color: #ec5330;
              color: #ffffff;
            }
          }
        }
        .over {
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/bhmf7qjf36w0000.png?x-oss-process=image/resize,m_fill,w_670,h_212,limit_0');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .vouchers_bt {
            background-color: #cccccc;
            color: #ffffff;
          }
        }
        .receive {
          .vouchers_bt {
            background-color: #fdedea;
            border: 1px solid #ec5330;
            color: #ec5330;
          }
          .vouchers_item_right {
            background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/fbal9hq2pkg0000.png?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0');
            background-repeat: no-repeat;
            background-size: 100px 100px;
            background-position: 360px 0px;
          }
        }
      }
      .vouchers_tips {
        margin-top: 46px;
        color: #999999;
        font-size: 22px;
        margin-bottom: 40px;
        span {
          color: #4974f5;
        }
      }
    }
  }
}
</style>
