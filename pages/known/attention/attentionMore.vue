<template>
  <div class="container">
    <div class="container_header">
      <my-icon
        name="tabbar_ic_order"
        size="0.32rem"
        color="#1A1A1A"
        class="my_icon"
      ></my-icon>
      关注更多
    </div>
  </div>
</template>
<script>
import { WorkTab } from '@chipspc/vant-dgg'
// import ItemCard from '@/components/mustKnown/recommend/ItemCard'
export default {
  name: 'Attention',
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.container {
  .container_header {
    height: 88px;
    background: #ffffff;
    line-height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    position: relative;
    .my_icon {
      position: absolute;
    }
  }
}
</style>
