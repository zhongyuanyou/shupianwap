<template>
  <div class="refund-record">
    <Header title="退款明细" />
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getRefundRecords"
    >
      <ul v-if="refundRecordData.length > 0">
        <li
          v-for="(item, index) in refundRecordData"
          :key="index"
          @click="$router.push(`/my/afterSale/refundDetails?id=${item.id}`)"
        >
          <!-- <div class="pic">
            <sp-icon
              class-prefix="spiconfont"
              size="0.82rem"
              color="#4974f5"
              name="tk_ic_qtzf"
            ></sp-icon>
          </div> -->
          <div class="desc">
            <h3>{{ item.passTypeCodeName }}</h3>
            <p>{{ item.reimburseCompleteTime }}</p>
          </div>
          <div class="amount">
            {{ item.reimburseAmountYuan }}<span>元</span>
          </div>
        </li>

        <!-- <li>
        <div class="pic">
          <sp-icon
            class-prefix="spiconfont"
            size="0.82rem"
            color="#29AF12"
            name="pay_ic_wechat"
          ></sp-icon>
        </div>
        <div class="desc">
          <h3>换业务</h3>
          <p>变更业务，继续办理</p>
        </div>
        <div class="amount">100<span>元</span></div>
      </li> -->
      </ul>
    </sp-list>
    <!-- 无退款明细 -->
    <div v-if="!refundRecordData.length && showNoData" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/4cnzucsyu6m0000.png"
        alt=""
        srcset=""
      />
      <p class="text">退款中，请您耐心等待额~</p>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    // SpIcon: Icon,
    [List.name]: List,
  },
  data() {
    return {
      showNoData: false,
      refundRecordData: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    }
  },
  created() {
    // this.getRefundRecords()
  },
  methods: {
    async getRefundRecords() {
      const res = await this.$axios.post(afterSaleApi.refundList, {
        afterSaleId: this.$route.query.id,
        orderId: this.$route.query.orderId,
        limit: this.limit,
        page: this.page,
      })
      if (res.code === 200) {
        this.refundRecordData = [...this.refundRecordData, ...res.data.list]
        if (this.refundRecordData.length === 0) {
          this.showNoData = true
        } else {
          this.showNoData = false
        }
        this.loading = false
        this.page++
        if (this.page > res.data.total) {
          this.finished = true
        }
      } else {
        this.$message.error(res.message)
        this.loading = false
        this.finished = true
      }
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
.refund-record {
  min-height: 100vh;
  background: #f8f8f8;
  ::v-deep .spiconfont-sousuo1 {
    margin-right: 34px;
  }
  ul {
    background: #fff;
    li {
      display: flex;
      height: 162px;
      padding: 40px;
      border-top: 1px solid #f4f4f4;
      .pic {
        width: 82px;
        height: 82px;
        display: flex;
        align-items: center;
      }
      .desc {
        margin-left: 28px;
        h3 {
          font-size: 34px;
          color: #222222;
          line-height: 40px;
          font-weight: bold;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #555555;
          line-height: 34px;
          margin-top: 17px;
        }
      }
      .amount {
        font-size: 36px;
        color: #ec5330;
        margin-left: auto;
        span {
          font-size: 24px !important;
        }
      }
    }
  }
  // .no-refund {
  //   display: flex;
  //   justify-content: center;
  //   text-align: center;
  //   min-height: 100vh;
  //   background: #f8f8f8;
  //   padding-top: 200px;
  //   .img-box {
  //     width: 340px;
  //     height: 340px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }

  //   p {
  //     margin-top: 24px;
  //     font-size: 30px;
  //     line-height: 30px;
  //     color: #222222;
  //   }
  // }
}
</style>
