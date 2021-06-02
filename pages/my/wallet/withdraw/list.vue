<template>
  <div class="list">
    <Header title="余额提现记录" />
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul>
        <li @click="$router.push('/my/wallet/withdraw/detail')">
          <div class="left">
            <h3>提现</h3>
            <p>2020-10-20 10:30:32</p>
          </div>
          <div class="right">
            <h3>-100</h3>
            <p>提现中</p>
            <!-- <p>已处理</p> -->
          </div>
        </li>
        <li>
          <div class="left">
            <h3>提现</h3>
            <p>2020-10-20 10:30:32</p>
          </div>
          <div class="right">
            <h3>-100</h3>
            <p>提现中</p>
            <!-- <p>已处理</p> -->
          </div>
        </li>
      </ul>
      <!-- <sp-cell v-for="item in list" :key="item" :title="item" /> -->
    </sp-list>
  </div>
</template>

<script>
import { Sticky, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Sticky.name]: Sticky,
    [List.name]: List,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  min-height: 100vh;
  background: #f8f8f8;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      height: 170px;
      margin-top: 20px;
      padding: 40px;
      background: #fff;
      align-items: center;
      .left {
        font-family: PingFangSC-Medium;
        h3 {
          font-size: 32px;
          color: #222222;
        }
        p {
          font-size: 24px;
          color: #999999;
          margin-top: 32px;
        }
      }
      .right {
        text-align: right;

        h3 {
          font-family: Bebas;
          color: #1a1a1a;
          font-weight: bold;
          font-size: 40px;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #fe8c29;
          margin-top: 22px;
        }
      }
    }
  }
}
</style>
