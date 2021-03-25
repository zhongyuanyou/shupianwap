<template>
  <div>
    <div class="content">
      <h2>文本区域111</h2>
    </div>
    <div class="page-btn">
      <sp-field type="text" placeholder="请输入1" />
    </div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
export default {
  components: {
    [Field.name]: Field,
  },
}
</script>

<style lang="less">
.content {
  height: 120vh;
}
.page-btn {
  position: fixed;
  height: 100px;
  width: 100%;
  padding: 10px;
  left: 0;
  bottom: 0;
  background: yellow;
}
</style>
