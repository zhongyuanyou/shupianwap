<template>
  <div
    class="commodityConsult"
    :style="{ opacity: plannerInfo.mchUserId ? 1 : 0 }"
  >
    <div class="commodityConsult-containner">
      <div class="commodityConsult-containner-userInfo">
        <a @click="plannerInfoUrlJump(plannerDetail.mchUserId)">
          <sp-image
            width="0.8rem"
            height="0.8rem"
            round
            fit="cover"
            :src="plannerDetail.portrait"
          />
        </a>
        <div class="commodityConsult-containner-userInfo-name">
          <a @click="plannerInfoUrlJump(plannerDetail.mchUserId)">
            <p>
              {{ plannerDetail.userName }}
            </p>
          </a>
          <span v-if="plannerDetail.postName">
            {{ plannerDetail.postName }}
          </span>
        </div>
      </div>
      <div class="commodityConsult-containner-handle">
        <sp-button
          class="consulting"
          @click="sendTextMessage(plannerDetail.mchUserId)"
        >
          在线咨询
        </sp-button>

        <sp-button type="primary" @click="handleTel(plannerDetail.phone)">
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
import imHandle from '~/mixins/imHandle'
import contractApi from '@/api/contract'
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
    ...mapState({
      sellingGoodsData: (state) => state.sellingGoodsDetail.sellingGoodsData,
      city: (state) => state.city.currentCity,
      userId: (state) => state.user.userInfo.userId,
    }),
    plannerDetail() {
      return this.plannerInfo
    },
  },
  mounted() {},
  methods: {
    // 规划师详情跳转
    plannerInfoUrlJump(mchUserId) {
      this.$router.push({
        path: '/planner/detail',
        query: { mchUserId },
      })
    },
    // 解密电话
    decryptionPhone(phone) {
      return new Promise((resolve, reject) => {
        if (!phone) {
          console.log('没有电话')
          return resolve('')
        }
        contractApi
          .decryptionPhone({ axios: this.axios }, { phoneList: [phone] })
          .then((res) => {
            console.log(res)
            if (res && res.length > 0) {
              return resolve(res[0])
            }
            resolve('')
          })
          .catch(() => {
            resolve('')
            Toast({
              message: '未获取到划师联系方式',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
          })
      })
    },

    // 规划师拨号
    async handleTel(phoneFull) {
      // 规划师拨号需要先登录
      try {
        const isLogin = await this.judgeLoginMixin()
        if (isLogin) {
          const phone = await this.decryptionPhone(phoneFull)
          console.log(phone)
          if (phone) {
            window.location.href = `tel://${phone}`
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
    sendTemplateMsgWithImg(mchUserId, type) {},
  },
}
</script>

<style lang="less" scoped>
.commodityConsult {
  // width: 100vw;
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
      ::v-deep button {
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
