<template>
  <div class="page">
    <Header :title="pageTitle" @leftClickFuc="onClickLeft" />
    <ProcessList :batch-data="batchData" />
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
// 办理进度批次信息
import { mapMutations, mapState } from 'vuex'
import Header from '@/components/common/head/header'
import ProcessList from '@/components/order/process/ProcessList'
import orderApi from '@/api/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    Header,
    ProcessList,
    LoadingCenter,
  },
  data() {
    return {
      loading: true,
      orderData: {},
      batchData: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    navTop() {
      return 44
    },
  },
  mounted() {
    this.pageTitle = '第' + this.$route.query.step + '批次'
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    getProcessInfo() {
      orderApi
        .getProcessInfoBatch(
          { axios: this.$axios },
          {
            orderDetailsId: this.orderData.orderId,
          }
        )
        .then((res) => {
          this.loading = false
          if (res.data && res.data.records)
            this.batchData = res.data || res.data.records
          else this.batchData = []
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  background: #f4f4f4;
  min-height: 100vh;
  .banner {
    height: 194px;
    background: #ffffff;
    padding: 20px 40px;
    display: flex;
    .left-img {
      width: 130px;
      height: 130px;
      background: rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      padding-left: 20px;
      flex: 1;
      .goods-name {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36px;
        margin-bottom: 10px;
      }
      .price-area {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 36px;
        span {
          display: block;
          float: left;
        }
        .goods-price {
          font-size: 28px;
        }
        .text {
          font-size: 24px;
        }
        .goods-num {
          float: right;
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
}
</style>
