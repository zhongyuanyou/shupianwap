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
                item.salesGoodsSubVos && item.salesGoodsSubVos.length > 1
                  ? item.salesGoodsSubVos[0].goodsSubName
                  : item.name
              }}
            </h1>

            <p v-if="item.skuExtInfo" class="goods-sku">
              {{ item.skuExtInfo }}
            </p>

            <p class="price">
              <span v-if="order.orderType === 0"><b>面议</b></span>
              <span v-else
                ><b>{{ item.salesPrice }}</b
                >元</span
              >

              <i>{{ 'x' + item.skuCount }}</i>
            </p>
          </div>
        </div>
      </div>

      <!-- 根据当前的付款模式，先付款后服务/先定金后尾款/先服务后付款/按节点付费，展示不同的模块 -->
      <div>
        <div v-if="isDeposit" class="deposit">
          <!-- 先定金后尾款 -->
          <div class="deposit_tips">
            温馨提示：该订单先支付定金在业务办理完成后支付尾款
          </div>
          <div class="deposit_content">
            定金尾款：定金 {{ settlementInfo.depositAmount }}元，<span
              v-if="order.orderType === 0"
              >尾款 面议</span
            ><span v-else>尾款 {{ settlementInfo.orderBalanceMoney }}元</span>
          </div>
        </div>

        <div v-else-if="isServiceFinshed" class="deposit">
          <!-- 服务完结收费的意向单 -->
          <div class="deposit_tips">温馨提示：该订单先服务后收费</div>
          <div class="deposit_content">
            <span v-if="order.orderType === 0">总价：面议</span>
            <span v-else>总价 {{ settlementInfo.orderTotalMoney }}元</span>
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
        <CellGroup>
          <Cell
            title="商品及服务总数"
            :value="order.num || order.goodsTotal || 0 + '件'"
            value-class="black"
          />
          <Cell
            title="商品金额"
            :value="
              order.orderType === 0
                ? '面议'
                : (settlementInfo.orderTotalMoney ||
                    order.orderPayableMoneys ||
                    0) + '元'
            "
            value-class="black"
          />
          <!-- 意向单不用优惠券 -->
          <Cell
            v-if="!isIntendedOrder"
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

        <p class="money">
          合计：
          <span v-if="order.orderType === 0" class="money_price"
            ><b>面议</b></span
          ><span v-else class="money_price"
            ><b>{{
              (settlementInfo.orderTotalMoney ||
                order.orderPayableMoneys ||
                0) - (settlementInfo.orderDiscountMoney || 0)
            }}</b
            >元</span
          >
          <span v-if="isDeposit" class="deposit_text"
            >（定金 {{ settlementInfo.depositAmount }}元，<span
              v-if="order.orderType === 0"
              class="deposit_text"
              >尾款 面议</span
            ><span v-else class="deposit_text"
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
    <Popup
      ref="conpon"
      :show="couponInfo.popupshow"
      :height="75"
      title="优惠"
      help="使用说明"
      :origin-price="tradeMarkPriceSum || settlementInfo.orderTotalMoney"
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
      orderData: {},
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
    // 是否是服务商品
    // 其他的是交易/销售/资源
    isServerGoods() {
      return this.order?.orderProTypeNo === 'PRO_CLASS_TYPE_SERVICE'
    },
    // 是否先定金后服务
    isDeposit() {
      return this.order?.cusOrderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS'
    },
    // 服务完结收费
    isServiceFinshed() {
      return this.order?.cusOrderPayType === 'PRO_PRE_SERVICE_FINISHED_PAY'
    },
    // 节点付费
    isNodes() {
      return this.order?.cusOrderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE'
    },
    // 先付款后服务
    isBeforePay() {
      return this.order?.cusOrderPayType === 'PRO_PRE_PAY_POST_SERVICE'
    },

    // 是否是意向单
    isIntendedOrder() {
      return this.order.orderType === 0
    },
    // 是否担保订单
    isSecuredTrade() {
      return this.order.isSecuredTrade === 1
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

      orderApi
        .getDetailByCusOrderId(
          { axios: this.axios },
          {
            cusOrderId: this.$route.query.cusOrderId,
            id: this.$route.query.cusOrderId,

            isSkuDetailInfo: true,
            isSkuImages: true,
          }
        )
        .then((res) => {
          console.log('res', res)
          const data = res.data

          if (data) {
            data.list = []
            // data.depositAmount = data.depositAmount / 100 || 0
            // data.lastAount = data.lastAount / 100 || 0
            // data.orderTotalMoney = data.cusOrderTotalMoney / 100 || 0
            // data.orderPayableMoney = data.cusOrderPayableMoney / 100 || 0
            this.order = data
            this.orderData = res

            let num = 0

            data.orderList.map((order) => {
              this.order.orderType = order.orderType
              this.order.orderProTypeNo = order.orderProTypeNo
              order.orderSkuList.map((item) => {
                this.order.isSecuredTrade = item.isSecuredTrade

                item.skuPrice = item.skuPrice / 100 || 0

                let sku = {}
                let refConfig = {}
                let categoryListLength = 0
                if (item.skuDetailInfo) {
                  const skuDetailInfo = JSON.parse(item.skuDetailInfo)
                  console.log('skuDetailInfo', skuDetailInfo)

                  sku = skuDetailInfo?.sku

                  refConfig = sku?.refConfig

                  if (
                    item.classifyOneNo === 'FL20210425164438' &&
                    skuDetailInfo?.tradeMark?.categoryList
                  ) {
                    categoryListLength =
                      skuDetailInfo.tradeMark.categoryList.length
                  }
                }

                const obj = {
                  name: item.spuHideName || item.spuName,
                  // classifyOneNo: item.classifyOneNo,
                  // classifyTwoNo: item.classifyTwoNo,
                  classifyThreeNo: item.classifyThreeNo,
                  // classCode: item.classifyThreeNo,

                  // classCodeName: sku.className,
                  // goodsNo: sku.goodsNo,
                  // version: sku.version,
                  id: item.id,
                  // refConfig,
                  skuCount: item.skuCount,
                  salesPrice: item.skuPrice,

                  skuExtInfo: item.skuExtInfo,
                  categoryListLength,
                }
                num += parseInt(item.skuCount) || 0
                this.order.list.push(obj)
              })
            })

            this.order.num = num // this.order.list.length
            this.price = this.settlementInfo.orderTotalMoney

            if (order.isSecuredTrade === 1) {
              this.getProtocol('protocol100044')
            }

            this.setPayMethod()

            this.settlement() // 调用接口结算，和获取会员价
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

    // 获取待结算价格
    settlement() {
      order
        .settle_order_by_unsubmit(
          {},
          {
            orderId: this.$route.query.cusOrderId,
            couponUseCode: this.couponInfo.selectedItem.couponUseCode,
            couponId: this.couponInfo.selectedItem.couponId,
          }
        )
        .then((result) => {
          console.log('result', result)
          this.settlementInfo = result
          if (this.couponInfo.datalist.length === 0) {
            // 意向单不使用优惠券
            if (!this.isIntendedOrder) {
              this.getInitData(5) // 获取优惠券
              this.getInitData(6)
            }
          }
        })
        .catch((error) => {
          console.log(error)
          this.$xToast.show('服务器异常,请然后再试')
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
      if (this.order?.payType) {
        const pay = this.payMethod.list.find((item) => {
          return item.value === this.order?.payType
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
              if (this.payMethod.value === 'ORDER_PAY_MODE_SECURED') {
                this.$router.replace({
                  path: '/order',
                  query: {},
                })
              } else if (this.payMethod.value === 'ORDER_PAY_MODE_OFFLINE') {
                // 线下付款
                this.$router.replace({
                  path: '/order',
                  query: {},
                })
              } else if (
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
    getSaleMoneyByID(orderSaleId) {
      const saleSkuListOrder = this.order.saleSkuList.filter((item) => {
        return orderSaleId === item.orderSaleId
      })
      const listOrder = this.order.list.filter((item) => {
        return orderSaleId === item.id
      })
      if (saleSkuListOrder && saleSkuListOrder.orderSaleMoneys) {
        if (listOrder && listOrder.categoryListLength) {
          return (
            parseFloat(saleSkuListOrder.orderSaleMoneys) *
            listOrder.categoryListLength
          )
        }
      }
      return order.orderSaleMoneys || ''
    },

    //  5:订单可用优惠券 6：订单不可用优惠券
    getInitData(index) {
      const arr = this.settlementInfo.productVo.map((x) => {
        return x.id
      })
      const list = []
      this.settlementInfo.productVo.map((product) => {
        const orderSaleId = product.id
        // const tradeMarkPrice = this.getSaleMoneyByID(orderSaleId)
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

      // for (let i = 0; i < this.settlementInfo.orderSkuList.length; i++) {
      //   const orderSaleId = this.settlementInfo.orderSkuList[i].orderSaleId

      //   const tradeMarkPrice = this.getSaleMoneyByID(orderSaleId)

      //   const item = {
      //     goodsId: orderSaleId,
      //     price: this.settlementInfo.orderSkuList[i].skuPrice / 100,
      //     goodsNum: this.settlementInfo.orderSkuList[i].skuCount || 1,
      //     goodsClassCode: this.settlementInfo.orderSkuList[i].classifyThreeNo,
      //   }
      //   if (tradeMarkPrice) {
      //     item.tradeMarkPrice = tradeMarkPrice
      //   }
      //   list.push(item)
      // }

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
              this.order.cusOrderPayableMoney || this.order.cusOrderTotalMoney
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
      this.settlement()
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
        .money_price {
          font-size: 22px;
          color: #ec5330;
          b {
            font-size: 30px;
          }
        }
        .deposit_text {
          color: #222222;
          font-size: 22px;
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
