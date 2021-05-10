<template>
  <div class="contract">
    <Head ref="head" title="附件协议-合同列表"> </Head>
    <div class="listbox">
      <div v-for="(item, index) in list" :key="index" class="list">
        <div class="head">
          <h1>{{ item.contractName }}</h1>
          <p v-if="item.contractStatus == 'STRUTS_YWC'">已完成</p>
          <p
            v-if="item.contractStatus == 'STRUTS_CG'"
            :style="{
              color: item.contractStatus == 'STRUTS_CG' ? '#FE8C29' : '#222222',
            }"
          >
            待签署
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_QSZ'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_QSZ' ? '#4974F5' : '#222222',
            }"
          >
            签署中
          </p>
          <p v-if="item.contractStatus == 'STRUTS_DSH'">待审核</p>
          <p v-if="item.contractStatus == 'STRUTS_YJQ'">已拒签</p>
          <p v-if="item.contractStatus == 'STRUTS_YYQ'">已逾期</p>
          <p v-if="item.contractStatus == 'STRUTS_YZF'">已作废</p>
        </div>
        <div class="body">
          <div class="cell">
            <p class="title">合同编号：{{ item.contractNo }}</p>
          </div>
          <div class="cell">
            <p class="title">合同金额：￥{{ item.contractMoney }}</p>
          </div>
          <div class="cell">
            <p class="title">
              合同类型：{{
                item.isAppendixContract == 0 ? '通用合同' : '产品附件'
              }}
            </p>
          </div>
          <div class="cell">
            <p class="title">签署时间：{{ item.updateTime }}</p>
          </div>
        </div>
        <div
          v-if="
            item.contractStatus == 'STRUTS_YWC' ||
            item.contractStatus == 'STRUTS_QSZ' ||
            item.contractStatus == 'STRUTS_CG' ||
            item.contractStatus == 'STRUTS_DSH'
          "
          class="btn"
          @click="goPreview(item)"
        >
          {{
            item.contractStatus == 'STRUTS_CG' ||
            item.contractStatus == 'STRUTS_QSZ'
              ? '签署合同'
              : '查看合同'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common/head/header'
import orderApi from '@/api/order'
export default {
  name: 'OrderContract',
  components: {
    Head,
  },
  data() {
    return {
      list: [],
      order: this.$route.query,
    }
  },
  mounted() {
    this.getorder()
  },
  methods: {
    getorder() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.order.orderId, cusOrderId: this.order.cusOrderId }
        )
        .then((res) => {
          this.list = res.contractVo2s
        })
        .catch((err) => {
          this.skeletonLoading = false
          this.$xToast.error(err.message || '查询失败，请稍后重试')
          const that = this
          setTimeout(function () {
            that.$router.back(-1)
          }, 2000)
        })
    },
    goPreview(item) {
      if (item.contractStatus === 'STRUTS_DSH') {
        this.$xToast.error('合同正在审核中，请稍后~')
      } else if (item.contractStatus === 'STRUTS_YWC') {
        this.$router.push({
          path: '/contract/preview',
          query: {
            contractUrl: item.contractUrl,
            type: 'yl',
          },
        })
      } else {
        if (item.isAppendixContract === 1) {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].isAppendixContract === 0) {
              item.contractFirstContacts = this.list[i].contractFirstContacts
              item.contractFirstPhone = this.list[i].contractFirstPhone
            }
          }
        }
        this.$router.push({
          path: '/contract/preview',
          query: {
            contractUrl: item.contractUrl,
            contractId: item.contractId,
            contractNo: item.contractNo,
            signerName: item.contractFirstContacts,
            contactWay: item.contractFirstPhone,
            type: 'qs',
            go: '-1',
          },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.contract {
  background: #f5f5f5;
  min-height: 100vh;
  > .listbox {
    padding-bottom: 40px;
    > .list {
      margin-top: 20px;
      padding: 40px;
      background: #fff;
      > .head {
        display: flex;
        align-items: center;
        padding-bottom: 40px;
        border-bottom: 1px solid #f4f4f4;
        > h1 {
          max-width: 70%;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > p {
          margin-left: auto;
          font-size: 30px;
          font-weight: 400;
          color: #222222;
        }
      }
      > .body {
        padding-bottom: 40px;
        border-bottom: 1px solid #f4f4f4;
        .cell {
          margin-top: 40px;
          > .title {
            width: 100%;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 26px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      > .btn {
        line-height: 60px;
        text-align: center;
        margin-top: 40px;
        width: 152px;
        height: 64px;
        background: #ffffff;
        border-radius: 32px;
        border: 1px solid #dddddd;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        margin-left: auto;
      }
    }
  }
}
</style>
