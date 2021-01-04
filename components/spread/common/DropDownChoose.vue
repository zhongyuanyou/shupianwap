<template>
  <div v-show="isShow" class="dropdownchoose">
    <sp-popup v-model="show" position="bottom" :style="{ height: '55%' }">
      <sp-sticky :offset-top="50">
        <sp-picker
          :title="title"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        />
      </sp-sticky>
    </sp-popup>
  </div>
</template>

<script>
import { Picker, Toast, Popup, Sticky } from '@chipspc/vant-dgg'
export default {
  components: {
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return {}
      },
    },
    isShow: {
      type: Boolean,
      default: () => {},
    },
  },
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      show: true,
    }
  },
  methods: {
    onConfirm(value, index) {
      this.isShow = false
    },
    onChange(picker, value, index) {
      this.isShow = false
    },
    onCancel() {
      this.isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.dropdownchoose {
  width: 750px;
  /deep/.sp-picker {
    height: 100%;
  }
}
</style>
