<template>
  <div v-if="detailData && detailData.clientDetail" class="container">
    <p class="container_title">
      {{ compType == 'tc' ? '产品详情' : '服务详情' }}
    </p>
    <div class="container_html" v-html="detailData.clientDetail"></div>
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
    compType: {
      type: String,
      default: 'tc',
    },
  },
  data() {
    return {
      containerLoading: true,
    }
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
