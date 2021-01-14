<template>
  <div class="audit">
    <Header ref="headerRef" title="轻松找服务" />
    <HeaderNeed />
    <Content />
  </div>
</template>

<script>
import HeaderNeed from '@/components/spread/myDemandCard/auditingService/HeaderNeed'
import Content from '@/components/spread/myDemandCard/auditingService/Content'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'AuditingService',
  components: {
    HeaderNeed,
    Content,
    Header,
  },
  data() {
    return {}
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费帮找页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
}
</script>
<style lang="less" scoped>
.audit {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  /deep/ .my-head {
    width: @spread-page-width;
    left: 50%;
    margin-left: -375px;
  }
}
</style>
