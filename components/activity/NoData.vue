<template>
  <div v-if="isNoData" class="no-data">
    <img
      width="100%"
      src="https://cdn.shupian.cn/sp-pt/wap/images/bzre7lw14o00000.png"
      alt=""
      srcset=""
    />
  </div>
</template>
<script>
export default {
  props: {
    isNoData: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="less" scoped>
.no-data {
  text-align: center;
  padding-top: 10px;
  img {
    display: block;
    width: 340px;
    height: 340px;
    margin: 0 auto;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 30px;
  }
}
</style>
