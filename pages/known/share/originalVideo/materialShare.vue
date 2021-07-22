<template>
  <div class="m-known-share originalVideo materialShare">
    <ShareModal />
    <client-only>
      <sp-video
        :options="playerOptions"
        :vod-url="vurl"
        @errorBtnHandle="errorBtnHandle"
      />
    </client-only>
    <div class="info">
      <div class="info-brand">
        <sp-image
          width="0.84rem"
          height="0.84rem"
          round
          fit="cover"
          :src="vDetail.custavatar"
        />
        <div class="info-brand-tile">
          <div
            class="name"
            :class="[
              vDetail.custbriefIntroduction === '' ? 'z-nontebuttom' : '',
            ]"
          >
            {{ vDetail.authorName }}
          </div>
          <div class="desc">{{ vDetail.custbriefIntroduction }}</div>
        </div>
      </div>
      <div class="info-tile">{{ vDetail.videoName }}</div>
      <div class="info-desc">
        {{ vDetail.custTotalViewCount }}次播放 · 发布于{{
          vDetail.custUpdateTime
        }}
      </div>
    </div>
    <div v-if="goods.length > 0" class="recommend">
      <div class="recommend-title">推荐商品</div>
      <div v-for="item of goods" :key="item.id">
        <ShareGoods
          :info="item"
          :type="
            item.productType === 'PRO_CLASS_TYPE_SALES' ? 'Service' : 'Trading'
          "
        ></ShareGoods>
      </div>
    </div>
    <div class="holderplace"></div>
    <div class="planner-info">
      <div class="flex-left">
        <sp-image class="img" round :src="planerInfo.portrait" />
        <div class="infos">
          <div class="infos-name">{{ planerInfo.userName }}</div>
          <div class="infos-desc">{{ planerInfo.postName }}</div>
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
  </div>
</template>

<script>
import { Image, Button, Toast } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'
// 推荐商品组件
import ShareGoods from '@/components/mustKnown/share/ShareGoods.vue'
import ShareModal from '@/components/common/ShareModal.vue'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownOriginalVideo',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    ShareGoods,
    ShareModal,
  },
  mixins: [imHandle],
  data() {
    return {
      id: '', // 分享id
      vurl: '', // 视频url
      vDetail: {},
      // videojs options
      playerOptions: {
        poster: '',
      },
      goods: [],
      plannerId: '',
      planerInfo: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
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
  mounted() {
    this.id = this.$route.query.shareId || '8106374534213206016'
    this.plannerId = this.$route.query.plannerId || '758742052284024473'
    this.getShareInfoApi()
    this.getPlannerInfoApi()
  },
  methods: {
    // 分享信息
    getShareInfoApi() {
      const params = {
        id: this.id,
      }
      this.$axios
        .post(knownApi.video.materialVideoShare, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.vDetail = res.data
          this.vurl = this.vDetail.videoUrl
          this.goods = res.data.goodsList
          this.playerOptions.post = res.data.image
          this.buildDetail()
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildDetail() {
      this.vDetail.custUpdateTime = this.vDetail.updateTime.split(' ')[0]
      this.vDetail.custTotalViewCount = numChangeW(this.vDetail.totalViewCount)
    },
    getPlannerInfoApi() {
      planner.detail({ id: this.plannerId }).then((res) => {
        const obj = {
          mchUserId: res.id,
          portrait:
            res.img ||
            'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png',
          userName: res.name,
          postName: res.zwName,
          type: res.mchClass,
        }
        this.planerInfo = {
          ...obj,
          ...res,
        }
      })
    },
    goodLink(item) {
      if (item.productType === 'PRO_CLASS_TYPE_SALES') {
        this.$router.push({
          path: '/detail',
          query: {
            productId: item.id,
          },
        })
      } else {
        this.$router.push({
          path: '/detail/transactionDetails',
          query: {
            productId: item.id,
          },
        })
      }
    },
    // 拨打电话
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
          plannerId: mchUserId,
          customerPhone: this.topPlannerInfo.phone || this.planerInfo.phone,
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
    errorBtnHandle() {
      console.log('error')
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.originalVideo.materialShare {
  background: #fff;
  .info {
    padding: 40px 32px 34px 32px;
    &-brand {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      &-tile {
        margin-left: 20px;
        width: 406px;
        .name {
          .mixin-text-oneoverflow();
          font: bold 32px @fontf-pfsc-med;
          color: #222222;
          margin-bottom: 16px;
          &.z-nontebuttom {
            margin-bottom: 0;
          }
        }
        .desc {
          .mixin-text-oneoverflow();
          font: 24px @fontf-pfsc-reg;
          color: #999999;
        }
      }
      ::v-deep .sp-button {
        position: absolute;
        right: 0;
        border-radius: 8px;
        width: 144px;
      }
      ::v-deep .sp-button.sp-button--normal {
        font-size: 26px;
      }
    }
    &-tile {
      font: bold 40px/56px @fontf-pfsc-med;
      color: #1a1a1a;
      .textOverflow(2);
      margin-bottom: 22px;
    }
    &-desc {
      font: 28px @fontf-pfsc-reg;
      color: #999999;
    }
  }
  .like {
    padding: 16px 32px;
  }
  .button {
    width: 144px;
    height: 64px;
    padding: 0;
  }
  ::v-deep .sp-button__text {
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    .add-icon {
      margin-right: 12px;
    }
  }
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
        background: #f5f5f5;
        margin-right: 24px;
      }
      .infos {
        display: flex;
        flex-direction: column;
        &-name {
          color: #222222;
          font-size: 32px;
          line-height: 45px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        &-desc {
          padding: 5px 8px;
          border: 2px solid #dac79a;
          border-radius: 4px;
          background: #ffefc5;
          color: #7b6225;
          font-size: 22px;
          line-height: 1;
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
  .recommend {
    margin-top: 38px;
    padding: 0 40px;
    margin-bottom: 200px;
    &-title {
      font-size: 32px;
      line-height: 32px;
      font-weight: bold;
      counter-reset: #222;
      margin-bottom: 16px;
    }
  }
  .holderplace {
    height: 1px;
    width: 100%;
  }
}
</style>
