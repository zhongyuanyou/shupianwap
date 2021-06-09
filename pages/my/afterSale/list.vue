<template>
  <div class="sale-list">
    <Header title="退款/售后">
      <template #right>
        <sp-icon
          class-prefix="spiconfont"
          name="sear_ic_sear"
          size="0.36rem"
          color="#1A1A1A"
          @click="$router.push('/index')"
        ></sp-icon>
      </template>
    </Header>
    <sp-tabs v-model="active">
      <sp-tab title="售后中">
        <List :sale-list="saleDataList" />
      </sp-tab>
      <sp-tab title="全部"> <List :sale-list="saleDataList" /></sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import List from '@/components/afterSale/List'
export default {
  components: {
    Header,
    List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    SpIcon: Icon,
  },
  data() {
    return {
      active: 2,
      saleDataList: [],
    }
  },
}
</script>

<style lang="less" scoped>
.sale-list {
  min-height: 100vh;
  background: #f8f8f8;
  ::v-deep .spiconfont-sear_ic_sear {
    margin-right: 34px;
  }
}
</style>
