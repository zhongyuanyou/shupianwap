<template>
  <div class="m-known-share smallVideo">
    <app-link />
    <div
      class="small-video"
      :style="{
        backgroundImage: 'url(' + vDetail.image + ')',
        backgroundSize: '100%',
      }"
    >
      <my-icon
        name="bofang_mian"
        size="1.28rem"
        color="rgba(0,0,0,0.40)"
        @click.native="openApp"
      ></my-icon>
      <div class="content">
        <div class="name">{{ vDetail.videoName }}</div>
        <div class="desc">
          {{ vDetail.videoDesc }}
        </div>
      </div>
      <sp-center-popup
        v-model="showPop"
        button-type="confirm"
        :field="Field"
        @confirm="confirm"
        @cancel="cancel"
      />
    </div>
    <small-video-like />
  </div>
</template>

<script>
import knownApi from '@/api/known'
import openappV2 from '@/mixins/openappV2'

export default {
  name: 'KnownSmallVideo',
  components: {
    AppLink: () => import('@/components/common/downLoadArea'),
    SmallVideoLike: () => import('@/components/mustKnown/share/SmallVideoLike'),
  },
  mixins: [openappV2],
  data() {
    return {
      vId: '',
      vDetail: {},
      vLikeList: [],
    }
  },
  mounted() {
    this.vId = this.$route.query.id || '8086177830335741952'
    this.getVDetailApi()
  },
  methods: {
    async getVDetailApi() {
      try {
        const params = {
          ids: [this.vId],
        }
        const { code, data } = await this.$axios.post(
          knownApi.video.videoList,
          params
        )
        if (code !== 200) {
          throw new Error('查询视频失败')
        }
        this.vDetail = data[0]
      } catch (e) {}
    },
    async getVListApi() {},
  },
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideo {
  background: #1a1a1a;
  min-height: 100vh;
  .small-video {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
    width: 100%;
    height: 640px;
    .content {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 32px;
      font-family: @fontf-pfsc-med;
      font-weight: bold;
      color: #fff;
      width: 100%;
      height: 254px;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      bottom: 0;
      left: 0;
      .name {
        font-size: 40px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 32px;
        .textOverflow(2);
      }
    }
  }
}
</style>
