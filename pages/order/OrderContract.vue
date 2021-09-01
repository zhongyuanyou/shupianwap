<template>
  <div class="contract">
    <Head ref="head" title="附件协议-合同列表"> </Head>
    <div class="listbox">
      <div v-for="(item, index) in list" :key="index" class="list">
        <div class="head">
          <h1>{{ item.contractName }}</h1>
          <p v-if="item.status == 'STRUTS_YWC'">已签署</p>
          <p
            v-if="item.status == 'STRUTS_CG'"
            :style="{
              color: item.status == 'STRUTS_CG' ? '#FE8C29' : '#222222',
            }"
          >
            待签署
          </p>
          <p
            v-if="item.status == 'STRUTS_QSZ'"
            :style="{
              color: item.status == 'STRUTS_QSZ' ? '#4974F5' : '#222222',
            }"
          >
            签署中
          </p>
          <p v-if="item.status == 'STRUTS_DSH'">待审核</p>
          <p v-if="item.status == 'STRUTS_YJQ'">已拒签</p>
          <p v-if="item.status == 'STRUTS_YYQ'">已逾期</p>
          <p v-if="item.status == 'STRUTS_YZF'">已作废</p>
          <p v-if="item.status == 'STRUTS_SHZ'">审核中(平台)</p>
          <p v-if="item.status == 'STRUTS_SHZ_SH'">审核中(待商户审核)</p>
          <p v-if="item.status == 'STRUTS_DGD'">待归档</p>
        </div>
        <div class="body">
          <div class="cell">
            <p class="title">合同编号：{{ item.documentNo }}</p>
          </div>
          <div class="cell">
            <p class="title">
              合同金额：{{ item.money ? '￥' + item.money : '-' }}
            </p>
          </div>
          <div class="cell">
            <p class="title">
              合同类型：{{
                item.contractTypeName ? item.contractTypeName : '-'
              }}
            </p>
          </div>
          <div class="cell">
            <p class="title">签署时间：{{ item.signCompleteTime || '-' }}</p>
          </div>
        </div>
        <div
          v-if="
            item.status == 'STRUTS_YWC' ||
            item.status == 'STRUTS_QSZ' ||
            item.status == 'STRUTS_CG' ||
            item.status == 'STRUTS_DSH'
          "
          class="btn"
          @click="goPreview(item)"
        >
          {{
            item.status == 'STRUTS_CG' || item.status == 'STRUTS_QSZ'
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
import contractApi from '@/api/contract'
export default {
  name: 'OrderContract',
  components: {
    Head,
  },
  data() {
    return {
      list: [],
      order: this.$route.query,
      page: 1,
      limit: 500,
    }
  },
  mounted() {
    this.getorder()
  },
  methods: {
    getorder() {
      contractApi
        .contartlist(
          { axios: this.axios },
          {
            cusUserId: this.$store.state.user.userId, // 用户id
            businessId: this.order.orderId, // 订单id
            page: this.page,
            limit: this.limit,
          }
        )
        .then((res) => {
          this.list = res.records
        })
        .catch((err) => {
          this.$xToast.show('查询合同列表失败', 2000, false, () => {
            this.$back()
          })
          console.log('错误信息err', err)
        })
    },
    goPreview(item) {
      if (item.status === 'STRUTS_DSH') {
        this.$xToast.error('合同正在审核中，请稍后~')
        return
      }
      const queryParams = {
        contractUrl: item.fileUrl,
        go: '-1',
        contractId: item.id, // 合同id
        contractNo: item.documentNo, // 合同编码
      }
      // 已完成状态
      if (item.status === 'STRUTS_YWC') {
        queryParams.type = 'yl'
      } else {
        // 甲方名称
        queryParams.signerName = item.partyaName
        // 甲方联系电话(加密)
        queryParams.contactWay = item.partyaTelephone
        queryParams.type = 'qs'
      }
      this.$router.push({
        path: '/contract/preview',
        query: queryParams,
      })
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
