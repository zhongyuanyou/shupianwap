<template>
  <div class="header">
    <sp-icon name="cross" size="24" color="#fff" />
    <div class="header_title">所在地区</div>
    <sp-icon name="cross" size="24" @click="closePopup" />
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Header',
  components: {
    SpIcon: Icon,
  },
  methods: {
    closePopup() {
      // 关闭弹窗
      this.$emit('closePopup')
    },
  },
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 132px;
  padding: 0 40px;
  &_title {
    color: #1a1a1a;
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
