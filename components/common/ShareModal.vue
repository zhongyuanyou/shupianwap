<template>
  <div v-if="visible" class="fullscreen" @click="showInception">
    <div class="fullscreen-popup" @click.stop="">
      <!--S 弹框banner-->
      <div class="popup-banner">
        <img src="https://cdn.shupian.cn/sp-pt/wap/23qhsm9soy5c000.png" />
        <div class="popup-header">
          <slot name="head">
            <div class="popup-header__con">
              <div @click.stop="showInception">
                <my-icon
                  name="notify_ic_close"
                  size="0.24rem"
                  color="#f4f4f4"
                ></my-icon>
              </div>
            </div>
          </slot>
        </div>
        <div class="popup-banner__con">
          <div
            class="img"
            :style="{
              background: `url(
                ${
                  planerInfo.img ||
                  'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg'
                }

              ) no-repeat center center `,
              backgroundSize: 'cover',
            }"
          ></div>
          <div class="planner-info">
            <span>您好，我是{{ planerInfo.name || '规划师' }}</span>
          </div>
        </div>
      </div>
      <!--E 弹框banner-->
      <!--S 弹框content-->
      <div class="popup-content">
        <div class="popup-content__hint">
          <span>委托我为您提供以下服务</span>
        </div>
        <div class="popup-content__tags">
          <span v-for="(item, index) in tagList" :key="index" class="item">
            {{ item }}
          </span>
        </div>
        <div class="popup-btn" @click="handleClickBtn()">
          <span>同意委托</span>
        </div>
        <div class="prompt">
          <span>我会与您电话联系，请保持手机畅通</span>
        </div>
      </div>
      <!--E 弹框content-->
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import { planner, userinfoApi, formApi } from '~/api'
const BASE = require('~/config/index.js')
export default {
  name: 'SpPopup',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    sourceId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false, // 是否最大化显示 true为最大化显示 false为最小化显示
      plannerId: '',
      shareId: '',
      partnerId: '',
      planerInfo: {},
      userInfoData: {},
      tagList: ['快速服务咨询', '详细政策解读', '优质服务推荐', '最新优惠讲解'],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    city() {
      return this.$store.state.city
    },
  },
  mounted() {
    this.plannerId =
      this.$route.query.plannerId || this.$route.query.homeUserId || this.mchId
    this.partnerId = this.$route.query.partnerId
    if (this.$route.query.isShare && this.plannerId) {
      this.getPlanerInfo(this.plannerId)
    }
    if (this.userInfo.userId) {
      if (this.userInfo.userId !== this.partnerId) {
        this.getUserIndo()
      } else {
        this.visible = false
      }
    }
  },
  methods: {
    getPlanerInfo(id) {
      planner
        .detail({ id })
        .then((res) => {
          console.log('获取规划师信息res', res)
          const obj = {
            mchUserId: res.id,
            portrait: res.img,
            userName: res.name,
            postName: res.zwName,
            type: res.mchClass,
          }
          this.planerInfo = {
            ...obj,
            ...res,
          }
          if (this.userInfo.userId !== this.partnerId) {
            this.visible = true
          } else {
            this.visible = false
          }
          this.$emit('setPlannerInfo', this.planerInfo)
          // this.$forceUpdate()
        })
        .catch((err) => {
          this.visible = true
          console.log('获取规划师信息err', err)
        })
    },
    showFullScreen() {
      // 显示全屏
      this.visible = true
    },
    showInception() {
      // 显示最小化
      this.visible = false
    },
    // 获取用户信息 明文
    getUserIndo() {
      this.$axios
        .get(userinfoApi.info_decrypt, {
          params: {
            id: this.userInfo.userId,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.userInfoData = res.data
            // this.$store.dispatch('user/setInfo', res.data)
          } else {
            this.$xToast.show({
              message: '网络错误,请刷稍后再试',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    handleClickBtn() {
      if (!this.userInfo.userId) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath,
          },
        })
        return
      }
      if (!this.partnerId) {
        console.log('ddd')
        this.addClue()
      } else {
        this.$axios
          .post(planner.bindCustomer, {
            copartnerId: this.partnerId,
            customerId: this.userInfoData.id,
            customerPhone: this.userInfoData.mainAccount,
            customerName: this.userInfoData.fullName,
            copartnerPort: 'COMDIC_PLATFORM_CRISPS',
            customerPort: 'COMDIC_PLATFORM_CRISPS',
            bindType: 'CUSTOMER_BDLX_FXBD',
            requestPlatform: 'COMDIC_PLATFORM_CRISPS',
            copartnerUserType: 'ORDINARY_USER',
          })
          .then((res) => {
            if (res.code === 200) {
              this.$xToast.success('委托成功！')
              this.visible = false
            } else {
              this.$xToast.error(res.message || '委托失败')
            }
          })
          .catch((error) => {
            console.log('error', error)
            this.$xToast.error(error.message || '委托失败')
            this.visible = true
          })
      }
    },
    // 只生成线索
    addClue() {
      const path = this.$route.path
      let materialType = 1 // 物料类型：1、文章 2、问答 3、海报 4、视频
      if (path.match('share/article')) {
        materialType = 1
      } else if (path.match('share/answer')) {
        materialType = 2
      } else if (path.match('share/smallVideo/materialShare')) {
        materialType = 4
      } else if (path.match('share/originalVideo/materialShare')) {
        materialType = 4
      }
      this.$axios
        .post(planner.addClue, {
          userId: this.userInfoData.id, // 用户id
          plannerId: this.plannerId, // 用户id
          shareId: this.$route.query.shareId, // 分享Id
          sourceId: this.sourceId || this.$route.query.id, // 物料id
          materialType,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.success('委托成功！')
            this.visible = false
          } else {
            this.$xToast.error(res.message || '委托失败')
          }
        })
        .catch((error) => {
          console.log('error', error)
          this.$xToast.error(error.message || '委托失败')
          this.visible = true
        })
    },
    // 生成客户资源并分配
    consultForm() {
      this.loading = true
      const userInfo = this.userInfoData
      if (!userInfo) return
      const params = {
        // bizAreaCode: this.city.code || '510100',
        // bizAreaName: this.city.name || '成都市',
        comment: '',
        customerAttribute: '',
        customerName: userInfo.fullName,
        customerPhone: userInfo.mainAccount,
        customerSex: userInfo.sex || 2,
        sourceUrl: location.href,
        sourceSyscode: 'crisps-app', // 来源系统
        firstSourceChannel: 'crisps-app-share', // 一级来源渠道
        secondSourceChannel:
          this.getShareChanel() || 'crisps-app-share-article', // 二级来源渠道
        // requireCode: localStorage.getItem('needCode'), // 需求编码
        // requireName: '交易委托', // 需求名称
      }
      this.$axios
        .post(BASE.formApi + formApi, params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$xToast.success('委托成功！')
            this.visible = false
          } else {
            this.$xToast.error(res.message || '委托失败')
            this.visible = true
          }
        })
        .catch((error) => {
          this.$xToast.error(error.message || '委托失败')
          this.visible = true
        })
    },
    // 获取合伙人信息 明文
    getBindUserIndo() {
      if (this.token) {
        this.$axios
          .get(userinfoApi.info_decrypt, {
            params: {
              id: this.partnerId,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              console.log('合伙人信息', res)
              // this.userInfoData = res.data
              // this.$store.dispatch('user/setInfo', res.data)
            } else {
              this.$xToast.show({
                message: '网络错误,请刷稍后再试',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          })
      }
    },
    // 选择二级渠道
    getShareChanel() {
      const path = this.$route.path
      if (path.match('share/article')) {
        return 'crisps-app-share-article'
      } else if (path.match('share/answer')) {
        return 'crisps-app-share-answer'
      } else if (path.match('share/smallVideo/materialShare')) {
        return 'crisps-app-share-small-video'
      } else if (path.match('share/originalVideo/materialShare')) {
        return 'crisps-app-share-video'
      } else {
        return 'crisps-app-share-video'
      }
    },
  },
}
</script>

<style lang="less" scoped>
@keyframes animationFadeOut {
  from {
    width: 630px;
    height: 900px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -315px;
    margin-bottom: -450px;
    // transform: translate(50%, 50%);
  }

  to {
    width: 142px;
    height: 126px;
    position: fixed;
    right: 40px;
    bottom: 200px;
  }
}

@keyframes animationFadeIn {
  from {
    width: 142px;
    height: 126px;
    position: fixed;
    right: 40px;
    bottom: 200px;
  }

  to {
    width: 630px;
    height: 900px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -315px;
    margin-bottom: -450px;
    // transform: translate(50%, 50%);
  }
}

.fadeOut {
  animation: animationFadeOut 0.3s ease 1 normal forwards;
}

.fadeIn {
  animation: animationFadeIn 0.3s ease 1 normal forwards;
}

.inception {
  position: fixed;
  right: 40px;
  bottom: 200px;
  z-index: 9999;

  > img {
    width: 142px;
    height: 126px;
  }
}

.hideFullScreen {
  width: 0;
  height: 0;
}

.fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .fullscreen-popup {
    position: absolute;
    width: 630px;
    height: 900px;
    right: 50%;
    bottom: 50%;
    margin-right: -315px;
    margin-bottom: -450px;
    background-color: #ffffff;
    border-radius: 24px;

    .popup-banner {
      width: 100%;
      height: 395px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      > img {
        width: 100%;
        height: 100%;
      }
      .popup-banner__con {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .img {
          width: 160px;
          height: 160px;
          border-radius: 80px;
          overflow: hidden;
          background-size: cover;
        }
        .avatar {
          max-width: 160px;
          max-height: 160px;
          display: inline-block;
        }
        .planner-info {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          margin-top: 31px;
        }
      }
      .popup-header {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 5;
        &__con {
          height: 88px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: row;
          padding-right: 32px;
        }
      }
    }
    .popup-content {
      padding: 0 64px;
      &__hint {
        text-align: center;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin-top: 40px;
      }
      .popup-content__tags {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 180px;
        > .item {
          height: 40px;
          width: 50%;
          color: #222222;
          text-align: center;
          font-size: 32px;
          margin-top: 44px;
        }
      }
      .popup-btn {
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        margin-top: 64px;
        text-align: center;
        line-height: 88px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
      .prompt {
        width: 100%;
        text-align: center;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 24px;
      }
    }
  }
}
</style>
