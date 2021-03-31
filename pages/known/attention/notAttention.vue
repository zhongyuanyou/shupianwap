<template>
  <div class="container">
    <div class="container_body">
      <div class="default">
        <img src="" alt="" />
        <div class="default_title">关注列表空空如也～</div>
        <div class="attBtn">前往关注</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotAttention',
  components: {},
  data() {
    return {
      title: '搜索数据',
      btnValue: '+关注',
      attention_btn: {},
    }
  },
  methods: {
    attention() {
      this.btnValue = '已关注'
      this.attention_btn = { background: ' #F5F5F5', color: '#999999' }
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  background: #f5f5f5;
  height: 100%;

  .container_body {
    .default {
      text-align: center;
      margin-top: 132px;
      > img {
        width: 340px;
        height: 340px;
        background: #4974f5;
        opacity: 0.4;
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
