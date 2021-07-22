<template>
  <div class="m-known-share smallVideo materialShare">
    <img class="bg" :src="vDetail.image" />
    <my-icon
      name="bofang_mian"
      size="1.28rem"
      color="rgba(0,0,0,0.40)"
      class="my-icon"
      @click.native="link"
    ></my-icon>
    <div class="info-content">
      <div class="tile">{{ vDetail.videoName }}</div>
      <div class="desc">
        {{ vDetail.videoDesc }}
      </div>
    </div>
    <div v-show="goods.length > 0" class="goods-swipe">
      <sp-swipe :autoplay="3000" :show-indicators="true">
        <sp-swipe-item v-for="(info, index) in goods" :key="index">
          <div class="good-content">
            <sp-image
              fit="cover"
              width="1.4rem"
              height="1.4rem"
              radius="0.24rem"
              :src="
                info.img || (info.productImgArr && info.productImgArr[0]) || ''
              "
            />
            <div class="info">
              <div class="info-tile">{{ info.name || '' }}</div>
              <div class="info-desc">
                <div class="price">
                  <template
                    v-if="
                      info.price == 0 ||
                      info.price === '0.00' ||
                      info.price === '0.0' ||
                      info.price === '0'
                    "
                  ></template>
                  <template v-else></template>
                  <span>{{
                    info.price || info.salesPrice || info.platformPrice
                  }}</span
                  ><span class="unit">元</span>
                </div>
                <sp-button class="btn" @click="goodLink(info)"
                  >立即抢购</sp-button
                >
              </div>
            </div>
          </div>
        </sp-swipe-item>
      </sp-swipe>
    </div>
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
import { Image, Button, Swipe, SwipeItem, Toast } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'

export default {
  name: 'KnownSmallVideo',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  mixins: [imHandle],
  data() {
    return {
      id: '', // 分享id
      categoryId: '', // 种类id
      vurl: '', // 视频url
      vDetail: {},
      videoType: '',
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
          console.log(`output goods: ${JSON.stringify(this.goods[0])}`)
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
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
    link() {
      if (!this.vurl) {
        this.$xToast.error('获取视频信息失败')
        return
      }
      this.$router.push({
        path: '/known/share/smallvideo/detail',
        query: {
          vurl: this.vurl,
          shareType: 'materialShare', // 传对应的分销标识
        },
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
  },
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideo.materialShare {
  background: #1a1a1a;
  .bg {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  .my-icon {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
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
  .goods-swipe {
    position: fixed;
    bottom: 188px;
    width: 100%;
    padding: 0 40px;
    height: 214px;
    ::v-deep.sp-swipe {
      width: 100%;
      height: inherit;
    }
    ::v-deep.sp-swipe-item {
      background: #fff;
      border-radius: 12px;
    }
    .good-content {
      height: 160px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .info {
        margin-left: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-tile {
          width: 100%;
          height: 84px;
          color: #222222;
          font-weight: bold;
          font-size: 32px;
          line-height: 42px;
          .textOverflow(2);
        }
        &-desc {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .price {
            display: flex;
            align-items: center;
            .unit {
              font-size: 24px;
              line-height: 24px;
            }
            color: #ec5330;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
          }
          .btn {
            background: #ec5330;
            height: 54px;
            font-size: 28px;
            font-weight: bold;
            border-radius: 8px;
            color: #fff;
          }
        }
      }
    }
  }
  .info-content {
    position: fixed;
    bottom: 466px;
    padding: 0 32px;
    width: 100%;
    .tile {
      color: #ffffff;
      font-weight: bold;
      font-size: 40px;
      line-height: 56px;
      .mixin-text-oneoverflow();
      margin-bottom: 10px;
    }
    .desc {
      font-size: 32px;
      line-height: 44px;
      color: #fff;
      font-weight: bold;
      .textOverflow(2);
    }
  }
}
</style>
