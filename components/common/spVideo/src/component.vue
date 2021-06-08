<template>
  <div class="m-video">
    <template v-if="videoStatus">
      <div v-show="!videoError" id="xg-player">
        <slot name="shade"></slot>
      </div>
      <div
        v-show="videoError"
        class="video-error"
        :style="{ width: xgVideoConfig.width, height: xgVideoConfig.height }"
      >
        <div class="content">
          <div class="desc">{{ videoErrorConfig.desc }}</div>
          <sp-button
            v-if="videoErrorConfig.btn.status"
            @click="errorBtnHandle"
            >{{ videoErrorConfig.btn.txt }}</sp-button
          >
        </div>
      </div>
    </template>
    <template v-else><slot name="imitate"></slot></template>
  </div>
</template>

<script>
import Player from 'xgplayer/dist/core_player' // 引入播放内核
import play from 'xgplayer/dist/controls/play' // 引入播放
import fullscreen from 'xgplayer/dist/controls/fullscreen' // 引入全屏
import progress from 'xgplayer/dist/controls/progress' // 引入进度条
import volume from 'xgplayer/dist/controls/volume' // 引入声音
import flex from 'xgplayer/dist/controls/flex' // 引入 flex
import poster from 'xgplayer/dist/controls/poster' // 引入 背景图

import { Button } from '@chipspc/vant-dgg'
import { deepCopy, custTypeOf } from '@/utils/common'

export default {
  name: 'SpVideo',
  components: {
    [Button.name]: Button,
  },
  props: {
    vodUrl: {
      // 视频源
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
    ignorePlugins: {
      // 忽略插件
      type: Array,
      default() {
        return []
      },
    },
    errorCofing: {
      type: Object,
      default() {
        return {
          btn: {
            status: true, // 是否显示按钮
            txt: '重试',
          },
          desc: '视频播放失败,请重试',
        }
      },
    },
    showVideo: {
      // 是否显示视频
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      player: null,
      xgVideoConfig: this.spConfig,
      xgIgnorePlugins: this.ignorePlugins,
      videoErrorConfig: this.errorCofing,
      videoStatus: this.showVideo,
      videoError: false, // 判断视频是否异常
    }
  },
  watch: {
    vodUrl(val) {
      this.initVideo()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 判断是否显示模拟页,非模拟页加载视频组件
      if (this.videoStatus) {
        this.initVideo()
      }
    },
    initVideo() {
      if (custTypeOf(this.vodUrl) !== 'String' || this.vodUrl.trim() === '') {
        this.videoError = true
        return
      }
      // 初始化 videoError 状态
      this.videoError = false
      let baseConfig = {
        id: 'xg-player',
        url: this.vodUrl,
      }
      baseConfig = deepCopy(baseConfig, this.xgVideoConfig)
      // 引入需要视频插件
      const basePlugins = {
        controlPlugins: [play, fullscreen, progress, volume, flex, poster],
      }
      // 删除忽略插件
      this.xgIgnorePlugins.forEach((item) => {
        let i
        const plugins = basePlugins.controlPlugins
        if (
          plugins.some((itemItem, index) => {
            i = index
            return itemItem.name === item
          })
        ) {
          plugins.splice(i, 1)
        }
      })
      const config = { ...baseConfig, ...basePlugins }
      console.log(`output xg-video config:\n ${JSON.stringify(config)}`)
      this.player = new Player(config)
    },
    errorBtnHandle() {
      this.$emit('errorBtnHandle', this)
    },
  },
}
</script>

<style lang="less" scoped>
.m-video {
  .video-error {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .desc {
        font: bold 32px @fontf-pfsc-med;
        color: #ffffff;
      }
      ::v-deep.sp-button {
        font: 32px @fontf-pfsc-med;
        background: #4974f5;
        width: 260px;
        height: 88px;
        border: none;
        border-radius: 8px;
        margin-top: 56px;
        color: #ffffff;
      }
    }
  }
}
</style>
