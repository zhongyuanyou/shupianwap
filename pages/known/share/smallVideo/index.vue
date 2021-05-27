<template>
  <div>
    <sp-video :vod-url="url" :sp-config="config"></sp-video>
  </div>
</template>

<script>
export default {
  name: 'KnownSmallVideo',
  data() {
    return {
      url: '//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
      config: {
        fluid: true,
      },
    }
  },
}
</script>

<style></style>
