<template>
  <div class="download-pop" @touchmove="noEvent($event)">
    <div class="download-pop-content">
      <div class="download-pop-content-box">
        <img
          :src="$ossImgSet(160, 160, 'g6trabnxtg80000.png')"
          alt=""
          class="app-logo"
        />
        <h4 class="app-title">薯片找人APP</h4>
        <p class="app-descript">找人服务，尽在薯片找人</p>
        <button class="app-download-btn" @click="openApp($event)">
          立即下载
        </button>
      </div>
      <button class="closse-btn" @click="hanleClose">
        <my-icon
          name="popup_ic_closeb"
          size="0.76rem"
          color="rgba(255, 255, 255, 1)"
        ></my-icon>
      </button>
    </div>
  </div>
</template>

<script>
import openapp from '~/mixins/openapp'
export default {
  name: 'Download',
  mixins: [openapp],
  methods: {
    hanleClose() {
      this.$emit('handleDialogClosed')
    },
    noEvent(e) {
      e.preventDefault()
    },
  },
}
</script>

<style lang="less" scoped>
.download-pop {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  .download-pop-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .download-pop-content-box {
      border-radius: 24px;
      width: 580px;
      height: 736px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      .app-logo {
        width: 140px;
        height: 140px;
        background: #4974f5;
        border-radius: 24px;
        margin-top: 108px;
      }
      .app-title {
        font-size: 40px;
        font-weight: 700;
        color: #1a1a1a;
        line-height: 44px;
        margin-top: 70px;
      }
      .app-descript {
        font-size: 28px;
        font-weight: 400;
        color: #222;
        line-height: 32px;
        margin-top: 28px;
      }
      .app-download-btn {
        width: 320px;
        height: 88px;
        border-radius: 8px;
        margin-top: 148px;
        color: #fff;
        background-color: #4974f5;
        border: 1px solid #4974f5;
        font-size: 32px;
        font-weight: 700;
        color: #fff;
      }
    }
    .closse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 76px;
      height: 76px;
      border: none;
      background-color: transparent;
      margin: 48px auto 0;
    }
  }
}
</style>
