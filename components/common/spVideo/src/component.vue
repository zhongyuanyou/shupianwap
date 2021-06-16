<template>
  <div class="sp-video">
    <div v-if="reseted" class="video-player">
      <div v-show="!videoError">
        <video
          ref="spVideo"
          class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
          :style="{
            width: options.width,
            height: options.height,
          }"
        ></video>
      </div>
      <div
        v-show="videoError"
        class="video-error"
        :style="{
          width: options.width,
          height: options.height,
        }"
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
    </div>
  </div>
</template>

<script>
// lib
import videojs from 'video.js'
import { Button } from '@chipspc/vant-dgg'
import { deepCopy, custTypeOf } from '@/utils/common'

// video.js 默认配置
const defaultOptions = {
  preload: true,
  controls: true,
  controlBar: {
    pictureInPictureToggle: false,
    volumePanel: {
      inline: false,
    },
  },
  techOrder: ['html5'],
  sources: [
    {
      type: 'video/mp4',
      src: '',
    },
  ],
}

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
    options: {
      // video视频配置
      type: Object,
      default() {
        return {}
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
  },
  data() {
    return {
      reseted: true,
      player: null,
      videoError: false, // 判断视频是否异常
      videoErrorConfig: this.errorCofing,
      isAndroid: false, // 安卓机器会出现适配问题,这里需要特殊处理
    }
  },
  watch: {
    vodUrl(val) {
      if (!this.player) {
        this.initialize()
      }
    },
  },
  mounted() {
    const userAgent = window.navigator.userAgent
    this.isAndroid =
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端

    if (!this.player) {
      this.initialize()
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose()
    }
  },
  methods: {
    // 初始化视频
    initialize() {
      // videojs options
      const videoOptions = deepCopy(defaultOptions, this.options)
      if (custTypeOf(this.vodUrl) !== 'String' || this.vodUrl.trim() === '') {
        this.videoError = true
        return
      }
      this.videoError = false
      // build video url
      videoOptions.sources[0].src = this.vodUrl

      // start: fix ios fullscreen
      this.$refs.spVideo.setAttribute('x5-playsinline', true)
      this.$refs.spVideo.setAttribute('playsinline', true)
      this.$refs.spVideo.setAttribute('webkit-playsinline', true)
      this.$refs.spVideo.setAttribute('x5-video-player-type', 'h5')
      this.$refs.spVideo.setAttribute('x5-video-player-fullscreen', true)
      // end: fix ios fullscreen

      /*
      // emit event
      const emitPlayerState = (event) => {
        if (event) {
          this.$emit(event, this.player)
        }
      }
      */

      // player
      const _this = this
      this.player = videojs(
        this.$refs.spVideo,
        videoOptions,
        function onPlayerReady() {
          /*
        // events
        const events = DEFAULT_EVENTS
        const onEdEvents = {}

        // player 注册事件
        for (let i = 0; i < events.length; i++) {
          if (
            typeof events[i] === 'string' &&
            onEdEvents[events[i]] === undefined
          ) {
            ;((event) => {
              onEdEvents[event] = null
              this.on(event, () => {
                emitPlayerState(event, true)
              })
            })(events[i])
          }
        }
        */
          // player readied
          _this.$emit('ready', this)
        }
      )
    },
    // 销毁视频
    dispose(callback) {
      if (this.player && this.player.dispose) {
        this.player.dispose()
        this.player = null
        this.$nextTick(() => {
          this.reseted = false
          this.$nextTick(() => {
            this.reseted = true
            this.$nextTick(() => {
              callback && callback()
            })
          })
        })
      }
    },
    errorBtnHandle() {
      this.$emit('errorBtnHandle', this)
    },
  },
}
</script>

<style lang="less" scoped>
.sp-video {
  ::v-deep .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
  }
  ::v-deep .vjs-big-play-button {
    border: none;
    font-size: 4em;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 100%;
    margin-left: -0.8em;
    background-color: rgba(0, 0, 0, 0.4);
  }
  ::v-deep .video-js:hover .vjs-big-play-button {
    background-color: rgba(0, 0, 0, 0.4);
  }
  ::v-deep .vjs-poster {
    background-size: cover;
  }
  ::v-deep .video-js .vjs-tech {
    object-fit: fill;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
