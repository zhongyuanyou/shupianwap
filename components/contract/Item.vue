<template>
  <div class="item">
    <div class="head">
      <h1>{{ item.contractName }}</h1>
    </div>
    <div class="data">
      <div class="tit">
        <p>合同编号：</p>
        <p>{{ item.documentNo || '暂无' }}</p>
      </div>
      <div class="tit">
        <p>合同金额：</p>
        <p>
          {{ item.money ? item.money + '元' : '暂无' }}
        </p>
      </div>
      <div class="tit">
        <p>签署时间：</p>
        <p>{{ item.signCompleteTime || '-' }}</p>
      </div>
      <div class="tit">
        <p>订单编号：</p>
        <p>{{ item.businessSn || '暂无' }}</p>
      </div>
    </div>
    <div class="btn">
      <p @click="toOrderDetail(item.businessId)">订单详情</p>
      <p @click.stop="toContractNext">
        {{ item.status === 'STRUTS_YWC' ? '查看合同' : '签署合同' }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractListcomponents',
  props: {
    info: {
      // 是否是列表页
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
    }
  },
  computed: {
    item() {
      return this.info
    },
  },
  methods: {
    toOrderDetail(orderid) {
      this.$router.push({
        path: '/order/detail',
        query: {
          id: orderid,
        },
      })
    },
    toContractNext() {
      const queryParams = {
        contractUrl: this.item.fileUrl,
        fromPage: 'contractList',
        contractId: this.item.id, // 合同id
        contractNo: this.item.documentNo, // 合同编码
      }
      // 已完成状态
      if (this.item.status === 'STRUTS_YWC') {
        queryParams.type = 'yl'
      } else {
        // 甲方名称
        queryParams.signerName = this.item.partyaName
        // 甲方联系电话(加密)
        queryParams.contactWay = this.item.partyaTelephone
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
.item {
  margin-top: 24px;
  height: 390px;
  box-sizing: border-box;
  padding: 31px 41px;
  background: #fff;
  > .head {
    display: flex;
    > h1 {
      width: 80%;
      font-size: 28px;
      font-weight: bold;
      color: #222222;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    > p {
      width: 20%;
      text-align: right;
      font-size: 24px;
      font-weight: 400;
      margin-left: auto;
    }
  }
  > .data {
    margin-top: 33px;
    > .tit {
      display: flex;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-bottom: 14px;
      > :nth-child(1) {
        width: 130px;
      }
      > :nth-child(2) {
        width: calc(100% - 130px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  > .btn {
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;
    > p {
      width: 152px;
      height: 64px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      border-radius: 32px;
      font-size: 26px;
      font-weight: 400;
      color: #222222;
      line-height: 64px;
      text-align: center;
      margin-left: 20px;
    }
  }
}
</style>
