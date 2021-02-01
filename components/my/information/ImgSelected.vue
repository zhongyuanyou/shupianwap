<template>
  <sp-popup
    v-model="visible"
    position="bottom"
    class="popup"
    :close-on-popstate="true"
    @close="closePopup"
  >
    <div class="popup_tp">
      <div class="popup_tp_item" @click="handleClick">从手机相册选择</div>
    </div>
    <div class="popup_bot">取消</div>
  </sp-popup>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  name: 'ImgSelected',
  components: {
    [Popup.name]: Popup,
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  watch: {
    show: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.visible = this.show
      },
      immediate: true,
    },
  },
  methods: {
    closePopup() {
      //  关闭弹窗
      this.$emit('update:show', false)
      this.visible = false
    },
    handleClick() {},
  },
}
</script>

<style lang="less" scoped>
.popup {
  height: 229px;
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: #f8f8f8;
  &_tp {
    width: 100%;
    padding: 0 40px;
    background-color: #fff;
    &_item {
      width: 100%;
      height: 108px;
      text-align: center;
      line-height: 108px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      position: relative;
    }
  }
  &_bot {
    height: 96px;
    width: 100%;
    text-align: center;
    line-height: 96px;
    background-color: #fff;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
  }
}
</style>
