<template>
  <div
    class="commodityConsult"
    :style="{ opacity: plannerDetail.mchUserId ? 1 : 0 }"
  >
    <div class="commodityConsult-containner">
      <div class="commodityConsult-containner-userInfo">
        <a
          href="javascript:void(0);"
          @click="plannerInfoUrlJump(plannerDetail)"
        >
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            :src="plannerDetail.portrait"
          />
        </a>
        <div class="commodityConsult-containner-userInfo-name">
          <a
            href="javascript:void(0);"
            @click="plannerInfoUrlJump(plannerDetail)"
          >
            <p :class="{ isTitle: plannerDetail.postName ? false : true }">
              {{ plannerDetail.userName }}
            </p>
          </a>
          <span v-if="plannerDetail.postName ? true : false">
            {{ plannerDetail.postName }}
          </span>
        </div>
      </div>
      <div class="commodityConsult-containner-handle">
        <sp-button
          v-md:p_IMClick
          data-even_name="p_IMClick"
          data-im_type="售前"
          :data-recommend_number="plannerDetail.dggPlannerRecomLog || ''"
          :data-planner_number="plannerDetail.userCenterNo"
          :data-planner_name="plannerDetail.userName"
          :data-crisps_fraction="plannerDetail.point"
          data-track_code="SPW000162"
          type="primary"
          @click="
            sendTemplateMsgWithImg(plannerDetail.mchUserId, plannerDetail.type)
          "
        >
          在线咨询
        </sp-button>
        <sp-button
          v-md:p_IMClick
          data-even_name="p_IMClick"
          data-im_type="售前"
          :data-recommend_number="plannerDetail.dggPlannerRecomLog || ''"
          :data-planner_number="plannerDetail.userCenterNo"
          :data-planner_name="plannerDetail.userName"
          :data-crisps_fraction="plannerDetail.point"
          data-track_code="SPW000162"
          type="info"
          @click="handleTel(plannerDetail.mchUserId)"
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
  name: 'TcCommodityConsultation',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [imHandle],
  props: {
    baseData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    operatingData: {
      type: Object,
      default: () => {
        return {}
      },
    },
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
      isPlannerShare: false,
      sharePlaner: {},
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
    plannerDetail() {
      if (this.isPlannerShare) {
        return this.sharePlaner
      } else {
        return this.plannerInfo
      }
    },
  },
  mounted() {
    if (this.$route.query.plannerId || this.$route.query.mchUserId) {
      this.getPlanerInfo(
        this.$route.query.plannerId || this.$route.query.mchUserId
      )
      this.isPlannerShare = true
    }
  },
  methods: {
    getPlanerInfo(id) {
      planner.detail({ id }).then((res) => {
        const obj = {
          mchUserId: res.id,
          portrait: res.img,
          userName: res.name,
          postName: res.zwName,
          type: res.mchClass,
        }
        this.sharePlaner = {
          ...obj,
          ...res,
        }
        this.$forceUpdate()
      })
    },
    // 规划师详情跳转
    plannerInfoUrlJump(item) {
      // 处理埋点
      window.spptMd.spptTrackRow('p_plannerBoothClick', {
        track_code: 'SPW000159',
        planner_number: item.userCenterNo,
        planner_name: item.userName,
        crisps_fraction: item.point,
        recommend_number: item.dggPlannerRecomLog || '',
      })
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId: item.mchUserId,
          requireCode: this.proDetail.classCodeLevelList[0],
          requireName: '',
        },
      })
    },
    // 拨打电话
    async handleTel(mchUserId) {
      try {
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        this.$xToast.show({
          message: '为了持续为您提供服务，规划师可能会主动联系您',
          duration: 2000,
          forbidClick: true,
        })
        await planner.awaitTip()
        const telData = await planner.newtel({
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          customerId: this.$store.state.user.customerID || '',
          plannerId: mchUserId,

          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }) ||
            '',
          requireCode: this.proDetail.classCodeLevel.split(',')[0],
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
        }
        // } else {
        //   Toast({
        //     message: '请先登录账号',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        // }
      } catch (err) {
        // Toast({
        //   message: '未获取到划师联系方式',
        //   iconPrefix: 'sp-iconfont',
        //   icon: 'popup_ic_fail',
        // })
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
        requireCode: this.proDetail.classCodeLevel.split(',')[0],
        requireName: '',
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
        // forwardAbstract: this.imJumpQuery.forwardAbstract, // 摘要信息，可与显示内容保持一致
        routerId: this.imJumpQuery.routerId, // 路由ID
        imageUrl: this.imJumpQuery.imageUrl[0], // 产品图片
        unit: this.imJumpQuery.unit, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
        forwardAbstract: '[商品详情]',
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
  transition: all 0.3s;
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
          &.isTitle {
            margin-top: 25px;
          }
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
      ::v-deep button {
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
