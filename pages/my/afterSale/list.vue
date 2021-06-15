<template>
  <div class="sale-list">
    <sp-sticky>
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
      <sp-tabs v-model="active" @change="tabChange">
        <sp-tab
          v-for="(item, index) in ['处理中', '全部']"
          :key="index"
          :title="item"
        >
        </sp-tab>
      </sp-tabs>
    </sp-sticky>
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getAfterSaleList"
    >
      <div>
        <after-sale-list :sale-list="saleDataList"></after-sale-list>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { Tab, Tabs, Icon, List, Sticky } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
import AfterSaleList from '@/components/afterSale/AfterSaleList'
export default {
  components: {
    Header,
    AfterSaleList,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    SpIcon: Icon,
  },
  data() {
    return {
      active: 0,
      saleDataList: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      afterSaleStatus: [],
      searchStatus: [
        'AFTERSALE_STATUS_1',
        'AFTERSALE_STATUS_2 ',
        'AFTERSALE_STATUS_3',
      ],
    }
  },
  created() {},
  methods: {
    async getAfterSaleList() {
      if (this.active === 0) {
        this.afterSaleStatus = this.searchStatus
      }
      const res = await this.$axios.post(afterSaleApi.list, {
        page: this.page,
        limit: this.limit,
        afterSaleStatusNoList: this.afterSaleStatus,
      })
      if (res.code === 200) {
        this.saleDataList = [...this.saleDataList, ...res.data.records]
        this.loading = false
        this.page++
        if (this.page > res.data.totalPage) {
          this.finished = true
        }
      } else {
        this.loading = false
        this.finished = true
      }
    },
    tabChange(index) {
      if (index === 0) {
        this.afterSaleStatus = this.searchStatus
      } else {
        this.afterSaleStatus = []
      }
      this.page = 1
      this.saleDataList = []
      this.finished = false
      this.loading = true
      this.getAfterSaleList()
    },
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
