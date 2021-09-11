<template>
  <div class="planner-info">
    <div class="flex-left">
      <img class="img" :src="planerInfo.portrait" />
      <div class="infos">
        <div class="infos-name">{{ planerInfo.userName }}</div>
        <div v-if="planerInfo.postName" class="infos-desc">
          {{ planerInfo.postName }}
        </div>
      </div>
    </div>
    <!-- && planerInfo.mchUserId -->
    <div class="flex-right">
      <sp-button
        size="small"
        type="primary"
        @click="sendTextMessage(planerInfo.mchUserId)"
        >在线问</sp-button
      >
      <sp-button
        size="small"
        type="info"
        @click="handleTel(planerInfo.mchUserId)"
        >打电话</sp-button
      >
    </div>
  </div>
</template>

<script>
import { Image, Button, Toast } from '@chipspc/vant-dgg'
import imHandle from '~/mixins/imHandle'
import { planner } from '~/api'

export default {
  name: 'PlannerBottom',
  components: { [Image.name]: Image, [Button.name]: Button },
  mixins: [imHandle],
  props: {
    plannerId: {
      // 视频源
      type: String,
      default: '',
    },
  },
  data() {
    return {
      planerInfo: {
        portrait: 'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png',
      },
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  watch: {
    plannerId(val) {
      if (val !== '' && val) {
        this.getPlannerInfoApi()
      }
    },
  },
  mounted() {
    if (this.plannerId && this.plannerId !== '') {
      this.getPlannerInfoApi()
    }
  },
  methods: {
    getPlannerInfoApi() {
      planner.detail({ id: this.plannerId }).then((res) => {
        const obj = {
          mchUserId: res.id,
          portrait:
            res.img ||
            'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png',
          userName: res.name,
          postName: res.zwName || '金牌规划师',
          type: res.mchClass,
        }
        this.planerInfo = {
          ...obj,
          ...res,
        }
      })
    }, // 拨打电话
    async handleTel(mchUserId) {
      console.log('mchUserId', mchUserId)
      try {
        if (this.isInApp) {
          this.$appFn.dggBindHiddenPhone({ plannerId: mchUserId }, (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '拨号失败！',
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
            }
          })
          return
        }
        const params = {
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          customerId: this.$store.state.user.customerID || '',
          plannerId: mchUserId,
          customerPhone: this.planerInfo.phone,
          requireCode: '',
          requireName: '',
        }

        try {
          const telData = await planner.newtel(params)
          // 解密电话
          if (telData.status === 1) {
            const tel = telData.phone
            window.location.href = `tel:${tel}`
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
        } catch (error) {
          Toast({
            message: error.message || '无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          console.error('getTel:', error)
          return Promise.reject(error)
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
  },
}
</script>

<style lang="less" scoped>
.planner-info {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 144px;
  padding: 0 40px;
  background: #fff;
  .flex-left {
    display: flex;
    align-items: center;
    .img {
      width: 80px;
      height: 80px;
      margin-right: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
    .infos {
      display: flex;
      flex-direction: column;
      &-name {
        max-width: 180px;
        color: #222222;
        font-size: 32px;
        line-height: 45px;
        font-weight: bold;
        margin-bottom: 3px;
        .mixin-text-oneoverflow();
      }
      &-desc {
        max-width: 180px;
        padding: 5px 8px;
        border: 2px solid #dac79a;
        border-radius: 4px;
        background: #ffefc5;
        color: #7b6225;
        font-size: 22px;
        width: fit-content;
        line-height: 1;
        .mixin-text-oneoverflow();
      }
    }
  }
  .flex-right {
    display: flex;
    align-items: center;
    ::v-deep button {
      height: 96px;
      width: 168px;
      border-radius: 8px;
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }
    ::v-deep.sp-button--info {
      margin-left: 16px;
      background-color: #24ae68;
      border: 1px solid #24ae68;
    }
  }
}
</style>
