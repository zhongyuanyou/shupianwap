<template>
  <div class="container">
    <p class="planners_title">推荐规划师</p>
    <div class="planners">
      <sp-skeleton :row="6" :loading="recommendPlanner.length == 0">
        <div
          v-for="(item, index) in recommendPlanner"
          :key="item.userCenterId"
          class="planners_item"
          :style="{ marginTop: index === 0 ? '0.42rem' : '0.66rem' }"
        >
          <div class="planners_item_lf">
            <a
              href="javascript:void(0);"
              @click="plannerInfoUrlJump(item.mchUserId)"
            >
              <sp-image
                width="0.8rem"
                height="0.8rem"
                round
                fit="cover"
                lazy-load
                :src="`${item.portrait}?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0`"
              />
            </a>
            <div class="info">
              <div class="info_tp">
                <a
                  href="javascript:void(0);"
                  @click="plannerInfoUrlJump(item.mchUserId)"
                >
                  <p class="name">{{ item.userName }}</p>
                </a>
                <!-- <i v-if="item.postName" class="gold_icon">
                  {{ item.postName }}
                </i> -->
                <i class="gold_icon"> 金牌规划师 </i>
              </div>
              <div class="info_bot">
                <span class="num">{{ Number(item.point) }}</span
                ><span class="txt"
                  >薯片分 | {{ Number(item.payNum) }} 服务次数</span
                >
              </div>
            </div>
          </div>
          <div class="planners_item_rt">
            <sp-button
              round
              class="contact-btn"
              @click="sendTemplateMsgWithImg(item.mchUserId, item.type)"
              ><my-icon
                class=""
                name="notify_ic_chat"
                size="0.424rem"
                color="#4974F5"
            /></sp-button>
            <sp-button
              round
              class="contact-btn"
              @click="handleTel(item.mchUserId)"
              ><my-icon
                class=""
                name="notify_ic_tel"
                size="0.423rem"
                color="#4974F5"
            /></sp-button>
          </div>
        </div>
      </sp-skeleton>
    </div>
    <!--    <p class="planners_sub_title">您的疑问，第一时间为您解答</p>-->
    <!--    <div class="planners_question">-->
    <!--      <input-->
    <!--        type="text"-->
    <!--        class="planners_question_input"-->
    <!--        placeholder="请输入您想咨询的问题"-->
    <!--      />-->
    <!--      <div class="planners_question_bt">提问</div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { Image, Button, Toast, Skeleton } from '@chipspc/vant-dgg'
import { parseTel } from '~/utils/common'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'
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
    plannerInfoUrlJump(mchUserId) {
      this.$router.push({
        path: '/planner/detail',
        query: { mchUserId },
      })
    },
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
.container {
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 44px 0 0px;
}
.planners {
  padding: 0 40px 64px 40px;
  /*border-bottom: 1px solid #f4f4f4;*/
  /deep/.sp-skeleton {
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
    padding: 0 40px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      a {
        display: flex;
      }
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
          align-items: center;
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
      /deep/ .sp-button {
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
  &_sub_title {
    color: #222222;
    font-size: 36px;
    font-weight: bold;
    font-family: PingFang SC;
    margin-top: 38px;
    padding-left: 40px;
  }
  &_question {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    input {
      height: 80px;
      width: 526px;
      border: 1px solid #4974f5;
      padding-left: 25px;
      font-size: 28px;
    }
    &_bt {
      width: 144px;
      height: 80px;
      background-color: #4974f5;
      color: #ffffff;
      font-size: 28px;
      font-weight: bold;
      font-family: PingFang SC;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
