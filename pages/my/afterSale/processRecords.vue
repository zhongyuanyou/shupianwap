<template>
  <div class="process-record">
    <Header title="处理记录" />
    <div class="process-box">
      <sp-steps direction="vertical" :active="processRecordData.length - 1">
        <sp-step v-for="(item, index) in processRecordData" :key="index">
          <h3>{{ item.dealStatusName }}</h3>
          <div class="date">{{ item.dealTime }}</div>
          <!-- <p>申请原因：{{ item.dealStatusNo }}</p>
          <div class="desc">
            {{ item.dealDetail }}
          </div>
          <ul>
            <li><img /></li>
            <li><img /></li>
          </ul> -->
        </sp-step>
      </sp-steps>
    </div>
    <div v-if="!processRecordData.length && showNoDataImg" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">暂无记录</p>
    </div>
    <!-- 操作按钮 -->
    <div class="footer-btns">
      <button @click="concatKefuBtn">联系客服</button>
    </div>
  </div>
</template>

<script>
import { Step, Steps } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
import imHandle from '@/mixins/imHandle'
export default {
  components: {
    Header,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  mixins: [imHandle],
  data() {
    return {
      active: 1,
      page: 1,
      limit: 1000,
      processRecordData: [],
      showNoDataImg: false,
    }
  },
  created() {
    this.getProcessRecords()
  },
  methods: {
    concatKefuBtn() {
      this.jumpOnlineKefu()
    },
    async getProcessRecords() {
      const res = await this.$axios.post(afterSaleApi.record, {
        afterSaleId: this.$route.query.id,
        limit: this.limit,
        page: this.page,
        sort: 2,
      })
      if (res.code === 200) {
        this.processRecordData = res.data.records
        if (this.processRecordData.length === 0) {
          this.showNoDataImg = true
        } else {
          this.showNoDataImg = false
        }
      } else {
        this.showNoDataImg = true
        this.$message.error(res.message)
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
.process-record {
  border-radius: 24px;
  padding-bottom: 148px;
  background: #f8f8f8;
  min-height: 100vh;
  .process-box {
    border-top: 1px solid #f4f4f4;
    .com-title {
      padding: 32px 28px;
    }
    ::v-deep.sp-step__circle {
      width: 24px;
      height: 24px;
      border: 6px solid #f4f4f4;
      background: #999;
    }
    ::v-deep.sp-icon-checked {
      width: 24px;
      height: 24px;
      background-color: #4974f5;
      border-radius: 24px;
      border: 6px solid #d0dcff;
      &::before {
        content: '';
      }
    }

    ::v-deep .sp-step__title {
      font-family: PingFangSC-Regular;
      font-size: 26px;
      h3 {
        color: #222222;
        line-height: 40px;
        font-weight: normal;
        font-size: 28px;
      }
      p {
        color: #555;
        line-height: 34px;
        margin-top: 10px;
        font-size: 24px;
      }
      .date {
        font-size: 24px;
        color: #999999;
        line-height: 34px;
        margin: 10px 0;
      }
      .desc {
        font-size: 24px;
        color: #555555;
        line-height: 34px;
        margin-top: 8px;
      }
      > ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
        li {
          width: 140px;
          height: 140px;
          background: #d8d8d8;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 16px;
          margin-bottom: 16px;
        }
      }
    }
  }
  .footer-btns {
    padding: 24px;
    display: flex;
    height: 128px;
    background: #fff;
    position: fixed;
    justify-content: flex-end;
    bottom: 0;
    z-index: 9;
    width: 100%;
    button {
      width: 159px;
      height: 80px;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      margin: 0 8px;
    }
  }
}
.refund-details {
  min-height: 100vh;
  background: #f8f8f8;
  .content-box {
    position: relative;
    margin-top: -16px;
    overflow: hidden;
    border-radius: 24px 24px 0 0;
    z-index: 9;
    padding: 13px 40px;
    background: #fff;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 11px 0;
      line-height: 36px;
      h3 {
        font-size: 26px;
        color: #222222;
        font-weight: normal;
      }
      p {
        font-size: 26px;
        color: #1a1a1a;
        font-weight: bold;
      }
    }
  }
}
</style>
