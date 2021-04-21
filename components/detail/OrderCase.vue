<template>
  <div class="case">
    <h1>精选案例</h1>
    <div class="box">
      <div class="head">
        <img :src="ordercase.img" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { Rate } from '@chipspc/vant-dgg'
export default {
  name: 'OrderCase',
  components: {
    [Rate.name]: Rate,
  },
  data() {
    return {
      ordercase: {
        img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
      },
    }
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 16px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  > .box {
  }
}
</style>
