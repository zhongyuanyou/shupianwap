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
        @click.native="link"
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
    <small-video-like :category-id="categoryId" />
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
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    link() {
      this.$router.push({
        path: '/known/share/smallvideo/detail',
        query: {
          categoryId: this.categoryId,
          vurl: this.vurl,
        },
      })
    },
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
