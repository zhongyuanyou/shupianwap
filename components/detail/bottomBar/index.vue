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
        <sp-button v-if="type === 1" class="add_cart" @click="addCart">
          加入购物车
        </sp-button>
        <sp-button
          v-if="[2, 3].includes(type)"
          class="consulting"
          @click="
            sendTemplateMsgWithImg(plannerInfo.mchUserId, plannerInfo.type)
          "
        >
          在线咨询
        </sp-button>
        <sp-button v-if="[1, 2].includes(type)" class="now_buy" @click="nowBuy">
          立即购买
        </sp-button>
        <sp-button
          v-if="type === 3"
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
import { planner } from '~/api'
import { parseTel } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
import { codeTranslate } from '~/utils/codeTranslate'
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
    }
  },
  computed: {
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  methods: {
    addCart() {
      this.$parent.$refs.sku.openSku(2)
    },
    // nowBuy() {
    //   this.$axios.post('', {})
    },
    // 规划师详情跳转
    plannerInfoUrlJump(mchUserId) {
      this.$router.push({
        path: '/planner/detail',
        query: { mchUserId },
      })
    },
    // 拨打电话
    async handleTel(mchUserId) {
      try {
        const telData = await planner.tel({
          id: mchUserId,
          sensitiveInfoType: 'MCH_USER',
        })
        // 解密电话
        const tel = parseTel(telData.ciphertext)
        window.location.href = `tel://${tel}`
      } catch (err) {
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    // 调起IM
    // 发送模板消息(带图片)
    sendTemplateMsgWithImg(mchUserId, type) {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      const intentionType = {}
      intentionType[
        this.proDetail.classCodeLevel &&
          this.proDetail.classCodeLevel.split(',')[0]
      ] = codeTranslate(this.proDetail.dictCode)
      // 意向城市
      const intentionCity = {}
      intentionCity[this.city.code] = this.city.name
      const sessionParams = {
        imUserId: mchUserId, // 商户用户ID
        imUserType: type, // 用户类型
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
        productName: this.imJumpQuery.productName, // 产品名称
        productContent: this.imJumpQuery.productContent, // 产品信息
        price: this.imJumpQuery.price, // 价格
        forwardAbstract: this.imJumpQuery.forwardAbstract, // 摘要信息，可与显示内容保持一致
        routerId: this.imJumpQuery.routerId, // 路由ID
        imageUrl: this.imJumpQuery.imageUrl[0], // 产品图片
        unit: this.imJumpQuery.unit, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
    },
  },
}
</script>

<style lang="less" scoped>
.commodityConsult {
  width: 100vw;
  background-color: #fff;
  padding-top: 144px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &-containner {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    height: 144px;
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
</style>
