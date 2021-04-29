<template>
  <div class="commodityConsult">
    <div class="commodityConsult-containner">
      <div class="commodityConsult-containner-userInfo">
        <a @click="plannerInfoUrlJump(plannerInfo.mchUserId)">
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            :src="plannerInfo.portrait"
          />
        </a>
        <div class="commodityConsult-containner-userInfo-name">
          <a @click="plannerInfoUrlJump(plannerInfo.mchUserId)">
            <p>
              {{ plannerInfo.userName }}
            </p>
          </a>
          <span v-if="plannerInfo.postName">
            {{ plannerInfo.postName }}
          </span>
        </div>
      </div>
      <div class="commodityConsult-containner-handle">
        <sp-button
          v-if="salesGoodsSubVos === 1"
          class="add_cart"
          @click="addCart"
        >
          加入购物车
        </sp-button>

        <sp-button
          v-if="[2, 3].includes(salesGoodsSubVos)"
          class="consulting"
          @click="
            sendTemplateMsgWithImg(plannerInfo.mchUserId, plannerInfo.type)
          "
        >
          在线咨询
        </sp-button>
        <sp-button
          v-if="[1, 2].includes(salesGoodsSubVos)"
          class="now_buy"
          @click="nowBuy"
        >
          立即购买
        </sp-button>
        <sp-button
          v-if="salesGoodsSubVos === 3"
          type="primary"
          @click="handleTel(plannerInfo.mchUserId)"
        >
          电话联系
        </sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button, Toast } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { auth, planner, shopCart } from '~/api'
import { parseTel } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
import { codeTranslate } from '~/utils/codeTranslate'
import { debounce } from '~/utils/debounceThrottling'
export default {
  name: 'BottomBar',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [imHandle],
  props: {
    plannerInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    imJumpQuery: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      type: 1,
      article: {}, // 下单协议信息
      carSub: null,
    }
  },
  computed: {
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
    ...mapState({
      sellingGoodsData: (state) => state.sellingGoodsDetail.sellingGoodsData,
      city: (state) => state.city.currentCity,
      userId: (state) => state.user.userInfo.userId,
      //  获取服务基础商品的个数
      salesGoodsSubVos: (state) => {
        const sellingGoodsData = state.sellingGoodsDetail.sellingGoodsData
        const baseGoods = sellingGoodsData.salesGoodsSubVos
        if (
          sellingGoodsData.refConfig.tradeType === 'PRO_BY_SELF' &&
          sellingGoodsData.refConfig.canAddBuy === 'PRO_ALLOWED_ADD_BUY' &&
          baseGoods.length < 2
        ) {
          // 可以自主下单的产品+能够加购的产品才能显示加购和下单
          // 先付款后服务的商品才能下单
          return 1
        } else if (sellingGoodsData.refConfig.tradeType === 'PRO_PRE_ASK') {
          // 先服务后收费的智能咨询才显示咨询和联系
          return 3
        } else if (
          (sellingGoodsData.refConfig.tradeType === 'PRO_BY_SELF' &&
            sellingGoodsData.refConfig.canAddBuy ===
              'PRO_NOT_ALLOWED_ADD_BUY') ||
          baseGoods.length > 1
        ) {
          // 可以下单的产品和不能加购的产品才显示咨询和下单
          return 2
        }
      },
    }),
  },
  methods: {
    addCart() {
      // 加入购物车
      const that = this
      clearTimeout(this.carSub)
      this.carSub = setTimeout(function () {
        const params = {
          goodsNumber: 1, // 默认加购一个
          salePackageId: that.sellingGoodsData.id,
          shopMerId: that.sellingGoodsData.publisherMerchantsId,
          userId: that.userId,
        }
        shopCart
          .add(params)
          .then((res) => {
            that.$xToast.success('加入购物车成功')
          })
          .catch((err) => {
            that.$xToast.warning(
              err.message ? err.message : '加入购物车失败，请稍后重试'
            )
          })
      }, 500)
    },
    async nowBuy() {
      // 点击立即购买
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        if (this.sellingGoodsData.stock > 0) {
          this.$router.push({
            path: '/order/confirmorder',
            query: {
              productId: this.sellingGoodsData.id,
            },
          })
        } else {
          this.$xToast.warning('当前商品没有更多库存')
        }
      }
    },
    // 规划师详情跳转
    plannerInfoUrlJump(mchUserId) {
      this.$router.push({
        path: '/planner/detail',
        query: { mchUserId },
      })
    },
    // 规划师拨号
    async handleTel(mchUserId) {
      // 规划师拨号需要先登录
      try {
        const isLogin = await this.judgeLoginMixin()
        if (isLogin) {
          const telData = await planner.newtel({
            areaCode: this.city.code,
            areaName: this.city.name,
            customerUserId: this.$store.state.user.userId,
            plannerId: mchUserId,
            customerPhone: this.$cookies.get('mainAccountFull', { path: '/' }),
            requireCode: this.sellingGoodsData.classCodeLevel.split(',')[0],
            requireName: '',
            // id: mchUserId,
            // sensitiveInfoType: 'MCH_USER',
          })
          // 解密电话
          if (telData.status === 1) {
            const tel = telData.phone
            window.location.href = `tel://${tel}`
          } else if (telData.status === 0) {
            Toast({
              message: '当前人员已禁用，无法拨打电话',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
          } else if (telData.status === 3) {
            Toast({
              message: '当前人员已离职，无法拨打电话',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
          } else {
            console.log(telData)
          }
        } else {
          Toast({
            message: '请先登录账号',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        }
      } catch (err) {
        console.log(err)
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    // 调起IM
    // 发送模板消息(带图片)
    async sendTemplateMsgWithImg(mchUserId, type) {
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
        // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
        const intentionType = {}
        intentionType[
          this.sellingGoodsData.classCode
        ] = this.sellingGoodsData.classCodeName
        // 意向城市
        const intentionCity = {}
        intentionCity[this.city.code] = this.city.name
        const sessionParams = {
          imUserId: mchUserId, // 商户用户ID
          imUserType: type, // 用户类型
          requireCode: this.sellingGoodsData.classCodeLevel.split(',')[0],
          ext: {
            intentionType, // 意向业务 非必传
            intentionCity, // 意向城市 非必传
            recommendId: '',
            recommendAttrJson: {},
            startUserType: 'cps-app', //
          },
        }
        const msgParams = {
          sendType: 0, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
          msgType: 'im_tmplate', // 消息类型
          extContent: this.$route.query, // 路由参数
          productName: this.sellingGoodsData.name, // 产品名称
          productContent: this.sellingGoodsData.salesGoodsOperatings
            .productDescribe, // 产品信息
          price: this.sellingGoodsData.salesPrice, // 价格
          forwardAbstract: this.sellingGoodsData.salesGoodsOperatings
            .productDescribe, // 摘要信息，可与显示内容保持一致
          routerId: 'IMRouter_APP_ProductDetail_Service', // 路由ID
          imageUrl: this.sellingGoodsData.salesGoodsOperatings.clientDetails[0]
            .imgFileIdPaths[0], // 产品图片
          unit: this.sellingGoodsData.salesPrice.split('.')[1], // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
        }
        this.sendTemplateMsgMixin({ sessionParams, msgParams })
      } else {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.commodityConsult {
  width: 100vw;
  background-color: #fff;
  padding-top: 148px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &-containner {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    // height: 144px;
    padding: 0 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    &-userInfo {
      height: 80px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      &-name {
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          line-height: normal;
          font-size: 32px;
          font-weight: bold;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 150px;
        }
        span {
          margin-top: 10px;
          height: 32px;
          line-height: 30px;
          padding: 0 8px;
          background: #ffefc5;
          border: 2px solid #dac79a;
          border-radius: 4px;
          font-size: 22px;
          font-weight: 400;
          color: #7b6225;
          text-align: center;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-handle {
      display: flex;
      /deep/ button {
        height: 96px;
        line-height: 96px;
        border-radius: 8px;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        padding: 0 21px;
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
      }
      .add_cart {
        background: #fe8c29;
        border: 1px solid #fe8c29;
      }
      .consulting {
        background: #24ae68;
        border: 1px solid #24ae68;
      }
      .now_buy {
        background: #ec5330;
        border: 1px solid #ec5330;
      }
    }
  }
}
.commodityConsult-containner-handle {
  padding-top: 0.24rem;
  padding-bottom: 0.24rem;
}
</style>
