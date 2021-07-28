<template>
  <div class="m-known-share smallVideo materialShare">
    <ShareModal v-show="showShareModal" :source-id="vDetail.id" />
    <template v-if="showContent">
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
                  info.img ||
                  (info.productImgArr && info.productImgArr[0]) ||
                  ''
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
    </template>
    <template v-else>
      <div class="no-data">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
          alt=""
          srcset=""
        />
        <p>内容失效</p>
      </div>
    </template>
    <planner-bottom :planner-id="plannerId"></planner-bottom>
  </div>
</template>

<script>
import { Image, Button, Swipe, SwipeItem, Toast } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import ShareModal from '@/components/common/ShareModal.vue'
import PlannerBottom from '@/components/mustKnown/share/PlannerBottom.vue'

export default {
  name: 'KnownSmallVideo',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    ShareModal,
    PlannerBottom,
  },
  data() {
    return {
      id: '', // 分享id
      vurl: '', // 视频url
      vDetail: {},
      videoType: '',
      goods: [],
      plannerId: '',
      showShareModal: false,
      showContent: true,
    }
  },
  mounted() {
    this.id = this.$route.query.shareId
    this.plannerId = this.$route.query.plannerId
    if (this.id && this.id === '') {
      this.$xToast.error('获取分享数据失败')
      return
    }
    this.getShareInfoApi()
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
          if (res.data.status === 0) {
            throw new Error('分享的视频已下架')
          }
          this.showShareModal = true
          this.vDetail = res.data
          this.vurl = this.vDetail.videoUrl
          this.goods = res.data.goodsList
        })
        .catch((e) => {
          // this.$xToast.error(e.message)
          this.showContent = false
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
      padding-top: 22px;
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
            line-height: 54px;
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
  .no-data {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 24px;
    color: #666;
    img {
      width: 400px;
      height: 400px;
      margin: 0 auto;
    }
  }
}
</style>
