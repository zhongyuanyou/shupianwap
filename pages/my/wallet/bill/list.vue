<template>
  <div class="bill">
    <Header title="账单" />

    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getBillList"
    >
      <ul>
        <li
          v-for="(item, index) in billList"
          :key="index"
          @click="$router.push(`/my/wallet/bill/detail?id=${item.billId}`)"
        >
          <div class="left">
            <h3>提现</h3>
            <p>{{ item.createTime }}</p>
          </div>
          <div class="right">-￥{{ item.amount }}</div>
        </li>
        <!-- <li>
          <div class="left">
            <h3>提现</h3>
            <p>2020-10-20 10:30:32</p>
          </div>
          <div class="right">+2000.00</div>
        </li> -->
      </ul>
    </sp-list>
    <div v-if="!billList.length && showNoDataImg" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">暂无账单记录</p>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [List.name]: List,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      showNoDataImg: false,
      billList: [],
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
    async getBillList() {
      const res = await this.$axios.post(walletApi.bill_list, {
        relationId: this.userInfo.id,
        accType: 'BANK_ACCOUNT_TYPE_2',
        start: this.page,
        limit: this.limit,
      })
      if (res.code === 200) {
        this.billList = [...this.billList, ...res.data.list]
        if (this.billList.length === 0) {
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
.bill {
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
        font-family: Bebas;
        color: #1a1a1a;
        font-weight: bold;
        font-size: 40px;
      }
    }
  }
}
</style>
