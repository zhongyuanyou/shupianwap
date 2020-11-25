<template>
  <sp-popup
    v-model="visible"
    position="bottom"
    class="popup"
    :close-on-popstate="true"
    @close="closePopup"
  >
    <sp-datetime-picker
      v-model="currentDate"
      type="date"
      title="设置生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="cancel"
    />
  </sp-popup>
</template>

<script>
import { Popup, DatetimePicker } from '@chipspc/vant-dgg'
export default {
  name: 'BirthdaySelecter',
  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
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
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
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
    confirm(val) {
      // 点击完成
      this.$emit('changeBirthday', val)
      this.closePopup()
    },
    cancel() {
      // 取消
      this.closePopup()
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #fff;
}
</style>
