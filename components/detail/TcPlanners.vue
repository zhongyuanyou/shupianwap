<template>
  <div class="planners">
    <p class="planners_title">推荐规划师</p>
    <!-- <sp-skeleton :row="6" :loading="recommendPlanner.length == 0"> -->
    <div
      v-for="(item, index) in recommendPlanner"
      :key="item.userCenterId"
      class="planners_item"
      :style="{ marginTop: index === 0 ? '0.42rem' : '0.66rem' }"
    >
      <div class="planners_item_lf">
        <a href="javascript:void(0);" @click="plannerInfoUrlJump(item)">
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            lazy-load
            :src="$resizeImg(80, 80, item.portrait || PlannerHeadList)"
          />
        </a>
        <div class="info">
          <div class="info_tp">
            <a href="javascript:void(0);" @click="plannerInfoUrlJump(item)">
              <p class="name">{{ item.userName }}</p>
            </a>
            <i v-if="item.postName ? true : false" class="gold_icon">
              {{ item.postName }}
            </i>
          </div>
          <div class="info_bot">
            <span class="num">{{ Number(item.point) }}</span
            ><span class="txt">薯片分 | {{ Number(item.payNum) }}次服务</span>
          </div>
        </div>
      </div>
      <div class="planners_item_rt">
        <sp-button
          v-md:p_IMClick
          data-even_name="p_IMClick"
          round
          class="contact-btn"
          data-im_type="售前"
          :data-recommend_number="item.dggPlannerRecomLog || ''"
          :data-planner_number="item.userCenterNo"
          :data-planner_name="item.userName"
          :data-crisps_fraction="item.point"
          data-track_code="SPW000157"
          @click="sendTemplateMsgWithImg(item.mchUserId, item.type)"
          ><my-icon
            class=""
            name="notify_ic_chat"
            size="0.424rem"
            color="#4974F5"
        /></sp-button>
        <sp-button
          v-md:p_IMClick
          round
          class="contact-btn"
          data-even_name="p_IMClick"
          data-im_type="售前"
          :data-recommend_number="item.dggPlannerRecomLog || ''"
          :data-planner_number="item.userCenterNo"
          :data-planner_name="item.userName"
          :data-crisps_fraction="item.point"
          data-track_code="SPW000157"
          @click="handleTel(item.mchUserId)"
          ><my-icon
            class=""
            name="notify_ic_tel"
            size="0.423rem"
            color="#4974F5"
        /></sp-button>
      </div>
    </div>
    <!-- </sp-skeleton> -->
  </div>
</template>

<script>
import { Image, Button, Toast, Skeleton } from '@chipspc/vant-dgg'
import { parseTel } from '~/utils/common'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'
import { PlannerHeadList } from '~/config/constant'
import { codeTranslate } from '~/utils/codeTranslate'

export default {
  name: 'TcPlanners',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
  },
  mixins: [imHandle],
  props: {
    recommendPlanner: {
      type: Array,
      default: () => [],
    },
    imJumpQuery: {
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
  },
  data() {
    return {
      PlannerHeadList,
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
  },
  methods: {
    // 规划师详情跳转
    plannerInfoUrlJump(item) {
      // 处理埋点
      window.spptMd.spptTrackRow('p_plannerBoothClick', {
        track_code: 'SPW000158',
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
        },
      })
    },
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
    sendTemplateMsgWithImg(mchUserId, type) {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
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
      // } else {
      //   this.$router.push('/login')
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.planners {
  border-top: 24px solid #f8f8f8;
  padding: 41px 40px 56px 40px;
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  ::v-deep.sp-skeleton {
    margin-top: 48px;
  }
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .gold_icon {
    min-width: 146px;
    max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 34px;
    line-height: 32px;
    border: 1px solid #e0a963;
    margin-left: 12px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 400;
    color: #e0a963;
    padding-left: 38px;
    padding-right: 7px;
    text-align: center;
    position: relative;
    font-style: normal;
    &::before {
      content: '';
      display: block;
      width: 34px;
      height: 34px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/7cwzjbxvkhs0000.png)
        no-repeat;
      background-size: 34px 34px;
      position: absolute;
      left: -1px;
      top: -1px;
    }
  }
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 80px;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .info {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 24px;
        &_tp {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: row;
          height: 32px;
          .name {
            max-width: 150px;
            font-size: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-weight: bold;
            color: #1a1a1a;
            line-height: 32px;
          }
        }
        &_bot {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          flex-direction: row;
          height: 30px;
          line-height: 30px;
          .num {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ec5330;
          }
          .txt {
            margin-left: 17px;
          }
        }
      }
    }
    &_rt {
      height: 80px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      ::v-deep .sp-button {
        border: none;
      }
      .contact-btn {
        width: 80px;
        height: 80px;
        background: rgba(235, 243, 255, 0.8);
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
