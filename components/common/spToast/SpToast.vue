<template>
  <transition name="toast-fade">
    <div
      v-show="isShow"
      class="my-toast"
      :class="{ 'no-event': forbidClick }"
      @touchmove="noEvent($event)"
    >
      <div class="my-toast__content">
        <sp-loading v-if="isLoading" size="20" color="#fff" :type="spinner" />
        <i
          v-else
          class="my-toast__icon spiconfont"
          :class="`spiconfont-${icon}`"
        />
        <div class="my-toast__text">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Loading } from '@chipspc/vant-dgg'
export default {
  name: 'SpToast',
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return {
      isShow: false, // 是否显示
      message: '',
      icon: '',
      forbidClick: false, // 是否禁止背景点击
      timer: null,
      spinner: 'loading',
      isLoading: false,
    }
  },
  beforeDestroy() {
    const parent = this.$el.parentNode
    if (parent) {
      parent.removeChild(this.$el)
    }
  },
  methods: {
    show(
      { duration = 1000, message = '', icon = '', forbidClick = false },
      cb
    ) {
      this.checkType('message', message)
      this.checkType('icon', icon)
      this.checkType('duration', duration)
      this.checkType('forbidClick', forbidClick)
      cb && this.checkType('cb', cb)
      this.isShow = true
      this.forbidClick = forbidClick
      this.message = message
      this.icon = icon
      if (duration > 0) {
        this._hidToast(duration, cb)
      }
    },
    success(message, duration = 1500, forbidClick = false, cb) {
      // 成功
      this.checkType('message', message)
      this.checkType('duration', duration)
      this.checkType('forbidClick', forbidClick)
      cb && this.checkType('cb', cb)
      this.message = message
      this.isShow = true
      this.forbidClick = forbidClick
      this.icon = 'toast_ic_comp'
      this._hidToast(duration, cb)
    },
    error(message, duration = 1500, forbidClick = false, cb) {
      // 失败
      this.checkType('message', message)
      this.checkType('duration', duration)
      this.checkType('forbidClick', forbidClick)
      cb && this.checkType('cb', cb)
      this.message = message
      this.isShow = true
      this.forbidClick = forbidClick
      this.icon = 'toast_ic_error'
      this._hidToast(duration, cb)
    },
    warning(message, duration = 1500, forbidClick = false, cb) {
      // 警告
      this.checkType('message', message)
      this.checkType('duration', duration)
      this.checkType('forbidClick', forbidClick)
      cb && this.checkType('cb', cb)
      this.message = message
      this.isShow = true
      this.forbidClick = forbidClick
      this.icon = 'toast_ic_remind'
      this._hidToast(duration, cb)
    },
    showLoading({ message = '加载中', type = 'loading', forbidClick = false }) {
      // loading
      this.checkType('message', message)
      this.checkType('type', type)
      this.checkType('forbidClick', forbidClick)
      this.forbidClick = forbidClick
      this.message = message
      this.isShow = true
      this.isLoading = true
      this.spinner = type
    },
    hideLoading() {
      this.isShow = false
      setTimeout(() => {
        this.isLoading = false
      }, 0)
    },
    loading({
      message = '加载中',
      type = 'loading',
      duration = 1500,
      forbidClick = false,
      cb,
    }) {
      // loading
      this.checkType('message', message)
      this.checkType('duration', duration)
      this.checkType('type', type)
      this.checkType('forbidClick', forbidClick)
      cb && this.checkType('cb', cb)
      this.message = message
      this.isShow = true
      this.spinner = type
      this.forbidClick = forbidClick
      this.isLoading = true
      this._hidToast(duration, cb)
    },
    noEvent(e) {
      !this.forbidClick && e.preventDefault()
    },
    checkType(typeStr, typeData) {
      const checkFn = {
        duration(duration) {
          if (typeof duration !== 'number') {
            console.error('duration 类型错误')
            throw new Error('duration 类型错误')
          }
        },
        icon(icon) {
          if (typeof icon !== 'string') {
            console.error('icon 类型错误')
            throw new Error('icon 类型错误')
          }
        },
        message(message) {
          if (typeof message !== 'string') {
            console.error('message 类型错误')
            throw new Error('message 类型错误')
          }
        },
        forbidClick(forbidClick) {
          if (typeof forbidClick !== 'boolean') {
            console.error('forbidClick 类型错误')
            throw new Error('forbidClick 类型错误')
          }
        },
        type(type) {
          if (typeof type !== 'string') {
            console.error('type 类型错误')
            throw new Error('type 类型错误')
          }
        },
        cb(cb) {
          if (typeof cb !== 'function') {
            console.error('cb 类型错误')
            throw new Error('cb 类型错误')
          }
        },
      }
      checkFn[typeStr](typeData)
    },
    _hidToast(duration, cb) {
      // 隐藏toast
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.isShow = false
        cb && cb()
      }, duration)
    },
  },
}
</script>

<style lang="less" scoped>
.my-toast {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &.no-event {
    pointer-events: none;
  }
  .my-toast__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    max-width: 440px;
    color: #fff;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 26px 40px;
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    font-size: 32px;
    line-height: 36px;
    font-weight: bold;
    box-sizing: border-box;
    .my-toast__icon {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    .my-toast__text {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      margin: 0 0 0 18px;
      text-align: left;
      word-break: break-all;
    }
  }
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s;
}
.toast-fade-enter, .toast-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
