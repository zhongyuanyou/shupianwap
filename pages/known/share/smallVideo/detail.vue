<template>
  <div class="m-known-share smallVideoDetail">
    <client-only>
      <sp-video :options="playerOptions" :vod-url="url" :v-type="videoType">
      </sp-video>
    </client-only>
    <small-video-like :category-id="categoryId" />
  </div>
</template>

<script>
export default {
  name: 'KnownDetailVideo',
  components: {
    SmallVideoLike: () => import('@/components/mustKnown/share/SmallVideoLike'),
  },
  data() {
    return {
      url: '',
      iplugins: ['fullscreen'],
      categoryId: '',
      vLikeList: [],
      playerOptions: {
        autoplay: true,
        muted: true,
        width: '100vw',
        height: '100vh',
        controlBar: {
          fullscreenToggle: false,
        },
      },
      videoType: 'small',
    }
  },
  mounted() {
    this.url = this.$route.query.vurl
    this.categoryId = this.$route.query.categoryId
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideoDetail {
  background: #1a1a1a;
}
</style>
