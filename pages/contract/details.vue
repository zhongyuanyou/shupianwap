<template>
  <div class="details">
    <div class="head">
      <Icon name="down" class="back-icon" />
    </div>
    <div class="content">
      <div class="stepbox">
        <Step
          :list="list"
          :istitle="true"
          :active="active"
          bgcolor="#4653E0"
          step-class="step"
          :left="10"
        ></Step>
      </div>
      <div class="dataContent">
        <CellGroup>
          <Cell
            title-class="title"
            value-class="val"
            title="合同名称"
            value="认证咨询服务代理合同"
          ></Cell>
          <Cell
            title-class="title"
            value-class="val"
            title="合同编号"
            value="认证咨询服务代理合同"
          ></Cell>
          <Cell
            title-class="title"
            value-class="val"
            title="合同金额"
            value="认证咨询服务代理合同"
          ></Cell>
          <Cell
            title-class="title"
            value-class="val"
            title="合同类型"
            value="认证咨询服务代理合同"
          ></Cell>
          <Cell
            title-class="title"
            value-class="val"
            title="签署时间"
            value="认证咨询服务代理合同"
          ></Cell>
        </CellGroup>
      </div>
      <div class="listbox">
        <h1>关联订单</h1>
        <div v-for="(item, index) in cartlist" :key="index" class="list">
          <CellGroup>
            <Cell
              title-class="title"
              value-class="val"
              title="订单编号"
              value="认证咨询服务代理合同"
            ></Cell>
            <Cell
              title-class="title"
              value-class="val"
              title="订单状态"
              value="认证咨询服务代理合同"
            ></Cell>
            <Cell
              title-class="title"
              value-class="val"
              title="下单时间"
              value="认证咨询服务代理合同"
            ></Cell>
          </CellGroup>
          <Icon name="arrow" class="icon" size="0.25rem" color="#ccc" />
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="box">查看合同</div>
    </div>
  </div>
</template>

<script>
import { Icon, Cell, CellGroup } from '@chipspc/vant-dgg'
import Step from '@/components/contract/step'
export default {
  name: 'Details',
  components: {
    Icon,
    Step,
    Cell,
    CellGroup,
  },
  data() {
    return {
      active: 2,
      list: [{ name: '已申请' }, { name: '签署中' }, { name: '已签署' }],
      cartlist: ['1', '2'],
    }
  },
}
</script>

<style lang="less" scoped>
.details {
  background: #f8f8f8;
  height: 100vh;
  > .head {
    height: 88px;
    background: #4653e0;
    display: flex;
    padding: 0 32px;
    .back-icon {
      height: 88px;
      line-height: 88px;
      font-size: 40px;
      transform: rotate(90deg);
      color: #fff;
    }
  }
  > .content {
    height: calc(100% - 240px);
    overflow: auto;
    > .stepbox {
      padding-top: 20px;
      background: #4653e0;
      height: 220px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      > .step {
        width: 100%;
      }
    }
    > .dataContent {
      height: 400px;
      background: #ffffff;
      padding-top: 31px;
      ::v-deep.sp-cell {
        padding-top: 0;
        padding-bottom: 31px;
      }
      ::v-deep.title {
        width: 150px;
        flex: auto;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
      }
      ::v-deep.val {
        width: calc(100% - 150px);
        flex: auto;
        text-align: left;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
      }
      ::v-deep.sp-cell::after {
        display: none;
      }
    }
    > .listbox {
      background: #fff;
      margin-top: 24px;
      padding: 40px 42px 0 42px;
      > h1 {
        font-size: 32px;
        font-weight: bold;
        color: #1a1a1a;
        margin-bottom: 32px;
      }
      > .list {
        margin-top: 24px;
        border-bottom: 1px solid #f4f4f4;
        position: relative;
        ::v-deep.title {
          width: 150px;
          flex: auto;
          font-size: 28px;
          font-weight: 400;
          color: #999999;
        }
        ::v-deep.val {
          width: calc(100% - 150px);
          flex: auto;
          text-align: left;
          font-size: 28px;
          font-weight: 400;
          color: #222222;
        }
        ::v-deep.sp-cell::after {
          display: none;
        }
        ::v-deep.sp-cell {
          padding: 0 0 31px 0;
        }
        ::v-deep.sp-hairline--top-bottom::after,
        .sp-hairline-unset--top-bottom::after {
          display: none;
        }
        > .icon {
          position: absolute;
          right: 20px;
          top: 85px;
        }
      }
      > .list:first-child {
        margin-top: 0;
      }
    }
  }
  > .foot {
    margin-top: 40px;
    height: 112px;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 0 32px;
    > .box {
      width: 164px;
      height: 64px;
      border: 1px solid #cdcdcd;
      border-radius: 32px;
      font-size: 28px;
      font-weight: 400;
      color: #555555;
      line-height: 64px;
      text-align: center;
      align-self: center;
    }
  }
}
</style>
