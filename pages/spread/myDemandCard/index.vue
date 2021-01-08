<template>
  <div>
    <Header title="" :fixed="false" head-class="head-icon" />
    <div class="nav"></div>
  </div>
</template>

<script>
import { WorkTab, WorkTabs } from '@chipspc/vant-dgg'
import Header from '~/components/common/head/header'
export default {
  name: 'Index',
  components: {
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
  },
}
</script>

<style lang="less" scoped>
.nav {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/cyfejr5z9fk0000.jpg');
}
</style>
