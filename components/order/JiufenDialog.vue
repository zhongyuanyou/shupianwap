<template>
  <div class="modal_area">
    <sp-dialog
      v-model="showJiufenModal"
      confirm-button-text="复制链接"
      @confirm="copyLink"
    >
      <p class="text_area">
        请复制下方链接在PC端打开，进行纠纷/售后 {{ linkUrl }}
      </p>
    </sp-dialog>
  </div>
</template>

<script>
import { Button, Dialog } from '@chipspc/vant-dgg'
export default {
  components: {
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      showJiufenModal: false,
      linkUrl: 'https://shupian.cn/',
    }
  },
  methods: {
    copyLink() {
      const oInput = document.createElement('input')
      oInput.value = this.linkUrl
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.remove()
      this.showJiufenModal = false
      this.$xToast.show({
        message: '复制成功',
        duration: 1500,
        icon: 'toast_ic_comp',
        forbidClick: true,
      })
    },
  },
}
</script>

<style lang="less">
.sp-dialog__content {
  padding: 40px;
  .text_area {
    font-size: 28px;
    color: #666;
    font-size: 28px;
    color: #222222;
    text-align: center;
    width: 100%;
  }
  .url {
    text-align: center;
    color: royalblue;
    margin-top: 20px;
  }
  .modal_area {
    width: 540px;
    height: 264px;
    background: #ffffff;
    border-radius: 24px;
  }
}
</style>
