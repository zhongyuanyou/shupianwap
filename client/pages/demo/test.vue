<template>
  <div class="demo-page">
    <div class="modle-item">
      <TabCurve></TabCurve>
    </div>
  </div>
</template>

<script>
import TabCurve from '@/components/tab/TabCurve'
export default {
  name: 'Test',
  components: {
    TabCurve,
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.demo-page {
  width: 100%;
  .modle-item {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
}
</style>
