<template>
  <transition name="toast-fade">
    <div v-show="isShow" class="my-toast" :class="{ 'no-event': forbidClick }">
      <div class="my-toast__content">
        <i class="my-toast__icon spiconfont" :class="`spiconfont-${icon}`"></i>
        <div class="my-toast__text">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SpToast',
  data() {
    return {
      isShow: false, // 是否显示
      message: '',
      icon: '',
      forbidClick: false, // 是否禁止背景点击
      timer: null,
    }
  },
  methods: {
    show({ duration = 1000, message = '', icon = '', forbidClick = false }) {
      this.isShow = true
      if (typeof icon !== 'string') {
        console.error('icon 类型错误')
        throw new Error('icon 类型错误')
      }
      if (typeof message !== 'string') {
        console.error('message 类型错误')
        throw new Error('message 类型错误')
      }
      if (typeof forbidClick !== 'boolean') {
        console.error('forbidClick 类型错误')
        throw new Error('forbidClick 类型错误')
      }
      this.forbidClick = forbidClick
      this.message = message
      this.icon = icon
      if (duration > 0) {
        this._hidToast(duration)
      }
    },
    _hidToast(duration) {
      // 隐藏toast
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.isShow = false
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
    padding: 30px 40px;
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
