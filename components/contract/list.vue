<template>
  <div class="listbox">
    <PullRefresh
      v-model="isLoading"
      :success-text="`刷新成功`"
      @refresh="onRefresh"
    >
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="list">
          <div class="head">
            <h1>{{ item.name }}</h1>
            <p :style="{ color: item.state == 1 ? '#FE8C29' : '#999999' }">
              {{ item.state == 1 ? '已完成' : '待签署' }}
            </p>
          </div>
          <div class="data">
            <div class="tit">
              <p>合同编号：</p>
              <p>{{ item.contract || '暂无' }}</p>
            </div>
            <div class="tit">
              <p>合同金额：</p>
              <p>{{ item.price ? item.price + '元' : '暂无' }}</p>
            </div>
            <div class="tit">
              <p>签署时间：</p>
              <p>{{ item.date || '暂无' }}</p>
            </div>
            <div class="tit">
              <p>订单编号：</p>
              <p>{{ item.ordersn || '暂无' }}</p>
            </div>
          </div>
          <div class="btn">
            <p>订单详情</p>
            <p>{{ item.state == 1 ? '查看合同' : '签署合同' }}</p>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { PullRefresh, List } from '@chipspc/vant-dgg'
export default {
  name: 'ContractListcomponents',
  components: {
    PullRefresh,
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
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    onLoad() {
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.list = []
      //     this.refreshing = false
      //   }
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   this.loading = false
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.listbox {
  background: #f8f8f8;
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
          width: 120px;
        }
        > :nth-child(2) {
          width: calc(100% - 120px);
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
}
</style>
