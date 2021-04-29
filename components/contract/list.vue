<template>
  <div class="listbox">
    <List
      v-model="loading"
      :finished="finished"
      :finished-text="list.length == 0 ? '' : '我是有底线的...'"
      :offset="0"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index" class="list">
        <div class="head">
          <h1>{{ item.contractName }}</h1>
          <!--  <p
            v-if="item.contractStatus == 'STRUTS_YWC'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            已完成
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_CG'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            待签署
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_STRUTS_QSZ'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            签署中
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_YJQ'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            已拒签
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_YYQ'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            已逾期
          </p>
          <p
            v-if="item.contractStatus == 'STRUTS_YZF'"
            :style="{
              color:
                item.contractStatus == 'STRUTS_YWC' ? '#FE8C29' : '#999999',
            }"
          >
            已作废
          </p> -->
        </div>
        <div class="data">
          <div class="tit">
            <p>合同编号：</p>
            <p>{{ item.contractNo || '暂无' }}</p>
          </div>
          <div class="tit">
            <p>合同金额：</p>
            <p>
              {{ item.contractMoney ? item.contractMoney + '元' : '暂无' }}
            </p>
          </div>
          <div class="tit">
            <p>签署时间：</p>
            <p>{{ item.createTime || '暂无' }}</p>
          </div>
          <div class="tit">
            <p>订单编号：</p>
            <p>{{ item.orderNo || '暂无' }}</p>
          </div>
        </div>
        <div class="btn">
          <p @click="jump(item.orderId)">订单详情</p>
          <p @click.stop="btn(item)">
            {{ item.contractStatus === 'STRUTS_YWC' ? '查看合同' : '签署合同' }}
          </p>
        </div>
      </div>
    </List>
    <div v-show="list.length < 1" class="none">
      <img src="https://img10.dgg.cn/pt03/wap/cmxakdtkqxs0000.png" alt="" />
      <p>暂无合同</p>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
export default {
  name: 'ContractListcomponents',
  components: {
    List,
  },
  props: {
    list: {
      // 是否是列表页
      type: Array,
      default() {
        return []
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
  methods: {
    jump(orderid) {
      this.$router.push({
        path: '/order/detail',
        query: {
          id: orderid,
        },
      })
    },
    btn(item) {
      this.$emit('Jump', item)
    },
    onLoad() {
      this.$emit('load', this.page)
      this.page++
    },
  },
}
</script>

<style lang="less" scoped>
.listbox {
  background: #f8f8f8;
  min-height: calc(100vh - 88px - 88px);
  .list {
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
  .none {
    padding-top: 100px;
    margin: 0 auto;
    text-align: center;
    img {
      width: 340px;
      height: 340px;
    }
    p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
