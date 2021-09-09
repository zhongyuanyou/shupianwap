<template>
  <div class="contract">
    <Head ref="head" title="附件协议-合同列表"> </Head>
    <div class="listbox">
      <template v-for="(item, index) in list">
        <div v-if="showContract(item.status)" :key="index" class="list">
          <div class="head">
            <h1>{{ item.contractName }}</h1>
            <p v-if="item.status == 'STRUTS_YWC'" style="color: #222222">
              已签署
            </p>
            <p v-if="item.status == 'STRUTS_QSZ'" style="color: #4974f5">
              签署中
            </p>
            <p v-if="item.status == 'STRUTS_YJQ'" style="color: #222222">
              已拒签
            </p>
            <p v-if="item.status == 'STRUTS_YYQ'" style="color: #222222">
              已逾期
            </p>
            <p v-if="item.status == 'STRUTS_YZF'" style="color: #222222">
              已作废
            </p>
            <p v-if="item.status == 'STRUTS_DGD'" style="color: #222222">
              待归档
            </p>
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
          <div class="btn" @click="goPreview(item)">
            {{ item.status == 'STRUTS_QSZ' ? '签署合同' : '查看合同' }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/*
合同状态:
  签署中
  STRUTS_QSZ("STRUTS_QSZ","签署中"),
  已完成
  STRUTS_YWC("STRUTS_YWC","已完成"),
  已逾期
  STRUTS_YYQ("STRUTS_YYQ","已逾期"),
  已作废
  STRUTS_YZF("STRUTS_YZF","已作废"),
  审核中
  STRUTS_SHZ("STRUTS_SHZ","审核中"),
  待归档
  STRUTS_DGD("STRUTS_DGD","待归档");
*/
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
    showContract(val) {
      // 草稿状态, 审核状态不显示,其余状态均显示合同
      // STRUTS_CG STRUTS_SHZ_SH 这两个状态是为了匹配以前数据,草稿和商户平台审核以前有,现在没有这两个状态了
      if (
        val === 'STRUTS_CG' ||
        val === 'STRUTS_SHZ' ||
        val === 'STRUTS_SHZ_SH'
      ) {
        return false
      }
      return true
    },
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
      const queryParams = {
        contractUrl: item.fileUrl,
        go: '-1',
        contractId: item.id, // 合同id
        contractNo: item.documentNo, // 合同编码
      }
      // 当为签署中时,才可以进行签署,其他状态只能够查看合同
      if (item.status === 'STRUTS_QSZ') {
        // 甲方名称
        queryParams.signerName = item.partyaName
        // 甲方联系电话(加密)
        queryParams.contactWay = item.partyaTelephone
        queryParams.type = 'qs'
      } else {
        queryParams.type = 'yl'
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
