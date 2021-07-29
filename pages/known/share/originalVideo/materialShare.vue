<template>
  <div class="m-known-share originalVideo materialShare">
    <ShareModal
      v-show="showShareModal"
      :mch-id="shareValue.businessId"
      :source-id="shareValue.commonId || vDetail.id"
      :share-id="shareValue.shareId"
    />
    <template v-if="showContent">
      <client-only>
        <sp-video
          :options="playerOptions"
          :vod-url="vurl"
          :error-flag="vodError"
          :error-cofing="errorCofing"
          @errorBtnHandle="errorBtnHandle"
        />
      </client-only>
      <div class="info">
        <div class="info-brand">
          <sp-image
            v-show="vDetail.custavatar"
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
        <div v-show="vDetail.videoName" class="info-desc">
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
              item.productType === 'PRO_CLASS_TYPE_SALES'
                ? 'Service'
                : 'Trading'
            "
          ></ShareGoods>
        </div>
      </div>
      <div class="holderplace"></div> </template
    ><template v-if="vodError && !loading">
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
import { Image, Button } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import { planner } from '@/api'
// 推荐商品组件
import ShareGoods from '@/components/mustKnown/share/ShareGoods.vue'
import ShareModal from '@/components/common/ShareModal.vue'
import PlannerBottom from '@/components/mustKnown/share/PlannerBottom.vue'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownOriginalVideo',
  components: {
    ShareGoods,
    ShareModal,
    PlannerBottom,
    [Image.name]: Image,
    [Button.name]: Button,
  },
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
      vodError: false,
      errorCofing: {
        btn: {
          status: false,
        },
        desc: '内容失效',
      },
      showShareModal: false,
      showContent: true,
      plannerId: '',
      loading: true,
      shareValue: {},
      shareId: '',
    }
  },
  mounted() {
    if (this.$route.query.redisKey) {
      this.getShareId(this.$route.query.redisKey)
    } else {
      this.id = this.$route.query.shareId
      this.plannerId = this.$route.query.plannerId
      if (this.id && this.id === '') {
        this.$xToast.error('获取分享数据失败')
        return
      }
      this.getShareInfoApi()
    }
  },
  methods: {
    getShareId(cacheKey) {
      this.$axios
        .get(planner.getShareId, {
          params: { cacheKey },
        })
        .then((res) => {
          console.log('res', res)
          if (res.code === 200) {
            const cacheValue = JSON.parse(res.data.cacheValue)
            this.shareValue = cacheValue
            this.id = cacheValue.shareId
            this.plannerId = this.shareValue.businessId
            this.getShareInfoApi()
          } else {
            this.isLoaded = true
          }
        })
        .catch(() => {
          this.isLoaded = true
        })
    },
    // 分享信息
    getShareInfoApi() {
      this.vodError = false
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
          this.loading = false
          this.vDetail = res.data
          this.vurl = this.vDetail.videoUrl
          this.goods = res.data.goodsList
          this.playerOptions.post = res.data.image
          this.buildDetail()
        })
        .catch((e) => {
          this.loading = false
          this.vodError = true
          this.showContent = false
          // this.$xToast.error(e.message)
        })
    },
    buildDetail() {
      this.vDetail.custUpdateTime = this.vDetail.updateTime.split(' ')[0]
      this.vDetail.custTotalViewCount = numChangeW(this.vDetail.totalViewCount)
    },
    errorBtnHandle() {
      this.getShareInfoApi()
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
