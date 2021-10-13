<template>
  <div v-if="isNoData" class="no-data">
    <img
      width="100%"
      src="https://cdn.shupian.cn/sp-pt/wap/images/bwpm2il2fe80000.png"
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
  // padding-top: 10px;
  img {
    display: block;
    width: 340px;

    margin: 148px auto 0px;
  }
}
</style>
