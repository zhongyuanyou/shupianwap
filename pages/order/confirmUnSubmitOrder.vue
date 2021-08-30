<template>
  <div class="PlaceOrder">
    <Head v-show="!editShow" ref="head" title="提交订单">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </template>
    </Head>
    <sp-skeleton
      v-for="_index in 10"
      :key="_index"
      title
      :row="3"
      style="margin-top: 10px"
      :loading="skeletonloading"
    >
    </sp-skeleton>
    <div v-if="!skeletonloading" class="allbox">
      <div class="data-content">
        <div v-for="(item, index) in order.list" :key="index" class="list">
          <div class="right">
            <h1 class="tit">
              {{
                item.salesGoodsSubVos && item.salesGoodsSubVos.length
                  ? item.salesGoodsSubVos[0].goodsSubName
                  : item.name
              }}
            </h1>
            <p v-if="item.salesGoodsSubVos" class="goods-sku">
              {{
                item.salesGoodsSubVos.length
                  ? item.salesGoodsSubVos[0].goodsSubDetailsName
                  : ''
              }}
            </p>
            <p v-if="item.saleGoodsSubs" class="goods-sku">
              {{
                item.saleGoodsSubs.length
                  ? item.saleGoodsSubs[0].goodsSubDetailsName
                  : ''
              }}
            </p>
            <p class="price">
              <span
                ><b>{{ item.salesPrice }}</b
                >元</span
              >
              <i>{{ 'x' + item.skuCount }}</i>
            </p>
          </div>
        </div>
      </div>
      <div v-if="order.orderType === 0" class="deposit">
        <div class="deposit_tips">
          温馨提示：该订单先支付定金在业务办理完成后支付尾款
        </div>
        <div class="deposit_content">
          定金尾款：定金 {{ order.depositAmount }}元，尾款
          {{ order.lastAount }}元
        </div>
      </div>
      <div class="news-content">
        <CellGroup>
          <Cell
            title="商品及服务总数"
            :value="order.num || order.goodsTotal || 0 + '件'"
            value-class="black"
          />
          <Cell
            title="商品金额"
            :value="
              (order.orderTotalMoney || order.orderPayableMoneys || 0) + '元'
            "
            value-class="black"
          />
          <!-- 意向单不用优惠券 -->
          <Cell
            v-if="order.orderType !== 0"
            title="优惠券"
            :value="
              couponInfo.couponPrice
                ? couponInfo.couponPrice + '元'
                : couponInfo.datalist.length > 0
                ? couponInfo.datalist.length + '个优惠券'
                : '无可用'
            "
            is-link
            :value-class="
              couponInfo.couponPrice
                ? 'red'
                : couponInfo.datalist.length > 0
                ? 'black'
                : ''
            "
            @click="openPopupfn()"
          />
          <!-- <Cell
            title="活动卡"
            :value="
              card.cardPrice
                ? card.cardPrice
                : card.datalist.length > 0
                ? card.datalist.length + '个优惠券'
                : '无可用'
            "
            is-link
            :value-class="
              card.cardPrice ? 'red' : card.datalist.length > 0 ? 'black' : ''
            "
            @click="openCardFn()"
          /> -->
        </CellGroup>

        <p class="money">
          合计：
          <span
            ><b>{{ price }}</b> 元</span
          ><span v-if="order.orderType === 0" class="deposit_text"
            >（定金 {{ order.depositAmount }}元，尾款
            {{ order.lastAount }}元）</span
          >
        </p>
      </div>
      <div class="news-content">
        <Cell
          title="支付方式"
          :value="payMethod.text"
          is-link
          value-class="black"
          @click="openPayMethod"
        />
      </div>
      <div class="agreement">
        <Checkbox v-model="radio">
          <template>
            <p class="tit">
              我已阅读过并知晓<span
                class="protocol_name"
                @click.stop="goagr('protocol100008')"
                >《薯片平台订单协议》</span
              ><span v-if="order.isSecuredTrade === 1">
                和<span
                  class="protocol_name"
                  @click.stop="goagr('protocol100044')"
                  >《薯片平台担保交易支付服务协议》</span
                >
              </span>
              <!-- 、<span class="protocol_name" @click="goagr('protocol100033')"
                >《薯片平台交易委托协议》</span
              >、<span class="protocol_name" @click="goagr('protocol100008')"
                >《薯片平台订单协议》</span
              > -->
            </p>
          </template>
        </Checkbox>
      </div>
    </div>
    <div ref="foot" class="foot">
      <p class="left">
        应付:<span>
          <b v-if="order.orderType === 0">{{ order.depositAmount }}</b>
          <b v-if="order.orderType !== 0">{{ price }}</b> 元</span
        >
      </p>
      <div class="right" :class="radio ? 'act' : ''" @click="placeOrder">
        提交订单
      </div>
    </div>

    <LoadingCenter v-show="loading" />
    <Popup
      ref="conpon"
      :show="couponInfo.popupshow"
      :height="75"
      title="优惠"
      help="使用说明"
      :origin-price="order.orderTotalMoney"
      :tablist="couponInfo.tablist"
      :datalist="couponInfo.datalist"
      :nolist="couponInfo.nolist"
      @change="conponChange"
      @close="close"
    ></Popup>
    <PayMethodPopup
      :show="payMethod.show"
      :list="payMethod.list"
      :value="payMethod.value"
      @change="payMethodPopupChange"
      @close="closePayMethod"
    ></PayMethodPopup>

    <CardPopup
      ref="cardPopup"
      :show="card.show"
      :height="75"
      title="活动卡"
      help="使用说明"
      :tablist="card.tablist"
      calculation="已选中活动卡，可抵扣"
      :datalist="card.datalist"
      :nolist="card.nolist"
      @change="cardChange"
      @close="closeCard"
    ></CardPopup>
  </div>
</template>

<script>
import {
  Field,
  Cell,
  CellGroup,
  Checkbox,
  Toast,
  Skeleton,
  CheckboxGroup,
} from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header.vue'
import Popup from '@/components/PlaceOrder/Popup.vue'
import CardPopup from '@/components/PlaceOrder/CardPopup.vue'
import PayMethodPopup from '@/components/PlaceOrder/PayMethodPopup.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { productDetailsApi, auth, shopCart } from '@/api'
import cardApi from '@/api/card'
import orderApi from '@/api/order'
import OrderMixins from '@/mixins/order'

import { coupon, order, actCard } from '@/api/index'
export default {
  name: 'PlaceOrder',
  components: {
    Head,
    Cell,
    CellGroup,
    Checkbox,
    // CheckboxGroup,
    Popup,
    CardPopup,
    PayMethodPopup,
    [Skeleton.name]: Skeleton,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      radio: '', // 选中协议
      checkboxProtocol: [], // 选中协议
      order: {},
      // num: 0,

      couponInfo: {
        popupshow: false,

        selectedItem: {}, // 选择的对象
        couponPrice: '', // 选择的优惠券对象

        tablist: [
          { name: '可用优惠券', num: '', is: true },
          { name: '不可用优惠券' },
        ],
        datalist: [],
        nolist: [],
      },
      card: {
        show: false,
        selectedItem: {}, // 选择的对象
        cardPrice: '', // 选择的card对象立减金额
        tablist: [
          { name: '可用活动卡', num: '', is: true },
          { name: '不可用活动卡' },
        ],
        datalist: [], // 支持的列表
        nolist: [], // 不支持的列表
      },
      payMethod: {
        show: false,
        list: [
          // { value: 'ORDER_PAY_MODE_ONLINE', text: '在线支付' },
          // { value: 'ORDER_PAY_MODE_OFFLINE', text: '线下支付' },
          // { value: 'ORDER_PAY_MODE_SECURED', text: '担保交易' },
        ],
        value: '', // 'ORDER_PAY_MODE_ONLINE',
        text: '', // '在线支付',
      },

      price: '',
      Orderform: {
        orderAgreementIds: [],

        discount: [],

        payType: 'ORDER_PAY_MODE_ONLINE',
      },
      loading: false,
      skeletonloading: true,
      editShow: false,
      productList: [],
    }
  },
  computed: {
    // orderType() {
    //   return this.order.orderType !== 0
    // },
  },
  mounted() {
    this.asyncData()

    // this.getInitData()
    this.getProtocol('protocol100008')

    // this.getProtocol('protocol100033') // 薯片平台交易委托协议

    // this.getProtocol('protocol100044') // 薯片平台担保交易支付服务协议
  },
  methods: {
    onLeftClick() {
      this.$router.back()
    },
    // 打开协议
    goagr(categoryCode) {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode },
      })
    },

    asyncData() {
      this.skeletonloading = false

      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          {
            id: this.$route.query.id,
            cusOrderId: this.$route.query.cusOrderId,
          }
        )
        .then((res) => {
          console.log('res', res)
          // this.changeMoney(res.data || res)
          // const cusDetail = res.data
          // ? res.data.orderSplitAndCusVo
          // : res.orderSplitAndCusVo

          // const data = Object.assign(cusDetail, res.data || res)
          this.changeMoney(res)
          const data = res
          if (data) {
            data.list = []
            this.order = data

            console.log('res', res)
            let num = 0
            data.orderSkuList.map((item) => {
              const obj = {
                name: item.spuHideName || item.spuName,
                classCode: item.classCode,
                classCodeName: item.classCodeName,
                id: item.id,
                skuCount: item.skuCount,
                salesPrice: item.skuPrice,
                salesGoodsSubVos: item.salesGoodsSubVos,
              }
              num += parseInt(item.skuCount) || 0
              this.order.list.push(obj)
            })

            this.order.num = num // this.order.list.length
            this.price = this.order.orderTotalMoney

            // 意向单不使用优惠券
            if (this.order.orderType !== 0) {
              this.getInitData(5) // 获取优惠券
              this.getInitData(6)
            }
            if (order.isSecuredTrade === 1) {
              this.getProtocol('protocol100044')
            }

            this.setPayMethod()
          } else {
            this.$xToast.show('数据异常,请然后再试')
            // setTimeout(() => {
            //   this.$router.back(-1)
            // }, 2000)
          }
        })
        .catch(() => {
          this.$xToast.show('服务器异常,请然后再试')
          // setTimeout(() => {
          //   this.$router.back(-1)
          // }, 2000)
        })
    },
    setPayMethod() {
      if (this.order.isSecuredTrade === 0) {
        this.payMethod.list = [
          { value: 'ORDER_PAY_MODE_ONLINE', text: '在线支付' },
          { value: 'ORDER_PAY_MODE_OFFLINE', text: '线下支付' },
        ]
      } else if (this.order.isSecuredTrade === 1) {
        this.payMethod.list = [
          { value: 'ORDER_PAY_MODE_SECURED', text: '担保交易' },
        ]
      }
      this.payMethod.text = this.payMethod.list[0].text
      this.payMethod.value = this.payMethod.list[0].value
    },
    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warning('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        const data = await auth.protocol(params)
        const { rows = [] } = data || {}
        if (rows.length > 0) {
          this.Orderform.orderAgreementIds.push(rows[0].id)
        }
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },

    // 提交订单
    placeOrder() {
      if (this.Orderform.orderAgreementIds.length === 0) {
        return this.$xToast.warning('协议获取失败!')
      }
      if (!this.payMethod.value) {
        return this.$xToast.warning('请选择支付方式!')
      }
      if (!this.radio) {
        Toast({
          message: '下单前，请先同意《薯片平台用户交易下单协议》',
          overlay: true,
        })
      } else {
        this.loading = true

        if (
          this.couponInfo.couponPrice &&
          this.couponInfo.selectedItem &&
          this.couponInfo.selectedItem.marketingCouponVO.id
        ) {
          const arr = {
            code: 'ORDER_DISCOUNT_DISCOUNT',
            value: this.couponInfo.selectedItem.marketingCouponVO.id,
            couponUseCode: this.couponInfo.selectedItem.couponUseCode,
            no: this.couponInfo.selectedItem.marketingCouponVO.id,
            couponName:
              this.couponInfo.selectedItem.marketingCouponVO.couponName,
            discountType:
              this.couponInfo.selectedItem.marketingCouponVO.merId === -1
                ? 'COUPON_DISCOUNT'
                : 'BUSINESS_COUPON',
            discountSubsidy:
              this.couponInfo.selectedItem.marketingCouponVO.merId === -1
                ? 1
                : 0,
          }
          this.Orderform.discount = new Array(1).fill(arr)
        } else if (
          this.card.cardPrice &&
          this.card.selectedItem &&
          this.card.selectedItem.id
        ) {
          const arr = {
            code: 'ORDER_DISCOUNT_DISCOUNT',
            value: this.card.selectedItem.id,
            couponUseCode: this.card.selectedItem.couponUseCode,
            no: this.card.selectedItem.id,
            couponName: this.card.selectedItem.cardName,
          }
          this.Orderform.discount = new Array(1).fill(arr)
        }

        // const discount = [
        //   {
        //     code: '', // ORDER_DISCOUNT_DISCOUNT:优惠券,ORDER_DISCOUNT_DISCOUT:折扣券，ORDER_DISCOUNT_ACTIVITY:活动优惠，ORDER_DISCOUNT_INTEGRAL:积分抵扣，ORDER_DISCOUNT_ENVELOPES:红包优惠,ORDER_DISCOUNT_BALANCE:余额优惠，ORDER_DISCOUNT_BUSINESS_AFFAIRS:商务优惠
        //     value: '', // 优惠券的id逗号分隔
        //     couponUseCode: '', // 优惠券编码
        //     discountType: '', // COUPON_DISCOUNT  平台优惠券,BUSINESS_COUPON 商户优惠券
        //     no: '', // 优惠劵id
        //     quota: '', //  优惠额度
        //   },
        // ]
        order
          .commit_order(
            { axios: this.$axios },
            {
              orderAgreementIds: this.Orderform.orderAgreementIds.join(','), // 下单协议id，多个id用逗号隔开
              discount: this.Orderform.discount, //
              operateSourcePlat: 'COMDIC_PLATFORM_CRISPS', // 来源 薯片
              operateTerminal: 'COMDIC_TERMINAL_WAP',
              cusOrderId: this.$route.query.cusOrderId,
              payType: this.payMethod.value, // 'ORDER_PAY_MODE_ONLINE', // 支付类型：线上支付：ORDER_PAY_MODE_ONLINE  线下支付：ORDER_PAY_MODE_OFFLINE
            }
          )
          .then((result) => {
            console.log('result', result)
            this.loading = false
            Toast({
              message: '下单成功',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_success',
              overlay: true,
            })
            setTimeout(() => {
              if (
                result.cusOrderPayType === 'PRO_PRE_PAY_POST_SERVICE' ||
                result.cusOrderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS'
              ) {
                // 先付款后服务 PRO_PRE_PAY_POST_SERVICE;先定金后尾款 PRO_PRE_DEPOSIT_POST_OTHERS;
                this.$router.replace({
                  path: '/pay/payType',
                  query: {
                    fromPage: 'orderList',
                    cusOrderId: result.cusOrderId,
                  },
                })
              } else {
                // 意向单和担保交易等 回到订单列表
                this.$router.replace({
                  path: '/order',
                  query: {},
                })
              }
            }, 2000)
          })
          .catch((e) => {
            this.loading = false
            const msg = e.data.error
            Toast({
              message: msg,
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
              overlay: true,
            })
            console.error(e)
          })
      }
    },

    // 对优惠金额进行排序
    getDisPrice(arr, price) {
      arr.forEach((element) => {
        if (element.marketingCouponVO.couponType === 2) {
          element.marketingCouponVO.reducePrice = (
            (1 - Number(element.marketingCouponVO.discount) / 1000) *
            price
          ).toFixed('2')
        }
      })
      return arr
    },
    //  5:订单可用优惠券 6：订单不可用优惠券
    getInitData(index) {
      const arr = this.order.list.map((x) => {
        return x.id
      })
      const list = []
      for (let i = 0; i < this.order.list.length; i++) {
        const item = {
          goodsId: this.order.list[i].id,
          price: this.order.list[i].salesPrice,
          goodsNum: this.order.list[i].salesVolume || 1,
          goodsClassCode: this.order.list[i].classCode,
        }
        list.push(item)
      }
      let price = 0
      if (this.order.salesPrice) {
        price = this.order.salesPrice
      } else if (this.order.skuTotalPrice) {
        price = this.order.skuTotalPrice
      }
      coupon
        .findOrderCouponPage(
          { axios: this.$axios },
          {
            findType: index,
            userId: this.$store.state.user.userId,
            actionId: arr,
            orderPrice: price,
            orderByWhere: 'createTime=desc',
            limit: 50,
            page: 1,
            commodityList: list,
          }
        )
        .then((result) => {
          if (index === 5) {
            this.couponInfo.datalist = result.marketingCouponLogList
            const sortList1 = this.getDisPrice(
              result.marketingCouponLogList,
              this.order.salesPrice || this.order.skuTotalPrice
            )
            const sortList = sortList1.sort((a, b) => {
              return (
                b.marketingCouponVO.reducePrice -
                a.marketingCouponVO.reducePrice
              )
            })
            this.couponInfo.datalist = sortList
            // if (sortList.length > 0) {
            //   this.datalist = sortList
            //   this.conpon = this.datalist[0]
            //   this.$refs.conpon.radio = 0
            //   this.$refs.conpon.checkarr = this.datalist[0]
            //   this.$refs.conpon.num =
            //     this.$refs.conpon.checkarr.marketingCouponVO.reducePrice
            //   this.$refs.conpon.sum()
            // } else {
            // }
          } else {
            this.couponInfo.nolist = result.marketingCouponLogList
          }
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.$xToast.show(e)
          }
        })
    },

    getCardList() {
      actCard
        .goods_card_list({
          condition: 1, // 查询条件 1 查询可用 2查询不可用
          productList: this.productList,
        })
        .then((res) => {
          this.card.datalist = res || []
        })
      actCard
        .goods_card_list({
          condition: 2, // 查询条件 1 查询可用 2查询不可用
          productList: this.productList,
        })
        .then((res) => {
          this.card.nolist = res || []
        })
    },

    conponChange(price, num, item) {
      this.price = price
      this.couponInfo.couponPrice = num
      this.couponInfo.selectedItem = item || {}
      this.card.cardPrice = ''
      this.card.selectedItem = {}
    },
    cardChange(price, num, item) {
      this.price = price
      this.couponInfo.couponPrice = ''
      this.couponInfo.selectedItem = {}
      this.card.cardPrice = num
      this.card.selectedItem = item || {}
    },
    payMethodPopupChange(item) {
      this.payMethod.value = item.value
      this.payMethod.text = item.text
    },
    openPopupfn() {
      this.couponInfo.popupshow = true
    },
    openCardFn() {
      this.card.show = true
    },
    openPayMethod() {
      if (this.payMethod.list.length === 1) {
        return
      }
      if (this.payMethod.list.length) {
        this.payMethod.show = true
      } else {
        this.$xToast.error('未获取到支付方式' || '')
      }
    },

    close() {
      this.couponInfo.popupshow = false
    },
    closeCard() {
      this.card.show = false
    },
    closePayMethod() {
      this.payMethod.show = false
    },
  },
}
</script>

<style lang="less" scoped>
.PlaceOrder {
  background: #f8f8f8;
  height: 100vh;
  ::v-deep.sp-skeleton__row,
  .sp-skeleton__title {
    background: #fff;
  }
  ::v-deep .sp-cell__right-icon {
    color: #cccccc;
  }

  > .allbox {
    padding-bottom: 24px;
    overflow-y: auto;
    height: calc(100vh - 128px - 88px);
    > .data-content {
      padding: 0 40px;
      background: #fff;
      > .list {
        display: flex;
        border-bottom: 1px solid #f4f4f4;
        padding: 32px 0;
        > .left {
          width: 160px;
          height: 160px;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
          }
        }
        > .right {
          // margin-left: 32px;
          // width: calc(100% - 192px);
          width: 100%;
          > h1 {
            width: 100%;
            font-size: 32px;
            font-weight: bold;
            color: #222222;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          > .tag {
            margin-top: 14px;
            font-size: 22px;
            font-weight: 400;
            color: #999999;
          }
          > .price {
            display: flex;
            margin-top: 31px;
            > span {
              font-size: 28px;
              font-weight: bold;
              color: #ec5330;
              width: 40%;
              > b {
                font-size: 36px;
              }
            }
            > i {
              font-size: 22px;
              font-weight: bold;
              color: #222222;
              font-style: normal;
              padding-top: 10px;
              margin-left: auto;
            }
          }
          > .list {
            margin-top: 30px;
            > div {
              margin-top: 14px;
              display: flex;
              > .name {
                width: 29%;
                font-size: 22px;
                font-weight: bold;
                color: #222222;
                margin-right: 5%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              > .data {
                width: 40%;
                font-size: 22px;
                font-weight: 400;
                color: #222222;
                margin-right: 5%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              > .price {
                margin-left: auto;
                font-size: 22px;
                font-weight: bold;
                color: #222222;
              }
            }
          }
        }
      }
      > .inpbox {
        ::v-deep.sp-field {
          padding: 20px 0;
        }
      }
    }
    > .news-content {
      margin-top: 24px;
      background: #fff;
      ::v-deep.sp-cell::after {
        display: none;
      }
      ::v-deep.sp-hairline--top-bottom::after {
        display: none;
      }
      .black {
        color: #1a1a1a;
      }
      .red {
        color: #ec5330;
        font-weight: bold;
      }
      > .money {
        padding: 15px 30px;
        text-align: right;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        span {
          font-size: 22px;
          color: #ec5330;
          b {
            font-size: 30px;
          }
        }
        .deposit_text {
          color: #222222;
        }
      }
    }
    .deposit {
      margin-top: 24px;
      background: #fff;
      padding: 36px 40px;
      .deposit_tips {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        line-height: 34px;
      }
      .deposit_content {
        margin-top: 20px;
        height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #222222;
        letter-spacing: 0;
      }
    }
    > .contract {
      margin-top: 24px;
      background: #fff;
      .ys {
        color: #1a1a1a;
      }
    }
    > .agreement {
      margin-top: 24px;
      background: #fff;
      padding: 40px 0 40px 40px;
      .tit {
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        > .protocol_name {
          color: #4974f5;
        }
      }
    }
  }
  > .foot {
    padding: 0 40px;
    height: 128px;
    display: flex;
    align-items: center;
    background: #fff;
    > .left {
      font-size: 32px;
      font-weight: 400;
      color: #222222;
      > span {
        font-size: 28px;
        color: #ec5330;
        > b {
          font-size: 48px;
        }
      }
    }
    > .right {
      width: 186px;
      height: 80px;
      background: #ec5330;
      border-radius: 8px;
      font-size: 28px;
      font-weight: bold;
      line-height: 80px;
      text-align: center;
      color: #fff;
      margin-left: auto;
      opacity: 0.4;
    }
    .act {
      opacity: 1;
    }
  }
  > .contractbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
.goods-sku {
  color: #666;
  font-size: 24px;
  margin-top: 4px;
}
</style>
