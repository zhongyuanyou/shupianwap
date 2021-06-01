<template>
  <div>
    <sp-video
      :vod-url="url"
      :sp-config="config"
      :show-video="true"
      :ignore-plugins="iplugins"
      @errorBtnHandle="errorBtnHandle"
    >
      <template #shade><div class="video-shade">test shade</div></template>
    </sp-video>
  </div>
</template>

<script>
export default {
  name: 'KnownCourseVideo',
  data() {
    return {
      url: '',
      config: {
        height: '30vh',
        width: '100vw',
      },
      iplugins: ['fullscreen'],
    }
  },
  methods: {
    errorBtnHandle(vThis) {
      this.url =
        '//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4'
      debugger
      vThis.initVideo()
    },
  },
}
</script>

<style lang="less" scoped>
.video-shade {
  position: absolute;
  top: 0;
  color: #fff;
  font-size: 24px;
}
</style>
