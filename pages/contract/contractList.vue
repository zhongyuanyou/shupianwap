<template>
  <div class="contractList">
    <Head ref="head" title="合同列表"></Head>
    <div class="tab">
      <p :class="tabAct == 0 ? 'act' : ''" @click="tabFn(0)">
        全部<i class="icon"></i>
      </p>
      <p :class="tabAct == 1 ? 'act' : ''" @click="tabFn(1)">
        待签署<i class="icon"></i>
      </p>
      <p :class="tabAct == 2 ? 'act' : ''" @click="tabFn(2)">
        已签署<i class="icon"></i>
      </p>
    </div>
    <div class="list">
      <List
        ref="list"
        :list="list"
        @Refresh="Refresh"
        @load="pagefn"
        @Jump="jump"
      ></List>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common/head/header'
import List from '@/components/contract/list'
import contractApi from '@/api/contract'
export default {
  name: 'Contractlist',
  components: {
    Head,
    List,
  },
  data() {
    return {
      tabAct: 0,
      page: 1,
      status: '',
      list: [],
    }
  },
  mounted() {},
  methods: {
    // godetail(item) {
    //   this.$router.push({
    //     path: '/detail',
    //     query: {
    //       productId: item.id,
    //     },
    //   })
    // },
    jump(val) {
      console.log(val)
      if (val.contractStatus === 'STRUTS_YWC') {
        this.$router.push({
          path: '/contract/preview',
          query: {
            contractUrl: val.contractUrl,
            type: 'yl',
            fromPage: 'contractList',
          },
        })
      } else {
        this.$router.push({
          path: '/contract/preview',
          query: {
            contractUrl: val.contractUrl,
            contractId: val.contractId,
            contractNo: val.contractNo,
            signerName: val.contractSignerName,
            contactWay: val.contractSignerPhone,
            type: 'qs',
            fromPage: 'contractList',
          },
        })
      }
    },
    pagefn(val) {
      this.page = val
      this.getlist()
    },
    Refresh() {
      this.list = []
      this.page = 1
      this.$refs.list.page = 1
      this.$refs.list.finished = false
      this.getlist()
    },
    getlist() {
      if (this.tabAct === 1) {
        this.status = 'ORDER_CONTRACT_STATUS_DQS'
      } else if (this.tabAct === 2) {
        this.status = 'ORDER_CONTRACT_STATUS_YQS'
      } else {
        this.status = ''
      }
      contractApi
        .contartlist(
          { axios: this.axios },
          {
            id: this.$store.state.user.userId,
            status: this.status,
            page: this.page,
            limit: 10,
          }
        )
        .then((res) => {
          if (this.list.length < 1) {
            this.list = res.records
          } else {
            this.list = this.list.concat(res.records)
          }
          if (res.records.length < 10) {
            this.$refs.list.finished = true
          }
          if (this.$refs.list.isLoading === true) {
            this.$refs.list.isLoading = false
          }
          if (this.$refs.list.loading === true) {
            this.$refs.list.loading = false
          }
        })
        .catch((err) => {
          this.$xToast.show(err.message)
          console.log('错误信息err', err)
        })
    },
    tabFn(index) {
      if (this.tabAct !== index) {
        this.tabAct = index
        this.list = []
        this.page = 1
        this.$refs.list.page = 1
        this.$refs.list.finished = false
        // this.getlist()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.contractList {
  background: #f8f8f8;
  height: 100vh;
  > .tab {
    height: 88px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    > p {
      height: 88px;
      line-height: 88px;
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      text-align: center;
      width: 33.3%;
      position: relative;
      > .icon {
        width: 32px;
        height: 4px;
        background: #4974f5;
        border-radius: 2px;
        display: none;
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    > .act {
      color: #4974f5;
      > .icon {
        display: block;
      }
    }
  }
  > .list {
    height: calc(100vh - 88px - 80px);
    overflow: auto;
  }
}
</style>
