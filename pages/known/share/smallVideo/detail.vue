<template>
  <div class="m-known-share smallVideoDetail">
    <client-only>
      <sp-video
        :vod-url="url"
        :sp-config="config"
        :show-video="true"
        :ignore-plugins="iplugins"
      >
      </sp-video>
    </client-only>
    <small-video-like :v-list="vLikeList" />
  </div>
</template>

<script>
import knownApi from '@/api/known'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownDetailVideo',
  components: {
    SmallVideoLike: () => import('@/components/mustKnown/share/SmallVideoLike'),
  },
  data() {
    return {
      url: '',
      config: {
        height: '100vh',
        width: '100vw',
        autoplay: true,
      },
      iplugins: ['fullscreen'],
      categoryId: '',
      vLikeList: [],
    }
  },
  mounted() {
    this.url = this.$route.query.vurl
    this.categoryId = this.$route.query.categoryId
    this.getVideoApi()
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      const params = {
        categoryIds: [this.categoryId],
      }
      this.$axios
        .post(knownApi.video.videoList, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.buildVLikeList(res.data)
        })

        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildVLikeList(data) {
      // 这里注意,按照需求取 <= 4条(总共4条)
      this.vLikeList = data.filter((item, index) => {
        return index < 4
      })
      // 重新处理观看数
      this.vLikeList.forEach((item) => {
        item.custTotalCount = numChangeW(item.totalViewCount)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideoDetail {
  background: #1a1a1a;
}
</style>
