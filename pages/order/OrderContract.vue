<template>
  <div class="contract">
    <Head ref="head" title="附件协议-合同列表"> </Head>
    <div class="listbox">
      <div v-for="(item, index) in list" :key="index" class="list">
        <div class="head">
          <h1>{{ item.name }}</h1>
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
          <p v-if="item.contractStatus == 'STRUTS_YJQ'">已拒签</p>
          <p v-if="item.contractStatus == 'STRUTS_YYQ'">已逾期</p>
          <p v-if="item.contractStatus == 'STRUTS_YZF'">已作废</p>
        </div>
        <div class="body">
          <div class="cell">
            <p class="title">合同编号: {{ item.id }}：</p>
          </div>
          <div class="cell">
            <p class="title">合同金额：{{ item.id }}</p>
          </div>
          <div class="cell">
            <p class="title">合同类型：{{ item.id }}</p>
          </div>
          <div class="cell">
            <p class="title">签署时间：{{ item.id }}</p>
          </div>
        </div>
        <div
          v-if="
            item.contractStatus == 'STRUTS_YWC' ||
            item.contractStatus == 'STRUTS_QSZ' ||
            item.contractStatus == 'STRUTS_CG'
          "
          class="btn"
        >
          {{ item.contractStatus == 'STRUTS_YWC' ? '查看合同' : '签署合同' }}
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
      list: [
        {
          name: '这是个合同的名称',
          contractStatus: 'STRUTS_QSZ',
          id: 'HT-202010102365',
          money: '5000.00',
          type: '通用合同',
          time: '2020-12-12 09:30:56',
        },
      ],
    }
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
