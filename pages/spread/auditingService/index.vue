<template>
  <div class="audit">
    <HeaderNeed />
    <Content />
    <FixedButtom />
  </div>
</template>

<script>
import HeaderNeed from '@/components/spread/auditingService/HeaderNeed'
import Content from '@/components/spread/auditingService/Content'
import FixedButtom from '@/components/spread/auditingService/FixedButtom'
export default {
  name: 'Index',
  components: {
    HeaderNeed,
    Content,
    FixedButtom,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
<style lang="less" scoped>
.audit {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
}
</style>
