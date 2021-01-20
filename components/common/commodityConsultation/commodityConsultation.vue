<template>
  <div class="commodityConsult">
    <div class="commodityConsult-containner">
      <div class="commodityConsult-containner-userInfo">
        <nuxt-link
          :to="{
            path: '/planner/detail',
            query: { mchUserId: plannerInfo.mchUserId },
          }"
        >
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            :src="plannerInfo.portrait"
          />
        </nuxt-link>
        <div class="commodityConsult-containner-userInfo-name">
          <nuxt-link
            :to="{
              path: '/planner/detail',
              query: { mchUserId: plannerInfo.mchUserId },
            }"
          >
            <p>{{ plannerInfo.userName }}</p>
          </nuxt-link>
          <span>{{ plannerInfo.postName }}</span>
        </div>
      </div>
      <div class="commodityConsult-containner-handle">
        <sp-button
          type="primary"
          @click="sendTemplateMsgWithImg(plannerInfo.mchUserId)"
        >
          在线咨询
        </sp-button>
        <sp-button type="info" @click="handleTel(plannerInfo.mchUserId)">
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
export default {
  name: 'CommodityConsultation',
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
  methods: {
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
    sendTemplateMsgWithImg(mchUserId) {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      const sessionParams = {
        imUserId: mchUserId, // 商户用户ID
        imUserType: 'MERCHANT_USER', // 用户类型
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
  padding-top: 148px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &-containner {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    padding-left: 40px;
    padding-right: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    &-userInfo {
      height: 80px;
      line-height: 80px;
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      /*padding-bottom: 34px;*/
      &-name {
        margin-left: 25px;
        p {
          font-size: 32px;
          font-weight: bold;
          color: #1a1a1a;
          height: 33px;
          line-height: 33px;
          margin-top: 3px;
          margin-bottom: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 150px;
        }
        span {
          height: 32px;
          line-height: 30px;
          padding-left: 8px;
          padding-right: 8px;
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
          float: left;
        }
      }
    }
    &-handle {
      height: 100%;
      line-height: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 24px;
      padding-bottom: 24px;
      /deep/ button {
        height: 100px;
        line-height: 100px;
        border-radius: 8px;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 21px;
        padding-right: 21px;
        &:first-child {
          margin-right: 16px;
          background: #24ae68;
          border: 1px solid #24ae68;
        }
      }
    }
  }
}
</style>
