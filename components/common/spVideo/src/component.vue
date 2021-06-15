<template>
  <div class="sp-video">
    <div v-if="reseted" class="video-player">
      <video
        ref="spVideo"
        class="
          video-js
          vjs-default-skin vjs-big-play-centered vjs-16-9
          video-size_small
        "
      ></video>
    </div>
  </div>
</template>

<script>
// lib
import videojs from 'video.js'
import { deepCopy } from '@/utils/common'

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
}

export default {
  name: 'SpVideo',
  props: {
    vodUrl: {
      // 视频源
      type: String,
      default: '',
    },
    options: {
      // 西瓜视频配置,参考西瓜视频配置文档
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
    showVideo: {
      // 是否显示视频
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reseted: true,
      player: null,
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options, oldOptions) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        })
      },
    },
  },
  mounted() {
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

      // start: fix ios fullscreen
      this.$refs.spVideo.setAttribute('playsinline', true)
      this.$refs.spVideo.setAttribute('webkit-playsinline', true)
      this.$refs.spVideo.setAttribute('x5-playsinline', true)
      this.$refs.spVideo.setAttribute('x5-video-player-type', 'h5')
      this.$refs.spVideo.setAttribute('x5-video-player-fullscreen', false)
      // end: fix ios fullscreen
      // this.$refs.spVideo.setAttribute('class', 'video-size_small')
      // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__
      }

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
          // const myPlayer = _this.player
          // myPlayer.on('pause', function () {
          //   console.log('hahahha')
          //   myPlayer.bigPlayButton.show()
          // })
          // myPlayer.on('play', function () {
          //   myPlayer.bigPlayButton.hide()
          // })
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
  }
  .video-size_small {
    height: 100vh;
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
