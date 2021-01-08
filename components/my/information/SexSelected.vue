<template>
  <sp-popup
    v-model="visible"
    position="bottom"
    class="popup"
    :close-on-popstate="true"
    @close="closePopup"
  >
    <div class="popup_tp">
      <div
        :class="['popup_tp_item', { active_item: sex === 1 }]"
        @click="handleClick(1)"
      >
        男
      </div>
      <div
        :class="['popup_tp_item', 'no_line', { active_item: sex === 0 }]"
        @click="handleClick(0)"
      >
        女
      </div>
    </div>
    <div class="popup_bot" @click="closePopup">取消</div>
  </sp-popup>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  name: 'SexSelected',
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
    sex: {
      type: Number,
      default: 1,
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
    handleClick(val) {
      this.$emit('changeSex', val)
      this.closePopup()
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  height: 337px;
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
    .active_item {
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
    }
    &_item {
      width: 100%;
      height: 108px;
      text-align: center;
      line-height: 108px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      border-bottom: 1px solid #f4f4f4;
    }
    .no_line {
      border-bottom: none;
    }
  }
  &_bot {
    width: 100%;
    height: 96px;
    background-color: #fff;
    text-align: center;
    line-height: 96px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
  }
}
</style>
