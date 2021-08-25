<template>
  <div class="PlaceOrder">
    <Head v-show="!editShow" ref="head" title="确认订单">
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
          <!-- <div class="left">
            <img
              :src="
                item.salesGoodsOperatings
                  ? item.salesGoodsOperatings.clientDetails[0]
                    ? item.salesGoodsOperatings.clientDetails[0]
                        .imgFileIdPaths[0] ||
                      'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg'
                    : 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg'
                  : 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg'
              "
              alt=""
            />
          </div> -->
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
            <!-- <p class="tag">{{ item.classCodeName }}</p> -->
            <p class="price">
              <span
                ><b>{{ item.salesPrice }}</b
                >元</span
              >
              <i>{{
                $route.query.type === 'shopcar' ? `x${item.salesVolume}` : 'x1'
              }}</i>
            </p>
            <!--
            <div v-if="$route.query.type === 'shopcar'" class="list">
              <div
                v-for="(listitem, listindex) in item.saleGoodsSubs"
                :key="listindex"
              >
                <p class="name">{{ listitem.goodsSubName || '-' }}</p>
                <p class="data">{{ listitem.goodsSubDetailsName || '-' }}</p>
                <p class="price">
                  {{ `x1` }}
                </p>
              </div>
            </div>
            <div v-else class="list">
              <div
                v-for="(listitem, listindex) in item.salesGoodsSubVos"
                :key="listindex"
              >
                <p class="name">
                  <span v-if="listitem.goodsType === 'PRO_CLASS_TYPE_SALES'">
                    销售产品
                  </span>
                  <span
                    v-else-if="listitem.goodsType === 'PRO_CLASS_TYPE_SERVICE'"
                  >
                    服务产品
                  </span>
                  <span
                    v-else-if="
                      listitem.goodsType === 'PRO_CLASS_TYPE_SERVICE_RESOURCE'
                    "
                  >
                    服务资源
                  </span>
                  <span
                    v-else-if="
                      listitem.goodsType === 'PRO_CLASS_TYPE_TRANSACTION'
                    "
                  >
                    交易资源
                  </span>
                </p>
                <p class="data">{{ listitem.goodsSubName }}</p>
                <p class="price">
                  {{ listitem.settlementPriceEdit }}
                  {{ `x1` }}
                </p>
              </div>
            </div>
             -->
          </div>
        </div>
        <div class="inpbox">
          <Field
            v-model="message"
            rows="1"
            autosize
            label="备注留言"
            type="textarea"
            placeholder="建议提前先与规划师联系"
            maxlength="50"
          ></Field>
        </div>
      </div>
      <!-- <div v-else class="data-content data-content1">
          <div v-for="(item, index) in order.list" :key="index" class="list">
            <h1><span>套餐</span>{{ item.name }}</h1>
            <div
              class="goods"
              v-for="(goodsitem, goodsindex) in item.salesGoodsSubVos"
              :key="goodsindex"
            >
              <img src="item.img" alt="" class="left" />
              <div class="right">
                <h1></h1>
              </div>
            </div>
          </div>
          <div class="inpbox">
            <Field
              v-model="message"
              rows="1"
              autosize
              label="备注留言"
              type="textarea"
              placeholder="建议提前先与规划师联系"
            ></Field>
          </div>
        </div> -->
      <div class="news-content">
        <CellGroup>
          <Cell
            title="商品及服务总数"
            :value="order.num || order.goodsTotal || 0 + '件'"
            value-class="black"
          />
          <Cell
            title="商品金额"
            :value="order.salesPrice || order.skuTotalPrice || 0 + '元'"
            value-class="black"
          />
          <Cell
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
          <span>
            <!-- <b>{{ order.salesPrice || order.skuTotalPrice }}</b> 元 -->
            <b>{{ price }}</b> 元
          </span>
        </p>
      </div>
      <div class="contract">
        <CellGroup>
          <Cell
            title="合同信息"
            :value="
              contaract.contractFirstPhone ? '已完善合同信息' : '完善合同信息'
            "
            :value-class="contaract.contractFirstPhone ? 'ys' : 'black'"
            is-link
            @click="gocontractedit()"
          />
        </CellGroup>
      </div>
      <div class="agreement">
        <Checkbox v-model="radio">
          <template>
            <p class="tit">
              我已阅读过并知晓<span @click="goagr"
                >《薯片平台用户交易下单协议》</span
              >
            </p>
          </template>
        </Checkbox>
      </div>
    </div>
    <div ref="foot" class="foot">
      <p class="left">
        应付:<span>
          <b>{{ price }}</b> 元</span
        >
      </p>
      <div class="right" :class="radio ? 'act' : ''" @click="placeOrder">
        提交订单
      </div>
    </div>
    <div v-show="editShow" class="contractbox">
      <Contract @goback="contractback" @sum="contractsum"></Contract>
    </div>
    <LoadingCenter v-show="loading" />
    <Popup
      ref="conpon"
      :show="couponInfo.popupshow"
      :height="75"
      title="优惠"
      help="使用说明"
      :origin-price="
        $route.query.type === 'shopcar' ? order.skuTotalPrice : order.salesPrice
      "
      :tablist="couponInfo.tablist"
      :datalist="couponInfo.datalist"
      :nolist="couponInfo.nolist"
      @change="conponChange"
      @close="close"
    ></Popup>

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
  // CheckboxGroup,
} from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header.vue'
import Popup from '@/components/PlaceOrder/Popup.vue'
import CardPopup from '@/components/PlaceOrder/CardPopup.vue'
import Contract from '@/components/PlaceOrder/contract.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { productDetailsApi, auth, shopCart } from '@/api'
import cardApi from '@/api/card'
import { coupon, order, actCard } from '@/api/index'
export default {
  name: 'PlaceOrder',
  components: {
    Head,
    Field,
    Cell,
    CellGroup,
    Checkbox,
    Popup,
    CardPopup,
    [Skeleton.name]: Skeleton,
    LoadingCenter,
    Contract,
  },
  data() {
    return {
      money: '1232',

      radio: '', // 选中协议

      message: '',
      order: '',
      // num: 0,

      couponInfo: {
        popupshow: false,

        selectedItem: {}, // 选择的对象
        couponPrice: '', // 选择的优惠券对象

        tablist: [
          { name: '可用优惠券', num: '12', is: true },
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
          { name: '可用活动卡', num: '12', is: true },
          { name: '不可用活动卡' },
        ],
        datalist: [], // 支持的列表
        nolist: [], // 不支持的列表
      },

      contaract: '',
      productId: this.$route.query.productId,
      formData: {
        orderByWhere: 'createTime=desc',
        findType: 5,
        userId: '767579686475123456',
        actionId: this.productId,
      },
      price: '',
      Orderform: {
        needSplitProPackageDataParam: [],
        cusOrderPayType: '',
        isFromCart: '',
        cartIds: '',
        orderProvinceNo: '',
        orderCityNo: '',
        orderLocationProvinceName: '',
        orderLocationCityName: '',
        orderAgreementIds: '',
        customerOrderMark: '',
        discount: [],
        payType: 'ORDER_PAY_MODE_ONLINE',
      },
      loading: false,
      skeletonloading: true,
      editShow: false,
      productList: [],
    }
  },
  mounted() {
    if (this.$route.query.type === 'shopcar') {
      this.getcart()
    } else {
      this.asyncData()
    }
    // this.getInitData()
    this.getProtocol('protocol100008')
  },
  methods: {
    onLeftClick() {
      this.$router.back()
    },
    // 打开《薯片平台用户交易下单协议》
    goagr() {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: 'protocol100008' },
      })
    },
    // 购物车结算
    getcart() {
      const that = this
      shopCart
        .bill({
          cartId: this.$route.query.cartIdsStr,
          type: '1',
        })
        .then((result) => {
          // result = JSON.parse(result.productVo)
          this.order = result
          this.order.list = this.order.productVo
          this.price = this.order.skuTotalPrice
          this.skeletonloading = false
          this.getInitData(5)
          this.getInitData(6)
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.$xToast.show(e.message)
            console.error(e)
            setTimeout(function () {
              that.$router.back(-1)
            }, 2000)
          }
        })
    },
    async asyncData() {
      const that = this
      this.skeletonloading = false
      try {
        const { code, message, data } = await this.$axios.post(
          productDetailsApi.sellingGoodsDetail,
          {
            id: this.$route.query.productId,
            configFlg: 1,
            floatingFlg: 1,
            withSalesSubsFlg: 1,
            withTagsFlg: 1,
            withGoodsSubFlg: 1,
            withOperatingsFlg: 1,
            clientType: 'COMDIC_TERMINAL_APP',
          }
        )
        if (code === 200) {
          const obj = {
            name: data.name,
            classCode: data.classCode,
            classCodeName: data.classCodeName,
            id: data.id,
            salesPrice: data.salesPrice,
            salesGoodsSubVos: data.salesGoodsSubVos,
            salesGoodsOperatings: data.salesGoodsOperatings,
          }
          this.order = data
          this.order.list = []
          this.order.list.push(obj)
          this.order.num = this.order.list.length
          this.price = this.order.salesPrice
          this.getInitData(5)
          this.getInitData(6)

          this.productList = new Array(1).fill({
            categoryCode: data.classCodeLevel.split(',')[0],
            productId: data.id,
            productPrice: data.salesPrice,
          })

          // this.getCardList()

          console.log('productList', this.productList)
        } else {
          this.$xToast.show('服务器异常,请然后再试')
          setTimeout(function () {
            that.$router.back(-1)
          }, 2000)
          throw message
        }
      } catch (err) {
        this.$xToast.show('请求数据失败，请稍后再试')
        console.error(err)
        setTimeout(function () {
          that.$router.back(-1)
        }, 2000)
        this.skeletonloading = false
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
        this.Orderform.orderAgreementIds = rows[0].id || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },

    // 提交订单
    placeOrder() {
      if (!this.radio) {
        Toast({
          message: '下单前，请先同意《薯片平台用户交易下单协议》',
          overlay: true,
        })
      } else {
        this.loading = true
        if (this.$route.query.type === 'shopcar') {
          const arr = []
          for (let i = 0; i < this.order.list.length; i++) {
            const sku = {
              saleSkuId: this.order.list[i].id,
              saleSkuName: this.order.list[i].name,
              saleSkuVersionNo: this.order.list[i].version + '',
              saleSkuPrice: this.order.list[i].salesPrice,
              saleSkuCount: this.order.list[i].salesVolume,
            }
            arr.push(sku)
            this.loading = false
          }
          this.Orderform.needSplitProPackageDataParam = arr
        } else {
          const sku = {
            saleSkuId: this.order.id,
            saleSkuName: this.order.name,
            saleSkuVersionNo: this.order.version + '',
            saleSkuPrice: this.order.salesPrice,
            saleSkuCount: 1,
          }
          this.Orderform.needSplitProPackageDataParam = new Array(1).fill(sku)
        }
        let isFromCart = false
        let cusOrderPayType
        if (this.$route.query.type === 'shopcar') {
          isFromCart = true
          this.Orderform.cartIds = this.$route.query.cartIdsStr
          cusOrderPayType = this.order.list[0].refConfig.payType
        } else {
          cusOrderPayType = this.order.refConfig.payType
          isFromCart = false
        }

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
        this.Orderform.cusOrderPayType = cusOrderPayType
        this.Orderform.isFromCart = isFromCart
        this.Orderform.orderProvinceNo = this.$store.state.city.defaultCity.pid
        this.Orderform.orderCityNo = this.$store.state.city.defaultCity.code
        this.Orderform.orderLocationProvinceName =
          this.$store.state.city.defaultCity.pname
        this.Orderform.orderLocationCityName =
          this.$store.state.city.defaultCity.name
        this.Orderform.customerOrderMark = this.message
        if (this.contaract) {
          this.Orderform.contractFormParam = this.contaract
          this.Orderform.contractFormParam.contractApplyWay = 'CUSTOMER'
        }
        if (this.$route.query.plannerId) {
          this.Orderform.plannerId = this.$route.query.plannerId
        }
        order
          .placeOrder({ axios: this.$axios }, this.Orderform)
          .then((result) => {
            this.loading = false
            Toast({
              message: '下单成功',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_success',
              overlay: true,
            })
            setTimeout(() => {
              this.$router.push({
                path: '/pay/payType',
                query: {
                  fromPage: 'orderList',
                  cusOrderId: result.cusOrderId,
                },
              })
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
    contractback() {
      this.editShow = false
    },
    contractsum(val) {
      this.contaract = val
      this.editShow = false
    },
    gocontractedit() {
      this.editShow = true
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
    openPopupfn() {
      this.couponInfo.popupshow = true
    },
    openCardFn() {
      this.card.show = true
    },
    close() {
      this.couponInfo.popupshow = false
    },
    closeCard() {
      this.card.show = false
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
        > span {
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
