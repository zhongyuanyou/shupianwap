<template>
  <div class="m-known-share originalVideo">
    <app-link />
    <client-only>
      <sp-video :vod-url="vurl" :sp-config="config" :show-video="true">
      </sp-video>
    </client-only>
    <div class="info">
      <div class="info-brand">
        <sp-image width="0.84rem" height="0.84rem" round fit="cover" src="" />
        <div class="info-brand-tile">
          <div class="name">乐享werewdfsdfsdweerwerwerwerwerwer创业帮</div>
          <div class="desc">商业因服务更美werewrwerwerewre好</div>
        </div>
        <sp-button color="#4974F5" @click="openApp">
          <my-icon name="tianjia" size="0.2rem" color="#FFFFFF" />
          关注</sp-button
        >
      </div>
      <div class="info-tile">{{ vDetail.videoName }}</div>
      <div class="info-desc">
        {{ vDetail.custTotalViewCount }}次播放 · 发布于{{
          vDetail.custUpdateTime
        }}
      </div>
    </div>
    <video-like></video-like>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import openappV2 from '@/mixins/openappV2'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownOriginalVideo',
  components: {
    AppLink: () => import('@/components/common/downLoadArea'),
    VideoLike: () => import('@/components/mustKnown/share/VideoLike'),
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [openappV2],
  data() {
    return {
      config: {
        height: '4.22rem',
        width: '100vw',
      },
      vId: '',
      categoryId: '', // 种类id
      vurl: '', // 视频url
      vDetail: {},
    }
  },
  mounted() {
    /*
    if (!this.$route.query.id) {
      this.$xToast.error('获取视频信息失败')
      return
    }
    */
    this.vId = this.$route.query.id || '8086190052126556160'
    this.getVideoApi()
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      const params = {
        id: this.vId,
      }
      this.$axios
        .post(knownApi.video.videoDetail, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.vDetail = res.data
          this.categoryId = res.data.categoryId
          this.vurl = res.data.videoUrl
          this.config.poster = res.data.image
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
  },
}
</script>

<style lang="less" scoped>
.m-known-share.originalVideo {
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
}
</style>
