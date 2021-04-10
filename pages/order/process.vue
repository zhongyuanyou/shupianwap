<template>
  <div class="page">
    <Header title="进行进度" @leftClickFuc="onClickLeft" />
    <div v-if="!loading" class="banner">
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
    <div v-if="batchList.length" class="batch-list">
      <div class="title">办理进度</div>
      <div
        v-for="(item, index) in batchList"
        :key="index"
        class="item"
        @click="toNav(item)"
      >
        <span>第{{ index }}批次</span>
      </div>
      <div v-if="!batchList.length" class="no-data">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/78km3o58dnw0000.png"
          alt=""
          srcset=""
        />
        <p>暂无办理进度信息</p>
      </div>
    </div>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
// 周期产品办理进度
import { mapMutations, mapState } from 'vuex'
import { Image } from '@chipspc/vant-dgg'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import Header from '@/components/common/head/header'
import orderApi from '@/api/order'
export default {
  components: {
    [Image.name]: Image,
    Header,
    LoadingCenter,
  },
  data() {
    return {
      loading: true,
      skuInfo: {},
      orderData: {},
      batchList: [],
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
    this.orderData.orderId = this.$route.query.orderId
    this.orderData.cusOrderId = this.$route.query.cusOrderId
    this.orderData.skuId = this.$route.query.skuId
    this.getProcessList()
    this.getDetail()
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    toNav(item) {
      this.$router.push({
        path: '/order/processBatch',
        query: {
          orderId: this.orderData.orderId,
          serverId: item.id,
          step: item.index++,
        },
      })
    },
    getProcessList() {
      orderApi
        .getProcessList(
          { axios: this.$axios },
          { orderDetailsId: this.orderData.orderId }
        )
        .then((res) => {
          console.log('周期批次列表', res)
          this.batchList = res.data.records || res.data
          this.loading = false
        })
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderData.orderId, cusOrderId: this.orderData.cusOrderId }
        )
        .then((res) => {
          console.log('orderDetail3', res)
          this.loading = false
          const data = res.data ? res.data : res
          this.skuInfo = data.orderSkuList.filter((item) => {
            return item.skuId === this.orderData.skuId
          })[0]
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.show(err.message)
          // this.$router.back(-1)
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
  .no-data {
    text-align: center;
    width: 100%;
    padding: 100px 0;
    font-size: 24px;
    color: #999;
    img {
      width: 330px;
      height: 330px;
    }
  }
}
</style>
