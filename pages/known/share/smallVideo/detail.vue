<template>
  <div class="m-known-share smallVideoDetail">
    <client-only>
      <sp-video
        :vod-url="url"
        :sp-config="config"
        :show-video="true"
        :ignore-plugins="iplugins"
        @errorBtnHandle="errorBtnHandle"
      >
      </sp-video>
    </client-only>
    <small-video-like />
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
      config: {
        height: '100vh',
        width: '100vw',
      },
      iplugins: ['fullscreen'],
    }
  },
  methods: {
    errorBtnHandle(vThis) {
      this.url =
        '//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4'
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideoDetail {
  background: #1a1a1a;
}
</style>
