<template>
  <div class="hotSale">
    <!--  banner  -->
    <banner></banner>
    <!--  banner  -->
    <!--  选项卡  -->
    <serve></serve>
    <!--  选项卡  -->
  </div>
</template>

<script>
import Banner from '~/components/spread/hotSale/Banner'
import Serve from '~/components/spread/hotSale/Serve'
export default {
  name: 'Index',
  components: {
    Banner,
    Serve,
  },
}
</script>

<style scoped lang="less">
.hotSale {
}
</style>
