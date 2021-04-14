<template>
  <div class="page">
    <Header title="进行进度" @leftClickFuc="onClickLeft" />
    <div v-if="hasDetail" class="banner">
      <sp-image class="left-img" :src="skuInfo.skuImages"> </sp-image>
      <div class="right">
        <p class="goods-name">
          {{ skuInfo.orderSaleName }}
        </p>
        <p class="price-area">
          <span class="goods-price">{{ skuInfo.skuExtInfo }}</span>
          <!-- <span class="text">元</span>
          <span class="goods-num">×1</span> -->
        </p>
      </div>
    </div>
    <ProcessList v-if="hasList" :batch-data="batchData" />
    <LoadingCenter v-show="!hasList || !hasDetail" />
  </div>
</template>

<script>
// 非周期产品办理进度
import { mapMutations, mapState } from 'vuex'
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import ProcessList from '@/components/order/process/ProcessList'
import orderApi from '@/api/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    [Image.name]: Image,
    Header,
    LoadingCenter,
    ProcessList,
  },
  data() {
    return {
      loading: true,
      hasDetail: false,
      hasList: false,
      skuInfo: {},
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
  created() {
    this.type = Math.ceil(Math.random() * 2)
  },
  mounted() {
    this.orderData.orderId = this.$route.query.orderId
    this.orderData.cusOrderId = this.$route.query.cusOrderId
    this.orderData.skuId = this.$route.query.skuId
    this.getDetail()
    this.getProcessInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    getProcessInfo() {
      orderApi
        .getProcessInfo(
          { axios: this.$axios },
          {
            orderDetailsId: this.$route.query.detailId,
          }
        )
        .then((res) => {
          this.hasList = true
          if (res && res.length) this.batchData = res || res
          else this.batchData = []
        })
        .catch(() => {
          this.hasList = true
        })
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderData.orderId, cusOrderId: this.orderData.cusOrderId }
        )
        .then((res) => {
          // const orderData = res
          const data = res.data ? res.data : res
          this.skuInfo = data.orderSkuList.filter((item) => {
            return item.skuId === this.orderData.skuId
          })[0]
          this.hasDetail = true
        })
        .catch((err) => {
          this.hasDetail = true
          this.$xToast.show(err.message)
          this.$router.back(-1)
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
    height: 218px;
    background: #ffffff;
    padding: 40px;
    display: flex;
    margin-bottom: 30px;
    .left-img {
      width: 130px;
      height: 130px;
      background: rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      overflow: hidden;
      img {
        width: auto;
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
  .batch-list {
    background: white;
    padding: 20px 40px;
    .title {
      font-size: 32px;
      color: #222;
      font-weight: bold;
    }
    .item {
      padding: 40px 0;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 24px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f4f4f4;
    }
    .no-border {
      border-top: none;
    }
  }
}
</style>
