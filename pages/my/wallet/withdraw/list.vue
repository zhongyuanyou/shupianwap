<template>
  <div class="list">
    <Header title="余额提现记录" />
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getWithdrawalsRecord"
    >
      <ul>
        <li
          v-for="(item, index) in withdrawList"
          :key="index"
          @click="$router.push(`/my/wallet/withdraw/detail?id=${item.billId}`)"
        >
          <div class="left">
            <h3>提现</h3>
            <p>{{ item.createTime }}</p>
          </div>
          <div class="right">
            <h3>-￥{{ item.amount }}</h3>
            <p>{{ item.statusName }}</p>
          </div>
        </li>
      </ul>
      <!-- <sp-cell v-for="item in list" :key="item" :title="item" /> -->
    </sp-list>
    <div v-if="!withdrawList.length && showNoDataImg" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">暂无提现记录</p>
    </div>
  </div>
</template>

<script>
import { Sticky, List } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Sticky.name]: Sticky,
    [List.name]: List,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      showNoDataImg: false,
      withdrawList: [],
      userInfo: '',
    }
  },
  // computed: {
  //   userInfo() {
  //     return JSON.parse(localStorage.getItem('info'))
  //   },
  // },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('info'))
  },
  methods: {
    async getWithdrawalsRecord() {
      const res = await this.$axios.post(walletApi.bill_list, {
        relationId: this.userInfo.id,
        accType: 'BANK_ACCOUNT_TYPE_2',
        start: this.page,
        limit: this.limit,
      })
      if (res.code === 200) {
        this.withdrawList = [...this.withdrawList, ...res.data.list]
        if (this.withdrawList.length === 0) {
          this.showNoDataImg = true
        } else {
          this.showNoDataImg = false
        }
        this.loading = false
        this.page++
        if (this.page > res.data.total) {
          this.finished = true
        }
      } else {
        this.showNoDataImg = true
        this.loading = false
        this.finished = true
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
