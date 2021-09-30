<template>
  <div v-if="custDetail && custDetail.clientDetail" class="container">
    <p class="container_title">
      {{ title }}
    </p>
    <div class="container_html" v-html="custDetail.clientDetail"></div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  components: {},
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    title: {
      type: String,
      default: '产品详情',
    },
  },
  data() {
    return {
      containerLoading: true,
    }
  },
  computed: {
    custDetail() {
      return this.detailData
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 48px 40px 31px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &_html {
    font-size: 26px;
    color: #595959;
    ::v-deep img {
      max-width: 100%;
    }
  }
}
</style>
