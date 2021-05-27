<template>
  <div id="xg-player"></div>
</template>

<script>
import Player from 'xgplayer/dist/core_player' // 引入播放内核
import play from 'xgplayer/dist/controls/play' // 引入播放
import fullscreen from 'xgplayer/dist/controls/fullscreen' // 引入全屏
import progress from 'xgplayer/dist/controls/progress' // 引入进度条
import volume from 'xgplayer/dist/controls/volume' // 引入声音
import flex from 'xgplayer/dist/controls/flex' // 引入 flex
import { deepCopy } from '@/utils/common'

export default {
  name: 'SpVideo',
  props: {
    vodUrl: {
      // 视频源
      type: String,
      required: true,
    },
    poster: {
      // 视频封面
      type: String,
      default: '',
    },
    spConfig: {
      // 西瓜视频配置,参考西瓜视频配置文档
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      player: null,
      videoUrl: this.vodUrl,
      xgVideoConfig: this.spConfig,
    }
  },
  mounted() {
    this.initVideo()
  },
  methods: {
    initVideo() {
      let baseConfig = {
        id: 'xg-player',
        url: this.videoUrl,
        fluid: true,
      }
      baseConfig = deepCopy(baseConfig, this.xgVideoConfig)
      // 引入需要视频插件
      const controlPlugins = {
        controlPlugins: [play, fullscreen, progress, volume, flex],
      }
      const config = { ...baseConfig, ...controlPlugins }
      console.log(`output xg-video config:\n ${JSON.stringify(config)}`)
      this.player = new Player(config)
    },
  },
}
</script>

<style></style>
