<template>
  <div class="container">
    <div class="container_body">
      <div class="default">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/5ntfyph5qvc0000.png"
          alt=""
        />
        <div class="default_title">关注列表空空如也～</div>
        <div class="attBtn" @click="$router.push({ path: '/known/more' })">
          前往关注
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotAttention',
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.container {
  background: #f5f5f5;
  height: 100%;
  .container_body {
    .default {
      text-align: center;
      padding-top: 132px;
      // height: 1120px;
      > img {
        width: 340px;
        height: 340px;
      }
      .default_title {
        height: 30px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 30px;
        margin: 24px 0 32px 0;
      }
      .attBtn {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 28px;
      }
    }
  }
}
</style>
