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
    <div
      v-if="!skeletonloading"
      :class="isInApp ? 'allbox2' : ''"
      class="allbox"
    >
      <div class="data-content">
        <div
          v-for="(item, index) in settlementInfo.productVo"
          :key="index"
          class="list"
        >
          <div class="right">
            <h1 class="tit">
              {{ item.name }}
            </h1>

            <p v-if="item.skuExtInfo" class="goods-sku">
              {{ item.skuExtInfo }}
            </p>

            <p class="price">
              <span>
                <b
                  v-if="
                    goodsSkuDetail &&
                    goodsSkuDetail.sku &&
                    goodsSkuDetail.sku.targetRate
                  "
                  >(含服务费{{ goodsSkuDetail.sku.targetRate }}%)</b
                >
                <b v-if="isIntendedOrder">预计:</b>
                <b class="price_text">{{ item.price }}</b
                >元
              </span>

              <i>{{ 'x' + item.goodsNumber }}</i>
            </p>
          </div>
        </div>
      </div>

      <!-- 根据当前的付款模式，先付款后服务/先定金后尾款/先服务后付款/按节点付费，展示不同的模块 -->
      <div
        v-if="settlementInfo.cusOrderPayType!=='PRO_PRE_PAY_POST_SERVICE'"
      >
        <div v-if="isDeposit" class="deposit">
          <!-- 先定金后尾款 -->
          <div class="deposit_tips">
            温馨提示：该订单先支付定金在业务办理完成后支付尾款
          </div>
          <div class="deposit_content">
            定金尾款：定金 {{ settlementInfo.depositAmount }}元,<span
              >尾款 {{ settlementInfo.orderBalanceMoney }}元</span
            >
          </div>
        </div>

        <div v-else-if="isServiceFinshed" class="deposit">
          <!-- 服务完结收费的意向单 -->
          <div class="deposit_tips">
            温馨提示：该订单可享受业务办理完成后付费
          </div>
          <div class="deposit_content">
            <span>先服务后付款</span>
          </div>
        </div>
        <div v-else class="deposit">
          <div class="deposit_tips">
            温馨提示：{{
              isNodes ? '该订单按服务节点付费' : '该订单先付款后服务'
            }}
          </div>
          <div class="deposit_content">
            总价 {{ settlementInfo.orderTotalMoney }}元，应付款{{
              settlementInfo.orderPayableMoney
            }}元
          </div>
        </div>
      </div>
      <div class="news-content">
        <p class="order_sku">
          <span class="title">商品及服务总数</span>
          <span class="value">
            <b>{{ goodsNumberSum }}</b
            >件
          </span>
        </p>
        <p class="order_sku">
          <span class="title">商品金额</span>
          <span class="value">
            <span v-if="isIntendedOrder">预计</span>
            <b>{{ settlementInfo.orderTotalMoney }}</b
            >元
          </span>
        </p>
        <CellGroup>
          <!-- <Cell
            title="商品及服务总数"
            :value="goodsNumberSum + '件'"
            value-class="black"
          />
          <Cell
            title="商品金额"
            :value="
              isIntendedOrder
                ? '预计' + (settlementInfo.orderTotalMoney || 0) + '元'
                : (settlementInfo.orderTotalMoney || 0) + '元'
            "
            value-class="black"
          /> -->
          <!-- 意向单不用优惠券 -->
          <Cell
            title="优惠券"
            :value="
              parseFloat(settlementInfo.orderDiscountMoney)
                ? -settlementInfo.orderDiscountMoney + '元'
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
        <!--  settlementInfo.orderPayableMoney  -->
        <p class="money">
          合计：
          <span class="money_price">
            <b class="money_text">{{
              (settlementInfo.orderTotalMoney || 0) -
              (settlementInfo.orderDiscountMoney || 0)
            }}</b
            >元 <b v-if="isIntendedOrder" class="toast_text">预计</b></span
          >
          <span v-if="isDeposit" class="deposit_text"
            >（ 定金 {{ settlementInfo.depositAmount }}元，<span
              class="deposit_text"
              >尾款 {{ settlementInfo.orderBalanceMoney }}元</span
            >）</span
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
              ><span v-if="settlementInfo.isSecuredTrade === 1">
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
    <div ref="foot" :class="isInApp ? 'foot2' : ''" class="foot">
      <p class="left">
        应付:<span>
          <b v-if="isDeposit">{{ settlementInfo.depositAmount }}</b>
          <b v-else-if="isNodes">0</b>
          <b v-else-if="isServiceFinshed">0</b>
          <b v-else-if="isBeforePay">{{ settlementInfo.orderPayableMoney }}</b>
          元</span
        >
      </p>
      <div class="right" :class="radio ? 'act' : ''" @click="placeOrder">
        提交订单
      </div>
    </div>

    <LoadingCenter v-show="loading" />
    <PopupUnSubmit
      ref="conpon"
      :show="couponInfo.popupshow"
      :height="75"
      title="优惠"
      help="使用说明"
      :cus-order-id="$route.query.cusOrderId"
      :origin-price="tradeMarkPriceSum || settlementInfo.orderTotalMoney"
      :tablist="couponInfo.tablist"
      :datalist="couponInfo.datalist"
      :nolist="couponInfo.nolist"
      @change="conponChange"
      @close="close"
    ></PopupUnSubmit>
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
import { mapState } from 'vuex'
import Head from '@/components/common/head/header.vue'
import PopupUnSubmit from '@/components/PlaceOrder/PopupUnSubmit.vue'
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
    PopupUnSubmit,
    CardPopup,
    PayMethodPopup,
    [Skeleton.name]: Skeleton,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      goodsSkuDetail: {},
      radio: '', // 选中协议
      checkboxProtocol: [], // 选中协议
      order: {},

      settlementInfo: {},
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

      Orderform: {
        orderAgreementIds: [],

        discount: [],

        payType: 'ORDER_PAY_MODE_ONLINE',
      },

      loading: false,
      skeletonloading: true,
      editShow: false,
      productList: [],

      requestOnce: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
    // 是否是服务商品
    // 其他的是交易/销售/资源
    isServerGoods() {
      return this.settlementInfo?.orderProTypeNo === 'PRO_CLASS_TYPE_SERVICE'
    },
    // 是否交易商品，下单后直接跳转列表
    isTRANSACTION() {
      return (
        this.settlementInfo?.orderProTypeNo === 'PRO_CLASS_TYPE_TRANSACTION'
      )
    },

    // 是否先定金后服务
    isDeposit() {
      return (
        this.settlementInfo?.cusOrderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS'
      )
    },
    // 服务完结收费
    isServiceFinshed() {
      return (
        this.settlementInfo?.cusOrderPayType === 'PRO_PRE_SERVICE_FINISHED_PAY'
      )
    },
    // 节点付费
    isNodes() {
      return (
        this.settlementInfo?.cusOrderPayType ===
        'PRO_PRE_SERVICE_POST_PAY_BY_NODE'
      )
    },
    // 先付款后服务
    isBeforePay() {
      return this.settlementInfo?.cusOrderPayType === 'PRO_PRE_PAY_POST_SERVICE'
    },

    // 是否是意向单
    isIntendedOrder() {
      return parseInt(this.settlementInfo.orderType) === 0
      // return this.isIntendedOrder
    },
    // 是否担保订单
    isSecuredTrade() {
      return parseInt(this.settlementInfo.isSecuredTrade) === 1
    },

    tradeMarkPriceSum() {
      let sum = 0
      if (this.settlementInfo.productVo) {
        this.settlementInfo.productVo.map((item) => {
          sum += parseFloat(item.tradeMarkPrice || 0)
        })
      }
      return sum
    },

    goodsNumberSum() {
      let sum = 0
      if (this.settlementInfo.productVo) {
        this.settlementInfo.productVo.map((item) => {
          sum += parseFloat(item.goodsNumber || 0)
        })
      }
      return sum
    },
  },
  mounted() {
    this.asyncData()

    this.getProtocol('protocol100008')
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
      this.settlement() // 调用接口结算，和获取会员价
    },

    // 获取待结算价格
    settlement() {
      order
        .settle_order_by_unsubmit(
          { axios: this.$axios },
          {
            orderId: this.$route.query.cusOrderId,
            couponUseCode: this.couponInfo.selectedItem.couponUseCode,
            couponId: this.couponInfo.selectedItem.couponId,
          }
        )
        .then((result) => {
          this.goodsSkuDetail = JSON.parse(result.orderSkuList[0].skuDetailInfo)
          if (this.goodsSkuDetail.sku.targetRate) {
            this.goodsSkuDetail.sku.targetRate = parseFloat(
              this.goodsSkuDetail.sku.targetRate
            )
          }
          this.settlementInfo = result

          if (this.requestOnce === false) {
            // 意向单不使用优惠券
            if (!this.isIntendedOrder) {
              this.getInitData(5) // 获取优惠券
              this.getInitData(6)
            }
            if (this.settlementInfo.isSecuredTrade === 1) {
              this.getProtocol('protocol100044')
            }

            this.setPayMethod()
            this.requestOnce = true
          }
        })
        .catch((error) => {
          console.log('settle_order_by_unsubmit', error)
          this.$xToast.warning('服务器异常,请然后再试')
        })
    },

    setPayMethod() {
      if (parseInt(this.settlementInfo.isSecuredTrade) === 0) {
        this.payMethod.list = [
          { value: 'ORDER_PAY_MODE_ONLINE', text: '在线支付' },
          { value: 'ORDER_PAY_MODE_OFFLINE', text: '线下支付' },
        ]
      } else if (parseInt(this.settlementInfo.isSecuredTrade) === 1) {
        this.payMethod.list = [
          { value: 'ORDER_PAY_MODE_SECURED', text: '担保交易' },
        ]
      }
      // 选择优惠券重新赋值待优化
      if (this.settlementInfo?.payType) {
        const pay = this.payMethod.list.find((item) => {
          return item.value === this.settlementInfo?.payType
        })
        if (pay && pay.value) {
          this.payMethod.text = pay.text
          this.payMethod.value = pay.value
        }
      } else {
        this.payMethod.text = this.payMethod.list[0].text
        this.payMethod.value = this.payMethod.list[0].value
      }
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

            if (this.payMethod.value === 'ORDER_PAY_MODE_SECURED') {
              this.$xToast.error(
                '该订单为担保交易订单，请访问薯片网站PC端进行付款！'
              )
            } else if (this.payMethod.value === 'ORDER_PAY_MODE_OFFLINE') {
              this.$xToast.error('请前往线下银行网点进行支付！')
            } else {
              Toast({
                message: '下单成功',
                iconPrefix: 'sp-iconfont',
                icon: 'popup_ic_success',
                overlay: true,
              })
            }
            setTimeout(() => {
              if (this.isTRANSACTION) {
                // 交易商品
                this.jumpToOrder()
              } else if (this.payMethod.value === 'ORDER_PAY_MODE_SECURED') {
                // 担保交易
                this.jumpToOrder()
              } else if (this.payMethod.value === 'ORDER_PAY_MODE_OFFLINE') {
                // 线下付款
                this.jumpToOrder()
              } else if (
                result.cusOrderPayType === 'PRO_PRE_PAY_POST_SERVICE' ||
                result.cusOrderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS'
              ) {
                // 先付款后服务 PRO_PRE_PAY_POST_SERVICE;
                // 先定金后尾款 PRO_PRE_DEPOSIT_POST_OTHERS;
                this.$router.replace({
                  path: '/pay/payType',
                  query: {
                    fromPage: 'orderList',
                    cusOrderId: result.cusOrderId,
                  },
                })
              } else {
                // 意向单和担保交易等 回到订单列表
                this.jumpToOrder()
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
    jumpToOrder() {
      this.$router.replace({
        path: '/order',
        query: {},
      })
      // if (!this.isInApp) {
      //   this.$router.replace({
      //     path: '/order',
      //     query: {},
      //   })
      // } else {
      //   const iOSRouter = {
      //     path: 'CPSCustomer:CPSCustomer/CPSOrderViewController///push/animation',
      //     parameter: {
      //       listType: 0,
      //       isPush: 1,
      //     },
      //   }
      //   const androidRouter = {
      //     path: '/cpsc/order/orderList',
      //     parameter: {
      //       orderIndex: 0,
      //     },
      //   }
      //   const iOSRouterStr = JSON.stringify(iOSRouter)
      //   const androidRouterStr = JSON.stringify(androidRouter)
      //   this.$appFn.dggJumpRoute(
      //     {
      //       iOSRouter: iOSRouterStr,
      //       androidRouter: androidRouterStr,
      //     },
      //     (res) => {
      //       console.log(res)
      //     }
      //   )
      // }
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
      const arr = this.settlementInfo.productVo.map((x) => {
        return x.id
      })
      const list = []
      this.settlementInfo.productVo.map((product) => {
        const orderSaleId = product.id

        const item = {
          goodsId: orderSaleId,
          price: product.price / product.goodsNumber,
          goodsNum: product.goodsNumber || 1,
          goodsClassCode: product.classCode,

          // tradeMarkPrice: product.tradeMarkPrice,
        }
        if (product.tradeMarkPrice) {
          item.tradeMarkPrice = product.tradeMarkPrice
        }
        list.push(item)
      })

      coupon
        .findOrderCouponPage(
          { axios: this.$axios },
          {
            findType: index,
            userId: this.$store.state.user.userId,
            actionId: arr,
            orderPrice: this.settlementInfo.orderPayableMoney,
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
              this.settlementInfo.orderPayableMoney
            )
            const sortList = sortList1.sort((a, b) => {
              return (
                b.marketingCouponVO.reducePrice -
                a.marketingCouponVO.reducePrice
              )
            })
            this.couponInfo.datalist = sortList
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
      this.couponInfo.couponPrice = num
      this.couponInfo.selectedItem = item || {}
      this.card.cardPrice = ''
      this.card.selectedItem = {}
      this.settlement()
    },
    cardChange(price, num, item) {
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
              color: #ec5330;
              letter-spacing: 0;
              line-height: 34px;
              font-size: 24px;
              font-weight: 400;
              b {
                font-weight: 400;
              }
              .price_text {
                font-size: 28px;
                font-weight: 600;
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
        text-align: right;
        padding: 15px 30px;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        .money_price {
          font-size: 22px;
          color: #ec5330;
          .money_text {
            font-size: 36px;
          }
          b {
            font-size: 30px;
          }
          .toast_text {
            font-size: 24px;
            font-weight: 400;
            background: #fef0ed;
            padding: 2px;
          }
        }
        .deposit_text {
          color: #222222;
          font-size: 22px;
        }
      }
      .order_sku {
        line-height: 44px;
        display: flex;
        justify-content: space-between;
        padding: 40px 40px 0 30px;
        .title {
          font-size: 28px;
          color: #222222;
          letter-spacing: 0;
          line-height: 28px;
        }
        .value {
          font-size: 24px;
          color: #222222;
          letter-spacing: 0;
          b {
            font-size: 28px;
          }
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
  .allbox2 {
    height: calc(100vh - 228px - 88px) !important;
  }
  .foot2 {
    height: 168px !important;
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
