<template>
  <div class="contractList">
    <Head ref="head" title="合同列表" :hide-shadow="true">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </template>
    </Head>
    <div class="tab">
      <p :class="tabAct == 1 ? 'act' : ''" @click="changeTab(1)">
        待签署<i class="icon"></i>
      </p>
      <p :class="tabAct == 2 ? 'act' : ''" @click="changeTab(2)">
        已签署<i class="icon"></i>
      </p>
    </div>
    <div class="list">
      <sp-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        class="list"
        finished-text="我是有底线的..."
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <template v-for="(info, i) in list">
          <Item :key="i" :info="info" />
        </template>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import Item from '@/components/contract/Item'
import contractApi from '@/api/contract'
export default {
  name: 'Contractlist',
  components: {
    Head,
    Item,
    [List.name]: List,
  },
  data() {
    return {
      tabAct: 1,
      page: 1,
      limit: 10,
      status: ['STRUTS_QSZ'],
      list: [],
      error: false,
      loading: false,
      finished: false,
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    jump(val) {
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
            signerName: val.contractFirstName,
            contactWay: val.contractFirstPhone,
            type: 'qs',
            fromPage: 'contractList',
          },
        })
      }
    },
    onLoad() {
      contractApi
        .contartlist(
          { axios: this.axios },
          {
            cusUserId: this.$store.state.user.userId,
            statusList: this.status,
            page: this.page,
            limit: this.limit,
          }
        )
        .then((res) => {
          this.list.push(...res.records)
          this.page++
          if (this.page > res.totalPage) {
            this.finished = true
          }
          this.loading = false
        })
        .catch((err) => {
          this.error = true
          this.$xToast.show(err.message)
          console.log('错误信息err', err)
          this.loading = false
        })
    },
    changeTab(index) {
      if (this.tabAct === index) {
        return
      }
      this.tabAct = index
      this.page = 1
      this.list = []
      this.loading = true
      this.finished = false
      this.error = false
      if (this.tabAct === 1) {
        this.status = ['STRUTS_QSZ']
      } else {
        this.status = ['STRUTS_YWC']
      }
      this.onLoad()
    },
    onLeftClick() {
      this.$router.push({
        path: '/my',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.contractList {
  background: #f8f8f8;
  height: 100vh;
  > .tab {
    width: 100%;
    position: fixed;
    top: 88px;
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
      width: 50%;
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
    margin-top: 88px;
    overflow: auto;
  }
}
</style>
