<template>
  <div class="audit">
    <Header title="轻松找服务" :fixed="false" head-class="head-icon" />
    <HeaderNeed />
    <Content @content="contentObj" />
    <FixedButtom :content="content" />
  </div>
</template>

<script>
import HeaderNeed from '@/components/spread/auditingService/HeaderNeed'
import Content from '@/components/spread/auditingService/Content'
import FixedButtom from '@/components/spread/auditingService/FixedButtom'
import Header from '~/components/common/head/header'
export default {
  name: 'Index',
  components: {
    HeaderNeed,
    Content,
    FixedButtom,
    Header,
  },
  data() {
    return {
      content: {}, // 跳转第二页所传参数
    }
  },
  computed: {},
  methods: {
    // 获取content组件传来的用户输入值
    contentObj(value) {
      this.content = value
    },
  },
}
</script>
<style lang="less" scoped>
.audit {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
}
</style>
