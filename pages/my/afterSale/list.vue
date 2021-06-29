<template>
  <div class="sale-list">
    <sp-sticky>
      <Header
        title="退款/售后"
        :custom-jump="customJump"
        @backHandle="backHandle"
      >
        <template #right>
          <sp-icon
            class-prefix="spiconfont"
            name="sear_ic_sear"
            size="0.36rem"
            color="#1A1A1A"
            @click="$router.push('/search/orderSearch')"
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
      <div v-if="saleDataList.length > 0">
        <after-sale-list :sale-list="saleDataList"></after-sale-list>
      </div>
    </sp-list>
    <div v-if="!saleDataList.length && showNoDataImg" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">暂无售后单</p>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Icon, List, Sticky } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
import AfterSaleList from '@/components/afterSale/AfterSaleList'
// import LoadingCenter from '@/components/common/loading/LoadingCenter'
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
      queryId: '',
      showNoDataImg: false,
      customJump: true,
    }
  },
  mounted() {
    if (this.active === 0) {
      this.afterSaleStatus = this.searchStatus
    }
    if (this.$route.query.id) {
      this.active = 1
      this.afterSaleStatus = []
    }
  },
  methods: {
    backHandle() {
      this.$router.push('/my')
    },
    async getAfterSaleList() {
      const res = await this.$axios.post(afterSaleApi.list, {
        page: this.page,
        limit: this.limit,
        afterSaleStatusNoList: this.afterSaleStatus,
        type: '3',
        code: this.$route.query.id || '',
      })
      if (res.code === 200) {
        this.saleDataList = [...this.saleDataList, ...res.data.records]
        if (this.saleDataList.length === 0) {
          this.showNoDataImg = true
        } else {
          this.showNoDataImg = false
        }
        this.loading = false
        this.page++
        if (this.page > res.data.totalPage) {
          this.finished = true
        }
      } else {
        this.showNoDataImg = true
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
      const newQuery = JSON.parse(JSON.stringify(this.$route.query)) // 深拷贝
      delete newQuery.id // 删除路由参数
      this.$router.push({ query: newQuery }) // 跳转路由
      this.page = 1
      this.$route.query.id = ''
      this.saleDataList = []
      this.finished = false
      this.loading = true
      this.getAfterSaleList()
    },
  },
}
</script>

<style lang="less" scoped>
.no-data-area {
  width: 100%;
  height: 100vh;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  img {
    width: 340px;
    height: 340px;
    margin: 20vh auto 40px auto;
    display: block;
  }
  .text {
    height: 29px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
  }
}
.sale-list {
  position: relative;
  z-index: 9;
  min-height: 100vh;
  background: #f8f8f8;
  ::v-deep .sp-tabs {
    z-index: 9;
  }
  ::v-deep .spiconfont-sear_ic_sear {
    margin-right: 34px;
  }
}
</style>
