<template>
  <div class="productDetail-layouts">
    <nuxt />
    <commodityConsultation />
  </div>
</template>
<script>
import commodityConsultation from '@/components/common/commodityConsultation/commodityConsultation'
export default {
  components: {
    commodityConsultation,
  },
}
</script>
<style lang="less" scoped>
.productDetail-layouts {
  height: 100%;
}
</style>
