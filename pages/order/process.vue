<template>
  <div class="page">
    <Header title="进行进度" @leftClickFuc="onClickLeft" />
    <div v-if="hasDetail" class="banner">
      <sp-image class="left-img" :src="skuInfo.indexImg"> </sp-image>
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
        <span>{{ item.serverName }}</span>
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
    <LoadingCenter v-show="!hasList || !hasDetail" />
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
      skuInfo: {},
      orderData: {},
      batchList: [],
      hasList: false,
      hasDetail: false,
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
          productionOrderId: item.productionOrderId,
          num: item.serverNum,
        },
      })
    },
    getProcessList() {
      orderApi
        .getProcessList(
          { axios: this.$axios },
          { orderDetailsId: this.$route.query.detailId }
        )
        .then((res) => {
          this.hasList = true
          this.batchList = res
        })
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderData.orderId, cusOrderId: this.orderData.cusOrderId }
        )
        .then((res) => {
          this.hasDetail = true
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
      margin-bottom: 20px;
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
