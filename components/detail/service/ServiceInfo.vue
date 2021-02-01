<template>
  <div v-if="clientDetailsData['clientDetail']" class="serviceInfo">
    <h1 class="serviceInfo-title">服务详情</h1>
    <div
      class="serviceInfo-content"
      v-html="clientDetailsData['clientDetail']"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ServiceInfo',
  props: {
    clientDetailsData: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.serviceInfo {
  padding: 14px 40px 31px 40px;
  background-color: #fff;
  margin-top: 24px;
  &-title {
    height: 105px;
    line-height: 105px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-content {
    font-size: 26px;
    color: #595959;
    /deep/ img {
      max-width: 100%;
    }
  }
}
</style>
