<template>
  <div class="container">
    <div v-if="serviceTag && serviceTag.length" class="cell">
      <div class="cell_left">
        <div class="label">保障</div>
        <div class="server_tags">
          <span
            v-for="(item, index) in serviceTag"
            :key="index"
            class="item"
            :class="index === serviceTag.length - 1 ? 'last_item' : ''"
            >{{ item.title }}</span
          >
        </div>
      </div>
      <!-- <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" /> -->
    </div>
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
    <div v-if="goodsSubDetailsName.length === 1" class="cell">
      <div class="cell_left">
        <div class="label">已选</div>
        <div class="content">
          <span class="hide">{{
            goodsSubDetailsName[0]['goodsSubDetailsName']
          }}</span>
        </div>
      </div>
      <!-- <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" /> -->
    </div>
    <div
      v-if="sellingGoodsData.salesGoodsSubVos.length"
      class="cell"
      @click="openServeItem"
    >
      <div class="cell_left">
        <div class="label">服务</div>
        <div class="content">
          <span
            v-if="sellingGoodsData.salesGoodsSubVos.length === 1"
            class="hide"
            >平台提供优质服务</span
          >
          <span v-else class="hide"
            >{{
              sellingGoodsData.salesGoodsSubVos[0].productName ||
              sellingGoodsData.salesGoodsSubVos[0].goodsSubName
            }},{{
              sellingGoodsData.salesGoodsSubVos[0].goodsSubDetailsName
            }}</span
          >
        </div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <div v-if="showServerCicle" class="cell">
      <div class="cell_left">
        <div class="label">服务周期</div>
        <div class="content">
          {{ sellingGoodsData.refConfig.handleCycleNumber }} 天
        </div>
      </div>
    </div>
    <div class="cell youhui">
      <div class="inner">
        <my-icon
          name="gerenzhongxin_youhuiquanicon"
          size="0.36rem"
          color="#EC5330"
          class="my_icon"
        ></my-icon>
        线下优惠可咨询{{ plannerText }}
        <imBtn btn-text="询优惠" />
      </div>
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
        使用以下优惠券后预估价<span>{{ couponPreferentialLine }}</span
        >元
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
                <div v-if="item.couponType === 1">
                  <div class="coupon_price">{{ item.reducePrice }}</div>
                  <div v-if="item.fullPrice == 0" class="can_use">无门槛</div>
                  <div v-else class="can_use">满{{ item.fullPrice }}元可用</div>
                </div>
                <div v-else>
                  <div class="coupon_discount">
                    {{ getDiscount(item.discount) }}
                    <span>折</span>
                  </div>
                  <div v-if="item.fullPrice == 0" class="can_use">无门槛</div>
                  <div v-else class="can_use">满{{ item.fullPrice }}元可用</div>
                </div>
              </div>
              <div class="vouchers_item_right">
                <div class="vouchers_title">
                  <span
                    class="types"
                    :class="item.couponStatus === 1 ? 'no-coupon' : 'type-name'"
                    >{{ item.couponType === 1 ? '满减券' : '折扣券' }}</span
                  >
                  {{ item.couponName }}
                </div>
                <div class="vouchers_desc">
                  <span v-if="item.useType === 1">全场通用</span>
                  <span v-if="item.useType === 2">
                    {{
                      item.productName
                        ? `"${item.productName}"-可用`
                        : '仅限指定品类使用'
                    }}
                  </span>
                  <span v-if="item.useType === 3">
                    {{
                      item.productName
                        ? `"${item.productName}"-可用`
                        : '仅限指定商品使用'
                    }}
                  </span>
                </div>
                <div class="vouchers_date">
                  {{ item.serviceLife }}
                </div>
                <div
                  class="vouchers_bt"
                  :class="
                    item.couponStatus === 1
                      ? 'no-coupon'
                      : item.couponStatus === 2
                      ? 'no-use'
                      : ''
                  "
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
    <!-- 基础商品服务项弹窗 -->
    <sp-popup
      v-model="serveModalShow"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '0.4rem 0.4rem' }"
      class="serve_popup"
    >
      <p class="pop_title">服务项目</p>
      <div
        v-for="(subItem, subIndex) in sellingGoodsData.salesGoodsSubVos"
        :key="subIndex"
        class="goods_sub_item"
      >
        <div class="goods_name_area">
          <p class="goods_sub_name">{{ subItem.goodsSubName }}</p>
          <p class="goods_sub_sku">
            {{ subItem.goodsSubDetailsName }}
          </p>
        </div>
        <div v-if="subItem.serviceItems.length" class="serve_list">
          <p class="serve_name">服务项目</p>
          <p
            v-for="(serverItem, serverIndex) in subItem.serviceItems"
            :key="serverIndex"
            class="goods_sub_server"
          >
            <span>{{ serverIndex + 1 }}、</span>
            <span>{{
              serverItem.serviceItemName || serverItem.description
            }}</span>
          </p>
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
import { Cell, Popup, Safeguard, Image, Button } from '@chipspc/vant-dgg'
import { coupon, productDetailsApi } from '@/api'
import imBtn from '@/components/detail/common/RecImBtn'
import imHandle from '~/mixins/imHandle'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
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
    [Button.name]: Button,
    imBtn,
  },
  mixins: [imHandle],
  data() {
    return {
      serveModalShow: false,
      type: 1, // 1 加入购物车、立即购买  2 加入购物车  3 立即购买
      vouchers: '',
      show: false,
      skuShow: false,
      safeguardShow: false,
      num: 1,
      imgFileIdPaths: [
        'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
      ], // 商品图片
      skuResult: [], // sku
    }
  },
  computed: {
    plannerText() {
      return this.$route.path.match('detail/server/law')
        ? '律师经纪人'
        : '规划师'
    },
    plannerDetail() {
      return this.$store.state.planner.isShare
        ? this.$store.state.planner.sharePlannerInfo
        : this.$store.state.planner.recodBottomPlanner
    },
    sellingGoodsData() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    // 是否展示服务周期
    showServerCicle() {
      return (
        this.sellingGoodsData.salesGoodsSubVos &&
        this.sellingGoodsData.salesGoodsSubVos.length === 1 &&
        this.sellingGoodsData.refConfig.handleCycleNumber &&
        this.$route.path === '/detail/server/internet'
      )
    },
    serviceTag() {
      const salesGoodsTags =
        this.$store.state.sellingGoodsDetail.sellingGoodsData.salesGoodsTags
      let serviceTag = []
      if (salesGoodsTags) {
        // 产品中心605版本筛选服务标签 code DSJTC20210514000043
        serviceTag = salesGoodsTags
          .filter((item) => {
            return item.categoryCode === 'DSJTC20210514000043'
          })
          .map((item) => {
            return {
              text: item.ext1 || item.ext2 || item.ext3,
              title: item.tagValueName,
              icon: 'sp-iconfont sp-iconfont-security2',
            }
          })
          .slice(0, 3)
      }
      return serviceTag
    },
    // 优惠券列表
    coupon() {
      const list = []
      const couponList =
        this.$store.state.sellingGoodsDetail.sellingGoodsData.couponList
      // try {
      //   for (let i = 0; i < couponList.length; i++) {
      //     const matchServiceLife = couponList[i].serviceLife.match('-')
      //     if (matchServiceLife) {
      //       const time0Obj = couponList[i].serviceLife.split('-')[0]
      //       const time1Obj = couponList[i].serviceLife.split('-')[1]
      //       const time0 = new Date(time0Obj).getTime()
      //       const time1 = new Date(time1Obj).getTime() + 24 * 3600 * 1000
      //       const time2 = new Date().getTime()
      //       if (time0 <= time2 && time1 >= time2) {
      //         list.push(couponList[i])
      //       }
      //     } else {
      //       list.push(couponList[i])
      //     }
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
      // const list2 = JSON.parse(JSON.stringify(list))
      // // 根据优惠金额对优惠券排序
      // const sortcouponList = this.rangeDiscountPrice(
      //   list2,
      //   this.$store.state.sellingGoodsDetail.sellingGoodsData.salesPrice ||
      //     this.$store.state.sellingGoodsDetail.sellingGoodsData.price
      // )
      // 根据优惠金额对优惠券排序
      const sortcouponList = this.rangeDiscountPrice(
        couponList,
        this.$store.state.sellingGoodsDetail.sellingGoodsData.salesPrice ||
          this.$store.state.sellingGoodsDetail.sellingGoodsData.price
      )
      return sortcouponList
    },
    // 预估价
    couponPreferentialLine() {
      // 过滤达到满减条件的优惠券
      const canUseCoupon = JSON.parse(JSON.stringify(this.coupon)).filter(
        (item) => {
          return item.fullPrice < this.sellingGoodsData.salesPrice
        }
      )
      if (canUseCoupon.length) {
        const price1 = this.sellingGoodsData.salesPrice * 100
        const price2 = canUseCoupon[0].reducePrice * 100
        let preFrice = price1 - price2
        if (preFrice < 0) preFrice = 0
        return preFrice / 100
      }
      return 0.0
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
    getDiscount(count) {
      return Number(count) / 100
    },
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
        const list2 = JSON.parse(JSON.stringify(couponList))
        // 根据优惠金额对优惠券排序
        const sortcouponList = this.rangeDiscountPrice(
          list2,
          sellingGoodsData.salesPrice || sellingGoodsData.price
        )
        console.log('sortcouponList', sortcouponList)
        //  取最大优惠金额
        const salesPrice =
          sellingGoodsData.salesPrice - sortcouponList[0].reducePrice
        const salesPriceRes = salesPrice >= 0 ? salesPrice : 0
        //  组装优惠券提示信息
        const info1 = sortcouponList[0]
        const info2 = sortcouponList[1]
        let vouchers1 = ''
        if (info1.couponType === 1) {
          if (info1.fullPrice === 0) {
            vouchers1 = `无门槛减${info1.reducePrice}元`
          } else {
            vouchers1 = `满${info1.fullPrice}减${info1.reducePrice}元`
          }
        } else {
          vouchers1 = Number(info1.discount) / 100 + '折'
        }
        if (!info2) {
          this.vouchers = vouchers1
          return
        }
        let vouchers2 = ''
        if (info2.couponType === 1) {
          if (info2.fullPrice === 0) {
            vouchers2 = `无门槛减${info2.reducePrice}元`
          } else {
            vouchers2 = `满${info2.fullPrice}减${info2.reducePrice}元`
          }
        } else {
          vouchers2 = Number(info2.discount) / 100 + '折'
        }
        this.vouchers = vouchers1 + ', ' + vouchers2
      }
    },
    // 对优惠金额进行排序
    rangeDiscountPrice(arr, price) {
      arr.forEach((element) => {
        if (element.couponType === 2) {
          element.reducePrice = (
            (1 - Number(element.discount) / 1000) *
            price
          ).toFixed('2')
        }
      })
      arr.sort((a, b) => {
        return b.reducePrice - a.reducePrice
      })
      return arr
    },
    // 领取优惠券
    async getCoupons(id, status) {
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        if (status === 0) {
          const params = {
            couponId: id,
          }
          this.$axios
            .post(
              `${CHIPS_WAP_BASE_URL}/yk/coupon/v2/receive_coupon.do`,
              params
            )
            .then((res) => {
              this.$xToast.success('优惠券领取成功')

              let couponStatus = 0
              if (res && res.code === 200) {
                this.$xToast.success('领取成功')
                couponStatus = 2
              } else if (res && res.code === 510) {
                // 重复领取
                couponStatus = 2
                this.$xToast.error(res.message || '领取失败')
              } else {
                // res.code === 500
                couponStatus = 1
                this.$xToast.error(res.message || '领取失败')
              }

              this.$store.commit('sellingGoodsDetail/SET_SELLING_COUPONLIST', {
                cid: id,
                couponStatus,
              })
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
    openServeItem() {
      this.serveModalShow = true
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
          console.log('skuResult', this.skuResult)
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
  border-radius: 24px;
  margin-bottom: 24px;
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
      .server_tags {
        font-size: 26px;
        color: #222222;
        .item {
          position: relative;
          padding-right: 40px;
          &::before {
            height: 16px;
            position: absolute;
            right: 15px;
            content: '·';
            top: 0;
            font-size: 24px;
            font-weight: 600;
          }
        }
        ::v-deep.last_item {
          position: initial;
          padding-right: 0;
          &::before {
            position: initial;
            content: '';
          }
        }
      }
      .content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        // align-items: center;
        // flex: 1;
        max-width: 550px;
        color: #222222;
        font-size: 26px;
        height: 40px;
        overflow: hidden;
        white-space: nowrap;
        .tag {
          display: inline-block;
          // width: 60px;
          padding: 0px 8px;
          border-radius: 4px;
          // height: 32px;
          // line-height: 32px;
          background-color: #feefef;
          color: #f1524e;
          font-size: 22px;
          text-align: center;
          margin-right: 9px;
        }
        .hide {
          width: 432px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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
  .youhui {
    width: 100%;
    display: block;
    padding: 22px 40px;
    height: 18vw;
    font-size: 28px;
    color: #1a1a1a;
    text-align: left;
    line-height: 88px;
    .inner {
      padding: 0 32px;
      width: 100%;
      height: 100%;
      border: 1px solid #ec5330;
      border-radius: 4px;
    }
    .my_icon {
      float: left;
      margin-right: 12px;
    }
    .im_btn {
      float: right;
      background: #ec5330;
      border-radius: 8px;
      width: 118px;
      height: 56px;
      text-align: center;
      color: white;
      font-size: 26px;
      padding: 0;
      line-height: 56px;
      margin-top: 16px;
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
    margin-bottom: 20px;
    padding: 0 40px;
  }
  .p2 {
    color: #222222;
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 24px;
    padding: 0 40px;
    span {
      color: #ec5330;
      font-weight: 600;
    }
  }
  .popup_box {
    padding: 0 40px;
    overflow-y: auto;
    position: relative;
    .vouchers_box_title {
      padding-top: 20px;
      color: #222222;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .vouchers_box {
      max-height: 820px;
      padding-bottom: 54px;
      .vouchers_list {
        .vouchers_item {
          display: flex;
          margin-bottom: 20px;
          width: 670px;
          height: 216px;
          padding-bottom: 4px;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/g4kbai7wgrk0000.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          .vouchers_item_left {
            width: 200px;
            padding-top: 30px;
            text-align: center;
            .coupon_price {
              //   height: 67px;
              font-size: 42px;
              font-family: Bebas;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
              padding-top: 20px;
              overflow: hidden;
              position: relative;
              // text-overflow: ellipsis;
              // white-space: nowrap;
            }
            .can_use {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
            }
            .coupon_discount {
              // font-size: 72px;
              // font-family: Bebas;
              // font-weight: 400;
              // color: #ffffff;
              // text-align: center;
              // padding-top: 24px;
              // position: relative;
              // padding-right: 20px;
              // margin-bottom: 10px;
              font-size: 42px;
              font-family: Bebas;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
              padding-top: 20px;
              overflow: hidden;
              position: relative;
              span {
                position: absolute;
                font-size: 28px;
                bottom: 0;
              }
            }
            .amount {
              font-size: 62px;
              color: #ffffff;
              margin-bottom: 20px;
            }
            .conditions {
              color: #ffffff;
              font-size: 24px;
              padding-left: 10px;
              padding-right: 10px;
            }
          }
          .vouchers_item_right {
            /*flex: 1;*/
            padding-left: 24px;
            padding-top: 30px;
            width: 462px;
            padding-right: 32px;
            position: relative;
            .vouchers_title {
              position: relative;
              font-size: 32px;
              font-weight: bold;
              color: #222222;
              line-height: 40px;
              margin: 0 0 12px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding-left: 74px;
              span {
                position: absolute;
                border-radius: 4px;
                font-size: 24px;
                left: 0;
                top: 2px;
                line-height: 24px;
              }
              .type-name {
                color: #ffffff;
                background-image: linear-gradient(
                  90deg,
                  #fa6d5a 0%,
                  #fa5741 100%
                );
                transform: scale(0.8);
                transform-origin: 0 0.04rem;
                line-height: 0;
                padding: 0.2rem 0.08rem;
              }
              .no-coupon {
                background: #cccccc;
                color: #ffffff;
                transform: scale(0.8);
                transform-origin: 0 0.04rem;
                line-height: 0;
                padding: 0.2rem 0.08rem;
              }
            }
            .vouchers_desc {
              color: #555555;
              font-size: 24px;
              width: 251px;
              line-height: 32px;
              min-height: 64px;
              margin-bottom: 6px;

              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
            .vouchers_date {
              color: #999999;
              font-size: 20px;
            }
            .vouchers_bt {
              position: absolute;
              top: 104px;
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
            .no-coupon {
              background: #cccccc;
              color: #ffffff;
            }
            .no-use {
              background: #fdedea;
              border: 1px solid #ec5330;
              border-radius: 27px;
              color: #ec5330;
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
// 服务项弹窗
.serve_popup {
  font-size: 24px;
  .pop_title {
    width: 100%;
    font-weight: bold;
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    height: 40px;
    margin-bottom: 10px;
  }
  .goods_sub_item {
    margin-top: 40px;
    width: 100%;
    .goods_name_area {
      background: #f8f8f8;
      border-radius: 8px;
      padding: 10px 20px;
      .goods_sub_name {
        font-weight: bold;
        font-size: 28px;
        color: #222222;
        line-height: 38px;
        margin-bottom: 10px;
      }
      .goods_sub_sku {
        font-size: 26px;
        color: #555555;
        line-height: 36px;
      }
    }
    .serve_list {
      padding: 0 20px;
      margin-top: 20px;
      .serve_name {
        font-size: 26px;
        color: #555555;
        line-height: 36px;
        font-weight: bold;
      }
      .goods_sub_server {
        margin-top: 10px;
        font-size: 24px;
        color: #999999;
        line-height: 34px;
      }
    }
  }
}
</style>
